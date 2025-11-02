import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface CheckboxProps {
  label: string | React.ReactNode;
  checked: boolean;
  onPress: () => void;
  error?: string;
  accessibilityLabel?: string;
}

export function Checkbox({ label, checked, onPress, error, accessibilityLabel }: CheckboxProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={accessibilityLabel}
        style={styles.pressable}>
        <MotiView
          animate={{
            backgroundColor: checked ? TellaColors.cyberPlum : 'transparent',
            borderColor: error ? TellaColors.error : checked ? TellaColors.cyberPlum : TellaColors.silkGrey,
          }}
          transition={{ type: 'timing', duration: 150 }}
          style={styles.checkbox}>
          {checked && (
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15 }}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </MotiView>
          )}
        </MotiView>

        <View style={styles.labelContainer}>
          {typeof label === 'string' ? (
            <Text style={styles.label}>{label}</Text>
          ) : (
            label
          )}
        </View>
      </Pressable>

      {error && (
        <MotiView
          from={{ opacity: 0, translateY: -4 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 150 }}>
          <Text style={styles.error}>{error}</Text>
        </MotiView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    ...Typography.body,
    color: TellaColors.silkGrey,
    lineHeight: 22,
  },
  error: {
    ...Typography.caption,
    color: TellaColors.error,
    marginTop: Spacing.xs,
    marginLeft: 32,
  },
});