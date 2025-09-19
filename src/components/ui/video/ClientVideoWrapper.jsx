'use client';

import dynamic from 'next/dynamic';

// Dynamic import for client-side only component with better fallback
const InteractiveVideoPlayer = dynamic(
    () => import('@/src/components/ui/video/InteractiveVideoPlayer'),
    {
        ssr: false,
        loading: () => (
            <div className="bg-gray-lighter w-full h-full flex-1 rounded-xl overflow-hidden relative min-h-[200px] md:min-h-[360px]">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Loading interactive video...</div>
                </div>
            </div>
        )
    }
);

const ClientVideoWrapper = ({ videoUrl, title, className, onUserInteraction, isMobile = false, }) => {
    return (
        <InteractiveVideoPlayer
            videoUrl={videoUrl}
            title={title}
            className={className}
            onUserInteraction={onUserInteraction}
            isMobile={isMobile}
        />
    );
};

export default ClientVideoWrapper;
