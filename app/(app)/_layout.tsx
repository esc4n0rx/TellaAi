import { TellaColors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: TellaColors.velvetBlack,
        },
      }}>
      <Stack.Screen name="home" />
    </Stack>
  );
}