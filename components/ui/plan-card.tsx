import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface PlanCardProps {
  id: string;
  name: string;
  title: string;
  price: string;
  features: string[];
  selected: boolean;
  onPress: () => void;
}

export function PlanCard({ name, title, price, features, selected, onPress }: PlanCardProps) {
  const isPro = name === 'Pro';

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected }}>
      <MotiView
        animate={{
          scale: selected ? 1.02 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 15,
        }}
        style={styles.container}>
        {isPro ? (
          <LinearGradient
            colors={[...TellaColors.brandGradient.colors]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, styles.proCard]}>
            {renderCardContent()}
          </LinearGradient>
        ) : (
          <View style={[styles.card, styles.freeCard]}>
            {renderCardContent()}
          </View>
        )}
      </MotiView>
    </Pressable>
  );

  function renderCardContent() {
    return (
      <>
        <View style={styles.header}>
          <View>
            <Text style={[styles.name, isPro && styles.proText]}>{name}</Text>
            <Text style={[styles.title, isPro && styles.proText]}>{title}</Text>
          </View>
          {selected && (
            <MotiView
              from={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}>
              <View style={[styles.badge, isPro && styles.proBadge]}>
                <Ionicons name="checkmark" size={16} color={isPro ? '#FFFFFF' : TellaColors.cyberPlum} />
              </View>
            </MotiView>
          )}
        </View>

        <Text style={[styles.price, isPro && styles.proText]}>{price}</Text>

        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={isPro ? 'rgba(255, 255, 255, 0.8)' : TellaColors.cyberPlum}
              />
              <Text style={[styles.featureText, isPro && styles.proText]}>{feature}</Text>
            </View>
          ))}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    borderWidth: 2,
  },
  freeCard: {
    backgroundColor: TellaColors.graphiteShadow,
    borderColor: TellaColors.graphiteShadow,
  },
  proCard: {
    borderColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  name: {
    ...Typography.heading,
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  title: {
    ...Typography.caption,
    color: TellaColors.silkGrey,
  },
  price: {
    ...Typography.heading,
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: Spacing.lg,
  },
  features: {
    gap: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureText: {
    ...Typography.body,
    fontSize: 15,
    color: TellaColors.silkGrey,
    flex: 1,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(180, 62, 191, 0.2)',
    borderWidth: 2,
    borderColor: TellaColors.cyberPlum,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#FFFFFF',
  },
  proText: {
    color: '#FFFFFF',
  },
});