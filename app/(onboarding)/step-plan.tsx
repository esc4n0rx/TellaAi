import { GradientButton } from '@/components/ui/gradient-button';
import { OutlinedButton } from '@/components/ui/outlined-button';
import { PlanCard } from '@/components/ui/plan-card';
import { Toast } from '@/components/ui/toast';
import { TellaColors } from '@/constants/colors';
import { Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { BillingMockService } from '@/services/billing.mock';
import { PlanType } from '@/types/auth.types';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StepPlanScreen() {
  const router = useRouter();
  const { updatePlan } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const plans = BillingMockService.getPlans();

  const handleSubscribe = async (plan: PlanType) => {
    try {
      setIsLoading(true);

      // Simula assinatura
      const result = await BillingMockService.subscribe(plan);

      if (result.success) {
        // Atualiza plano no perfil
        await updatePlan(plan);

        // Navega para Home
        router.replace('/(app)/home');
      }
    } catch (error: any) {
      setToast({
        message: error.message || 'Erro ao processar assinatura',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
          style={styles.header}>
          <Text style={styles.title}>Escolha seu plano</Text>
          <Text style={styles.subtitle}>
            Você pode mudar ou cancelar a qualquer momento
          </Text>
        </MotiView>

        {/* Cards de planos */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 100 }}>
          {plans.map((plan, index) => (
            <MotiView
              key={plan.id}
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                delay: index * 100,
                damping: 15,
              }}>
              <PlanCard
                {...plan}
                selected={selectedPlan === plan.id}
                onPress={() => setSelectedPlan(plan.id as PlanType)}
              />
            </MotiView>
          ))}
        </MotiView>
      </ScrollView>

      {/* Footer com CTAs */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 200 }}
        style={styles.footer}>
        {selectedPlan === 'pro' ? (
          <GradientButton
            title="Assinar Pro - R$ 9,90"
            onPress={() => handleSubscribe('pro')}
            loading={isLoading}
            accessibilityLabel="Assinar plano Pro"
          />
        ) : (
          <OutlinedButton
            title="Continuar no Free"
            onPress={() => handleSubscribe('free')}
            disabled={isLoading}
            accessibilityLabel="Continuar com plano gratuito"
          />
        )}
      </MotiView>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onHide={() => setToast(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TellaColors.velvetBlack,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 120, // Espaço para o footer
  },
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.title,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: TellaColors.silkGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: TellaColors.velvetBlack,
    borderTopWidth: 1,
    borderTopColor: TellaColors.graphiteShadow,
  },
});