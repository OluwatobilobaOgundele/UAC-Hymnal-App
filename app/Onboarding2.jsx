import OnboardingScreen from "../components/OnboardingScreen";
import { router } from "expo-router";

export default function Screen() {
  return (
    <OnboardingScreen
      message="Be Glad!"
      isLast={true}
      onNext={() => router.push("/(tabs)")}
      img = {require('../assets/images/image14.png')}
    />
  );
}
