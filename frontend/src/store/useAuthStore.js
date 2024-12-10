// import axios from "axios";
// import toast from "react-hot-toast";
// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isSigningUp: false,
//   isCheckingAuth: true,
//   isLogginOut: false,
//   signup: async (credentials) => {
//     set({ isSigningUp: true });
//     try {
//       const response = await axios.post("/api/v1/auth/signup", credentials);
//       set({ user: response.data.user, isSigningUp: false });
//       toast.success("Account Created Successfully");
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response.data.message || "An Error Occured");

//       set({ isSigningUp: false, user: null });
//     }
//   },
//   login: async () => {},
//   logout: async () => {
//     set({ isLogginOut: true });
//     try {
//       await axios.post("/api/v1/auth/logout");
//       set({ user: null, isLogginOut: false });
//       toast.success("Logged out successfully");
//     } catch (error) {
//       console.error("Error during logout Check:", error.message);
//       set({ user: null, isCheckingAuth: false });
//     }
//   },
//   authCheck: async () => {
//     set({ isCheckingAuth: true });
//     try {
//       const { data } = await axios.get("/api/v1/auth/authcheck", {
//         withCredentials: true, // Ensure cookies are sent
//       });
//       set({ user: data.user, isCheckingAuth: false });
//       // toast.success("Logged out successfully");
//     } catch (error) {
//       set({ isLogginOut: false });
//       console.error("Error during auth check:", error.message);
//       toast.error(error.response.data.message || "Logout Failed");
//     }
//   },
// }));

import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggedIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account Created Successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An Error Occurred");
      set({ isSigningUp: false, user: null });
    }
  },
  // login: async (credentials) => {
  //   // Implement login functionality
  //   set({ isCheckingAuth: true });
  //   try {
  //     const response = await axios.post("/api/v1/auth/login", credentials);
  //     set({ user: response.data.user, isCheckingAuth: false });
  //     toast.success("Logged in successfully");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(error.response?.data?.message || "Login Failed");
  //     set({ isCheckingAuth: false });
  //   }
  // },

  login: async (credentials) => {
    set({ isLoggedIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggedIn: false });
      toast.success("Logged in Successfully");
    } catch (error) {
      set({ isLoggedIn: false, user: null });
      toast.error(error.response?.data?.message || "Login Failed");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error.message);
      set({ user: null, isLoggingOut: false });
    }
    a;
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const { data } = await axios.get("/api/v1/auth/authcheck", {
        withCredentials: true, // Ensure cookies are sent
      });
      set({ user: data.user, isCheckingAuth: false });
    } catch (error) {
      console.error("Error during auth check:", error.message);
      toast.error(error.response?.data?.message || "Auth Check Failed");
      set({ isCheckingAuth: false }); // Reset correct state flag
    }
  },
}));
