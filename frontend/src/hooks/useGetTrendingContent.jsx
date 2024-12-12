import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content.js";
import axios from "axios";
const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  console.log("Content Type", contentType);

  useEffect(() => {
    const getTrendingContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      // console.log("response is", res.data);
      setTrendingContent(res?.data?.content);
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
