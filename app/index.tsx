import { TellaColors } from '@/constants/colors';
import { useAuth } from '@/contexts/auth-context';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * Rota raiz com lógica de redirecionamento baseada no estado de autenticação
 */
export default function Index() {
  const { user, profile, initialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inAppGroup = segments[0] === '(app)';

    // Se não está autenticado
    if (!user) {
      // Redireciona para Welcome se não estiver no grupo de auth
      if (!inAuthGroup) {
        router.replace('/(auth)/welcome');
      }
      return;
    }

    // Se está autenticado mas não tem perfil (erro)
    if (!profile) {
      console.error('User authenticated but no profile found');
      return;
    }

    // Se está autenticado e tem perfil
    const hasLikes = profile.likes && profile.likes.length >= 3;
    const hasPlan = profile.plan !== null;

    // --- BLOCO CORRIGIDO (NOVA ABORDAGEM) ---
    // Onboarding incompleto
    if (!hasLikes) {
      // Verifica se o usuário já está na tela correta.
      // Acesso a segments[1] é seguro; será 'undefined' se não existir.
      const isAtStepLikes = inOnboardingGroup && segments[1] === 'step-likes';

      if (!isAtStepLikes) {
        router.replace('/(onboarding)/step-likes');
      }
      return;
    }

    // --- BLOCO CORRIGIDO (NOVA ABORDAGEM) ---
    if (!hasPlan) {
      // Verifica se o usuário já está na tela correta.
      const isAtStepPlan = inOnboardingGroup && segments[1] === 'step-plan';

      if (!isAtStepPlan) {
        router.replace('/(onboarding)/step-plan');
      }
      return;
    }
    // --- FIM DOS BLOCOS CORRIGIDOS ---

    // Onboarding completo - vai para app
    if (!inAppGroup) {
      router.replace('/(app)/home');
    }
  }, [user, profile, initialized, segments]);

  // Loading state
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={TellaColors.cyberPlum} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TellaColors.velvetBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
});