import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8B0000',
        tabBarInactiveTintColor: '#666',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hymns',
          tabBarIcon: ({ size, color }) => (
          <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
