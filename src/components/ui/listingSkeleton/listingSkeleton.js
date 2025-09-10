import React from "react";

const shimmerStyles = {
  card: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    padding: "16px",
    marginBottom: "32px",
    width: "100%",
    maxWidth: "600px",
  },
  image: {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    marginBottom: "16px",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  },
  title: {
    width: "70%",
    height: "24px",
    borderRadius: "6px",
    marginBottom: "12px",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  },
  meta: {
    width: "40%",
    height: "16px",
    borderRadius: "4px",
    marginBottom: "18px",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  },
  content: {
    width: "100%",
    height: "14px",
    borderRadius: "4px",
    marginBottom: "10px",
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
    backgroundSize: "400% 100%",
    animation: "shimmer 1.4s ease infinite",
  },
};

function BlogShimmer() {
  return (
    <div style={shimmerStyles.card}>
      <div style={shimmerStyles.image}></div>
      <div style={shimmerStyles.title}></div>
      <div style={shimmerStyles.meta}></div>
      <div style={shimmerStyles.content}></div>
      <div style={shimmerStyles.content}></div>
      <div style={{ ...shimmerStyles.content, width: "80%" }}></div>
    </div>
  );
}

export default function ListingSkeleton() {
  return (
    <div
      className="mt-0"
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 8px",
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
      <BlogShimmer />
      <BlogShimmer />
      <BlogShimmer />
    </div>
  );
}
