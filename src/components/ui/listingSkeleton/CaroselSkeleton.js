import React from 'react';

const shimmerStyles = {
  carousel: {
    width: '100%',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    padding: '24px',
    marginBottom: '32px',
  },
  slideContainer: {
    position: 'relative',
    width: '100%',
    height: '400px',
    borderRadius: '12px',
    overflow: 'hidden',
    marginBottom: '20px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
  overlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
    padding: '24px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleText: {
    width: '250px',
    height: '28px',
    borderRadius: '6px',
    background: 'linear-gradient(90deg, #e8e8e8 25%, #d8d8d8 37%, #e8e8e8 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
  navButtons: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
  leftNav: {
    left: '16px',
  },
  rightNav: {
    right: '16px',
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
  },
  indicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
  activeIndicator: {
    width: '24px',
    borderRadius: '4px',
    background: 'linear-gradient(90deg, #d0d0d0 25%, #c0c0c0 37%, #d0d0d0 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '16px',
    marginTop: '20px',
    padding: '16px',
    background: 'rgba(248, 248, 248, 0.5)',
    borderRadius: '8px',
  },
  teamMember: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
  medal: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #f4d03f 25%, #f1c40f 37%, #f4d03f 63%)',
    backgroundSize: '400% 100%',
    animation: 'shimmer 1.4s ease infinite',
  },
};

function CarouselSkeleton() {
  return (
    <div style={shimmerStyles.carousel}>
      <div style={shimmerStyles.slideContainer}>
        <div style={{ ...shimmerStyles.navButtons, ...shimmerStyles.leftNav }}></div>
        <div style={{ ...shimmerStyles.navButtons, ...shimmerStyles.rightNav }}></div>

        <div style={shimmerStyles.overlay}>
          <div style={shimmerStyles.titleText}></div>
        </div>
      </div>

      <div style={shimmerStyles.indicators}>
        <div style={{ ...shimmerStyles.indicator, ...shimmerStyles.activeIndicator }}></div>
        <div style={shimmerStyles.indicator}></div>
        <div style={shimmerStyles.indicator}></div>
        <div style={shimmerStyles.indicator}></div>
        <div style={shimmerStyles.indicator}></div>
        <div style={shimmerStyles.indicator}></div>
        <div style={shimmerStyles.indicator}></div>
        <div style={shimmerStyles.indicator}></div>
      </div>
    </div>
  );
}

export default function CarouselSkeletonUI() {
  return (
    <div
      className="mt-0"
      style={{
        minHeight: '70vh',
        background: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 16px',
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}
      </style>

      <CarouselSkeleton />
    </div>
  );
}
