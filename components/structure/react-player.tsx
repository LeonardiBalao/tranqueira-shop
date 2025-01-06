"use client";

import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  return (
    <div className="relative">
      <ReactPlayer playing={true} loop url={url} controls={true} />;
    </div>
  );
};

export default VideoPlayer;
