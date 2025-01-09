"use client";

import { cn } from "@/lib/utils";
import React from "react";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoPlayerProps {
  url: string;
  className?: string;
}

const VideoPlayer = ({ url, className }: VideoPlayerProps) => {
  return (
    <div
      className={cn(
        "player-wrapper border rounded-lg overflow-hidden",
        className
      )}
    >
      <ReactPlayer
        width="100%"
        height="100%"
        url={url}
        controls={true}
        className="react-player"
      />
    </div>
  );
};

export default VideoPlayer;
