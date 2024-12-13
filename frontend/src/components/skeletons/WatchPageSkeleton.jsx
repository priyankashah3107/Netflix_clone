import React from "react";

// skeleton loading page of Netflix

export const WatchPageSkeleton = () => {
  return (
    <div className="animate-plus">
      <div className="bg-gray-700 rounded-md w-40 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-full h-96 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-3/4  h-6 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-1/2 h-2 mb-4 shimmer"></div>
      <div className="bg-gray-700 rounded-md w-full h-24  shimmer"></div>
    </div>
  );
};
