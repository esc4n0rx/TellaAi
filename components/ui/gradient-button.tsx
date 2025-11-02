import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

export interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function GradientButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}: GradientButtonProps) {
  return (
    <MotiView
      animate={{
        opacity: disabled ? 0.5 : 1,
      }}
      transition={{ type: 'timing', duration: 150 }}>
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        style={({ pressed }) => [
          styles.container,
          style,
          pressed && !disabled && !loading && { transform: [{ scale: 0.98 }] },
        ]}>
        <LinearGradient
          colors={TellaColors.brandGradient.colors}
          start={TellaColors.brandGradient.start}
          end={TellaColors.brandGradient.end}
          style={styles.gradient}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.text}>{title}</Text>
          )}
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: TellaColors.cyberPlum,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 56,
  },
  gradient: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  text: {
    ...Typography.button,
    color: '#FFFFFF',
  },
});