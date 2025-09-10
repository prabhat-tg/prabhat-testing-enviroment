"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PauseIcon = () => (
  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
    <path
      d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.02-4.11A2.99 2.99 0 0 0 18 7.91c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 
    1.34-3 3c0 .24.04.47.09.7L7.91 9.81A2.99 2.99 0 0 0 6 9c-1.66 0-3 1.34-3 3s1.34 
    3 3 3c.89 0 1.69-.39 2.25-1.01l7.12 4.17c-.05.21-.07.43-.07.65 0 1.66 
    1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"
    />
  </svg>
);

const StoryViewer = ({ story }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1 < story.slides.length ? prev + 1 : prev));
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, paused, story.slides.length]);

  const goTo = (index) => {
    if (index >= 0 && index < story.slides.length) {
      setCurrent(index);
    }
  };

  return (
    <div className="relative m-auto h-screen w-[30%] overflow-hidden bg-black">
      <Image
        src={story.slides[current].image}
        alt={story.slides[current].caption}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-between bg-gradient-to-b from-black/60 to-black/40 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="mr-4 flex flex-1 gap-1">
            {story.slides.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full ${
                  i <= current ? "bg-white" : "bg-white/30"
                } transition-all duration-300`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setPaused((prev) => !prev)}>
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
            <button onClick={() => alert("Share clicked!")}>
              <ShareIcon />
            </button>
          </div>
        </div>

        <div className="pb-6 text-center">
          <h2 className="text-lg font-bold">{story.slides[current].caption}</h2>
          <p className="text-gray-300 mt-1 text-sm">
            Published {story.publishDate}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex">
        <button className="h-full w-1/2" onClick={() => goTo(current - 1)} />
        <button className="h-full w-1/2" onClick={() => goTo(current + 1)} />
      </div>
    </div>
  );
};

export default StoryViewer;
