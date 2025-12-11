import { Stack } from "expo-router";
import 'react-native-reanimated';


export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="Onboarding1" />
      <Stack.Screen name="Onboarding2" />
      <Stack.Screen name="language" />
       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="hymnList" />
      <Stack.Screen name="hymnDetail" />
     
       <Stack.Screen name="not-found" />
    </Stack>
  );
}
