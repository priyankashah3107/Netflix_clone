import React from "react";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import { useAuthStore } from "../../store/useAuthStore.js";

const HomePage = () => {
  // const user = false;
  const { user } = useAuthStore();
  return (
    <>
      <div>{user ? <HomeScreen /> : <AuthScreen />}</div>
    </>
  );
};

export default HomePage;
