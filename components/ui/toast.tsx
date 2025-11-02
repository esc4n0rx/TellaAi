import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { MotiView } from 'moti';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onHide }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onHide]);

  const backgroundColor = 
    type === 'error' ? TellaColors.error :
    type === 'success' ? TellaColors.success :
    TellaColors.deepAzure;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 50 }}
      transition={{ type: 'timing', duration: 200 }}
      style={[styles.container, { backgroundColor }]}>
      <Text style={styles.message}>{message}</Text>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.md,
    right: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 9999,
  },
  message: {
    ...Typography.body,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});