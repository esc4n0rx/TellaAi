import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

export interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export function InputField({
  label,
  error,
  containerStyle,
  ...textInputProps
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <MotiView
        animate={{
          borderColor: error 
            ? TellaColors.error 
            : isFocused 
            ? TellaColors.cyberPlum 
            : TellaColors.graphiteShadow,
        }}
        transition={{ type: 'timing', duration: 150 }}
        style={styles.inputWrapper}>
        <TextInput
          {...textInputProps}
          style={styles.input}
          placeholderTextColor={TellaColors.silkGrey}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
        />
      </MotiView>

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
  label: {
    ...Typography.body,
    color: TellaColors.silkGrey,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    backgroundColor: TellaColors.graphiteShadow,
  },
  input: {
    ...Typography.body,
    color: '#FFFFFF',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    minHeight: 56,
  },
  error: {
    ...Typography.caption,
    color: TellaColors.error,
    marginTop: Spacing.xs,
  },
});