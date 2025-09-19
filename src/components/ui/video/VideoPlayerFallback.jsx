import React from 'react';

const VideoPlayerFallback = ({ videoUrl, title, className = "" }) => {
    if (!videoUrl) return null;

    // Create initial muted autoplay URL for SSR
    const initialSrc = videoUrl?.includes('autoplay=1')
        ? videoUrl
        : `${videoUrl}${videoUrl?.includes('?') ? '&' : '?'}autoplay=1&mute=1`;

    return (
        <div className={`relative ${className}`}>
            <iframe
                src={initialSrc}
                title={title}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-none rounded-xl"
                style={{ minHeight: 0 }}
            />
            <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm z-10">
                <span className="text-base">🔇</span>
                <span className="hidden sm:inline">Video muted</span>
                <span className="sm:hidden">Muted</span>
            </div>
        </div>
    );
};

export default VideoPlayerFallback;
