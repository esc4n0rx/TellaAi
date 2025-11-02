import { TellaColors } from '@/constants/colors';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: TellaColors.velvetBlack,
        },
        animation: 'fade',
      }}>
      <Stack.Screen name="step-likes" />
      <Stack.Screen name="step-plan" />
    </Stack>
  );
}