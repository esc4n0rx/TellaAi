import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export interface BubbleTagProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function BubbleTag({ label, selected, onPress }: BubbleTagProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }}>
      <MotiView
        animate={{
          scale: selected ? 1 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 200,
        }}
        style={styles.container}>
        {selected ? (
          <LinearGradient
            colors={[...TellaColors.brandGradient.colors, 'rgba(180, 62, 191, 0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.selectedWrapper}>
            <Text style={[styles.text, styles.selectedText]}>{label}</Text>
          </LinearGradient>
        ) : (
          <MotiView style={styles.unselectedWrapper}>
            <Text style={styles.text}>{label}</Text>
          </MotiView>
        )}
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  selectedWrapper: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: TellaColors.cyberPlum,
  },
  unselectedWrapper: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: TellaColors.graphiteShadow,
    backgroundColor: TellaColors.graphiteShadow,
  },
  text: {
    ...Typography.body,
    fontSize: 15,
    color: TellaColors.silkGrey,
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});