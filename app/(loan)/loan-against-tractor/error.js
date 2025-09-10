"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h2>Something went wrong on our end!</h2>
      <p>We encountered an error while trying to load this page.</p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Try again
      </button>
    </div>
  );
}
