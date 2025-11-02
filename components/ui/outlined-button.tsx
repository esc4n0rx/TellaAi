import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

export interface OutlinedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function OutlinedButton({
  title,
  onPress,
  disabled = false,
  style,
  accessibilityLabel,
}: OutlinedButtonProps) {
  return (
    <MotiView
      animate={{
        opacity: disabled ? 0.5 : 1,
      }}
      transition={{ type: 'timing', duration: 150 }}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || title}
        style={({ pressed }) => [
          styles.container,
          style,
          pressed && !disabled && {transform: [{ scale: 0.98 }],
            backgroundColor: TellaColors.glassEffectHover,
          },
        ]}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    borderWidth: 2,
    borderColor: TellaColors.cyberPlum,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
    backgroundColor: 'transparent',
  },
  text: {
    ...Typography.button,
    color: TellaColors.cyberPlum,
  },
});