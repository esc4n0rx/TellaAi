import { GradientButton } from '@/components/ui/gradient-button';
import { OutlinedButton } from '@/components/ui/outlined-button';
import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 600 }}
        style={styles.content}>
        {/* Logo com gradiente */}
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={TellaColors.brandGradient.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoGradient}>
            <Text style={styles.logo}>Tella Ai</Text>
          </LinearGradient>

          {/* Glow pulsante */}
          <MotiView
            from={{ opacity: 0.3 }}
            animate={{ opacity: 0.7 }}
            transition={{
              type: 'timing',
              duration: 2000,
              loop: true,
            }}
            style={styles.glow}
          />
        </View>

        {/* Textos */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
          style={styles.textContainer}>
          <Text style={styles.title}>Sussurre segredos com a IA.</Text>
          <Text style={styles.subtitle}>
            Crie personagens, faça roleplay e mergulhe numa conversa imersiva.
          </Text>
        </MotiView>

        {/* CTAs */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 400 }}
          style={styles.buttonsContainer}>
          <GradientButton
            title="Fazer login"
            onPress={() => router.push('/(auth)/login')}
            accessibilityLabel="Ir para tela de login"
          />

          <OutlinedButton
            title="Criar nova conta"
            onPress={() => router.push('/(auth)/register')}
            accessibilityLabel="Ir para tela de registro"
            style={styles.secondaryButton}
          />
        </MotiView>
      </MotiView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TellaColors.velvetBlack,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: Spacing.xxl,
    position: 'relative',
  },
  logoGradient: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  logo: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  glow: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    backgroundColor: TellaColors.cyberPlum,
    borderRadius: BorderRadius.xl,
    opacity: 0.3,
    zIndex: -1,
  },
  textContainer: {
    marginBottom: Spacing.xxl,
    alignItems: 'center',
  },
  title: {
    ...Typography.title,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.body,
    color: TellaColors.silkGrey,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  secondaryButton: {
    marginTop: Spacing.sm,
  },
});