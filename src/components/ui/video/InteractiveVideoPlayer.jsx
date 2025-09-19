'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

const InteractiveVideoPlayer = ({
    videoUrl,
    title,
    className = "",
    onUserInteraction,
    isMobile = false,
}) => {
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [videoSrc, setVideoSrc] = useState('');
    const [showAudioIndicator, setShowAudioIndicator] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef(null);
    const iframeRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const indicatorTimeoutRef = useRef(null);
    const pathname = usePathname();

    // Function to extract brand name from URL or use provided brandName
    const getBrandNameFromUrl = useCallback(() => {
        // if (brandName) {
        //     return brandName.toLowerCase().replace(/\s+/g, '_');
        // }

        // Extract brand from URL pattern like /tractor/mahindra or /hi/tractor/farmtrac
        const match = pathname.match(/\/(?:hi\/)?tractor\/([^\/]+)/);
        if (match) {
            return match[1].toLowerCase().replace(/-/g, '_');
        }

        return 'unknown';
    }, [pathname]);

    // Function to track gtag event
    const trackReelInteraction = useCallback(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            const brand = getBrandNameFromUrl();
            const deviceType = isMobile ? 'mobile' : 'desktop';
            const eventName = `reel_on_${brand}_brand_page_${deviceType}_ad`;

            window.gtag('event', eventName, {
                event_category: 'reel_interaction',
                event_label: `${brand}_brand_page`,
                device_type: deviceType,
                brand_name: brand,
                video_url: videoUrl,
                page_url: pathname
            });

            console.log(`Gtag event fired: ${eventName}`);
        }
    }, [getBrandNameFromUrl, isMobile, videoUrl, pathname]);

    // Mark component as mounted for client-side logic
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initialize video source on mount (client-side only)
    useEffect(() => {
        if (isMounted && videoUrl) {
            let initialSrc = videoUrl;

            // Ensure we have the necessary parameters for API control
            if (!initialSrc.includes('enablejsapi=1')) {
                initialSrc = `${initialSrc}${initialSrc.includes('?') ? '&' : '?'}enablejsapi=1`;
            }

            // Add autoplay and mute for initial load
            if (!initialSrc.includes('autoplay=1')) {
                initialSrc = `${initialSrc}&autoplay=1`;
            }

            if (!initialSrc.includes('mute=1')) {
                initialSrc = `${initialSrc}&mute=1`;
            }

            // Clean up any extra separators
            initialSrc = initialSrc.replace(/[?&]{2,}/g, '?').replace(/&$/, '');

            setVideoSrc(initialSrc);
        }
    }, [videoUrl, isMounted]);

    // Intersection Observer to detect when video is visible
    useEffect(() => {
        if (isMounted && containerRef.current) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    const wasVisible = isVisible;
                    const nowVisible = entry.isIntersecting;

                    setIsVisible(nowVisible);

                    // Track when reel becomes visible for the first time
                    if (!wasVisible && nowVisible) {
                        trackReelInteraction();
                    }
                },
                {
                    threshold: 0.3, // Trigger when 30% of video is visible
                    rootMargin: '50px' // Add some margin for early detection
                }
            );

            observer.observe(containerRef.current);

            return () => {
                if (containerRef.current) {
                    observer.unobserve(containerRef.current);
                }
            };
        }
    }, [isMounted, isVisible, trackReelInteraction]);

    // Handle scroll detection with debouncing - only when video is visible
    const handleScroll = useCallback(() => {
        if (hasUserInteracted || !isVisible || !isMounted) return;

        // Clear previous timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        // Set a new timeout to detect when scroll stops
        scrollTimeoutRef.current = setTimeout(() => {
            if (!hasUserInteracted && isVisible) {
                setHasUserInteracted(true);
                onUserInteraction?.();

                // Hide the audio enabled indicator after 3 seconds
                indicatorTimeoutRef.current = setTimeout(() => {
                    setShowAudioIndicator(false);
                }, 3000);
            }
        }, 200); // Wait for 200ms after scroll stops
    }, [hasUserInteracted, isVisible, isMounted, onUserInteraction]);

    // Add scroll listener only when video is visible
    useEffect(() => {
        if (isMounted && !hasUserInteracted && isVisible) {
            const handleScrollEvent = () => handleScroll();

            window.addEventListener('scroll', handleScrollEvent, { passive: true });
            // Also listen for touch events on mobile
            window.addEventListener('touchmove', handleScrollEvent, { passive: true });

            return () => {
                window.removeEventListener('scroll', handleScrollEvent);
                window.removeEventListener('touchmove', handleScrollEvent);
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
                if (indicatorTimeoutRef.current) {
                    clearTimeout(indicatorTimeoutRef.current);
                }
            };
        }
    }, [handleScroll, hasUserInteracted, isVisible, isMounted]);

    // Update video to enable audio after user interaction using postMessage
    useEffect(() => {
        if (hasUserInteracted && iframeRef.current) {
            const iframe = iframeRef.current;

            // Simple approach: just try to unmute via postMessage
            try {
                // For YouTube videos
                if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                    // Unmute the video
                    iframe.contentWindow?.postMessage(
                        '{"event":"command","func":"unMute","args":""}',
                        '*'
                    );

                    // Set volume to a reasonable level
                    setTimeout(() => {
                        iframe.contentWindow?.postMessage(
                            '{"event":"command","func":"setVolume","args":[60]}',
                            '*'
                        );
                    }, 200);

                    console.log('Attempted to unmute YouTube video via API');
                }
                // For other platforms, we won't reload to avoid stopping playback
                else {
                    console.log('Non-YouTube video detected - audio control may be limited');
                }
            } catch (error) {
                console.error('Error unmuting video:', error);
            }
        }
    }, [hasUserInteracted, videoUrl]);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            if (indicatorTimeoutRef.current) clearTimeout(indicatorTimeoutRef.current);
        };
    }, []);

    // Show loading state until mounted and video source is ready
    if (!isMounted || !videoSrc) {
        return (
            <div ref={containerRef} className={`bg-gray-lighter flex items-center justify-center ${className}`}>
                <div className="text-gray-500 text-sm">Loading video...</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <iframe
                id={`interactive-reel-brand-ad`}
                ref={iframeRef}
                src={videoSrc}
                title={title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
                style={{ minHeight: 0 }}
                frameBorder="0"
            />

            {/* Audio status indicators - only show when video is visible */}
            {isVisible && !hasUserInteracted && (
                <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm z-10">
                    <span className="text-base">🔇</span>
                    <span className="hidden sm:inline">Scroll to enable sound</span>
                    <span className="sm:hidden">Scroll for sound</span>
                </div>
            )}

            {isVisible && hasUserInteracted && showAudioIndicator && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-green-600 bg-opacity-90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-500 ease-in-out backdrop-blur-sm z-10">
                    <span className="text-base">🔊</span>
                    <span className="hidden sm:inline">Audio enabled</span>
                    <span className="sm:hidden">Audio on</span>
                </div>
            )}
        </div>
    );
};

export default InteractiveVideoPlayer;