// // tv or movie

import { create } from "zustand";
export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));

// import { create } from "zustand";

// export const useContentStore = create((set) => ({
//   contentType: "movie", // Initial state
//   setContentType: (type) => {
//     if (type === "movie" || type === "tv") {
//       set({ contentType: type });
//     } else {
//       console.error(`Invalid content type: ${type}`);
//     }
//   },
// }));
