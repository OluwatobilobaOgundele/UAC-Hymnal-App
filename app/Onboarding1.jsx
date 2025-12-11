import OnboardingScreen from "../components/OnboardingScreen";
import { router } from "expo-router";

export default function Screen() {
  return (
    <OnboardingScreen
      message="Let's Rejoice"
      isLast={false}
      onNext={() => router.push("/Onboarding2")}
        img = {require('../assets/images/image13.png')}
      
    />
  );
}
