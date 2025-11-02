import React from 'react';
import { GradientButton, GradientButtonProps } from './gradient-button';

export interface LoadingButtonProps extends Omit<GradientButtonProps, 'loading'> {
  isLoading: boolean;
}

export function LoadingButton({ isLoading, disabled, ...props }: LoadingButtonProps) {
  return (
    <GradientButton
      {...props}
      disabled={disabled || isLoading}
      loading={isLoading}
    />
  );
}