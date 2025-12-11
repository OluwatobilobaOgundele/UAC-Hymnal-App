import SplashScreen from "../components/SplashScreen";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Screen() {
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/Onboarding1");
    }, 2500);

    return () => clearTimeout(t);
  }, []);

  return <SplashScreen />;
}
