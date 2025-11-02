import { BubbleTag } from '@/components/ui/bubble-tag';
import { GradientButton } from '@/components/ui/gradient-button';
import { Toast } from '@/components/ui/toast';
import { TellaColors } from '@/constants/colors';
import { Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { validateLikes } from '@/utils/validation';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AVAILABLE_LIKES = [
  'Romance',
  'Sci-fi',
  'Fantasia',
  'Mistério',
  'Humor',
  'Tsundere',
  'Dominant',
  'Subtle flirt',
  'Medieval',
  'Cyberpunk',
  'Vampire',
  'Office',
  'Apocalíptico',
  'Histórico',
  'Sobrenatural',
  'Slice of life',
];

export default function StepLikesScreen() {
  const router = useRouter();
  const { updateLikes } = useAuth();
  const [selectedLikes, setSelectedLikes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const toggleLike = (like: string) => {
    setSelectedLikes((prev) =>
      prev.includes(like) ? prev.filter((l) => l !== like) : [...prev, like]
    );
  };

  const handleContinue = async () => {
    if (!validateLikes(selectedLikes)) {
      setToast({
        message: 'Selecione no mínimo 3 interesses',
        type: 'error',
      });
      return;
    }

    try {
      setIsLoading(true);
      await updateLikes(selectedLikes);
      router.replace('/(onboarding)/step-plan');
    } catch (error: any) {
      setToast({
        message: error.message || 'Erro ao salvar interesses',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = validateLikes(selectedLikes);

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
          <Text style={styles.title}>Conte o que você curte</Text>
          <Text style={styles.subtitle}>
            Selecione no mínimo 3 interesses ({selectedLikes.length}/3)
          </Text>
        </MotiView>

        {/* Grade de bolhas */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 100 }}
          style={styles.tagsContainer}>
          {AVAILABLE_LIKES.map((like, index) => (
            <MotiView
              key={like}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                delay: index * 30,
                damping: 15,
              }}>
              <BubbleTag
                label={like}
                selected={selectedLikes.includes(like)}
                onPress={() => toggleLike(like)}
              />
            </MotiView>
          ))}
        </MotiView>
      </ScrollView>

      {/* Footer fixo */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 200 }}
        style={styles.footer}>
        <GradientButton
          title="Continuar"
          onPress={handleContinue}
          disabled={!isValid}
          loading={isLoading}
          accessibilityLabel="Continuar para próxima etapa"
        />
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
    paddingBottom: 100, // Espaço para o footer
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
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