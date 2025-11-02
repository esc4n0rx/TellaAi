/**
 * Tella Ai Design System - Color Palette
 * Identidade visual escura e imersiva com gradientes vibrantes
 */
export const TellaColors = {
  // Base
  velvetBlack: '#0A0A0C',
  graphiteShadow: '#1A1A1E',
  
  // Brand
  cyberPlum: '#B43EBF',
  electricRose: '#FF2E81',
  
  // Neutral
  silkGrey: '#CFCFD5',
  
  // Support
  deepAzure: '#3E7EFF',
  
  // Semantic
  error: '#FF4757',
  success: '#2ED573',
  warning: '#FFA502',
  
  // Gradients
  brandGradient: {
    colors: ['#B43EBF', '#FF2E81'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Opacity variants
  glassEffect: 'rgba(255, 255, 255, 0.08)',
  glassEffectHover: 'rgba(255, 255, 255, 0.12)',
} as const;

export type TellaColorKey = keyof typeof TellaColors;