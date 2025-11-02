import { Checkbox } from '@/components/ui/checkbox';
import { InputField } from '@/components/ui/input-field';
import { LoadingButton } from '@/components/ui/loading-button';
import { Toast } from '@/components/ui/toast';
import { TellaColors } from '@/constants/colors';
import { Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { RegisterData } from '@/types/auth.types';
import { ageFromDate, registerSchema } from '@/utils/validation';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    KeyboardAvoidingView,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      birthdate: '',
      acceptedTerms: false,
    },
  });

  const birthdate = watch('birthdate');

  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      await signUp(data);
      // Navegação será tratada automaticamente pelo index.tsx
    } catch (error: any) {
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      if (error.message?.includes('User already registered')) {
        errorMessage = 'Este email já está em uso.';
      } else if (error.message?.includes('duplicate key')) {
        errorMessage = 'Este username já está em uso.';
      }

      setToast({
        message: errorMessage,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <MotiView
            from={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400 }}>
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Voltar">
              <Ionicons name="arrow-back" size={24} color={TellaColors.silkGrey} />
            </Pressable>

            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Junte-se a uma experiência única</Text>
          </MotiView>

          {/* Form */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 400, delay: 100 }}
            style={styles.form}>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Nome de usuário"
                  placeholder="seuusername"
                  value={value}
                  onChangeText={(text) => onChange(text.toLowerCase())}
                  onBlur={onBlur}
                  error={errors.username?.message}
                  autoCapitalize="none"
                  autoComplete="username"
                  textContentType="username"
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="E-mail"
                  placeholder="seu@email.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <InputField
                    label="Senha"
                    placeholder="Mínimo 8 caracteres"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password-new"
                    textContentType="newPassword"
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.showPasswordButton}>
                    <Ionicons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color={TellaColors.silkGrey}
                    />
                  </Pressable>
                </View>
              )}
            />

            <Controller
              control={control}
              name="birthdate"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <InputField
                    label="Data de nascimento"
                    placeholder="AAAA-MM-DD"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.birthdate?.message}
                    keyboardType="numbers-and-punctuation"
                    autoComplete="birthdate-full"
                  />
                  {value && !errors.birthdate && (
                    <Text style={styles.ageHint}>
                      Idade: {ageFromDate(value)} anos
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Gate +18 */}
            {birthdate && ageFromDate(birthdate) < 18 && (
              <MotiView
                from={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
                style={styles.ageWarning}>
                <Ionicons name="warning" size={20} color={TellaColors.warning} />
                <Text style={styles.ageWarningText}>
                  Este app é restrito para maiores de 18 anos.
                </Text>
              </MotiView>
            )}

            <Controller
              control={control}
              name="acceptedTerms"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  checked={value}
                  onPress={() => onChange(!value)}
                  error={errors.acceptedTerms?.message}
                  accessibilityLabel="Aceitar termos de uso"
                  label={
                    <Text style={styles.termsText}>
                      Li e aceito os{' '}
                      <Text
                        style={styles.termsLink}
                        onPress={() => Linking.openURL('https://tellaai.com/terms')}>
                        Termos de Uso
                      </Text>{' '}
                      e a{' '}
                      <Text
                        style={styles.termsLink}
                        onPress={() => Linking.openURL('https://tellaai.com/privacy')}>
                        Política de Privacidade
                      </Text>
                    </Text>
                  }
                />
              )}
            />

            <LoadingButton
              title="Criar conta"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              accessibilityLabel="Criar nova conta"
              style={styles.submitButton}
            />

            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>Já tem uma conta? </Text>
              <Pressable onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.loginLink}>Fazer login</Text>
              </Pressable>
            </View>
          </MotiView>
        </ScrollView>
      </KeyboardAvoidingView>

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
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.title,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: TellaColors.silkGrey,
    marginBottom: Spacing.xl,
  },
  form: {
    flex: 1,
  },
  showPasswordButton: {
    position: 'absolute',
    right: Spacing.md,
    top: 40,
    padding: Spacing.sm,
  },
  ageHint: {
    ...Typography.caption,
    color: TellaColors.silkGrey,
    marginTop: -Spacing.sm,
    marginBottom: Spacing.md,
  },
  ageWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${TellaColors.warning}20`,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  ageWarningText: {
    ...Typography.body,
    fontSize: 14,
    color: TellaColors.warning,
    flex: 1,
  },
  termsText: {
    ...Typography.body,
    fontSize: 14,
    color: TellaColors.silkGrey,
  },
  termsLink: {
    color: TellaColors.deepAzure,
    textDecorationLine: 'underline',
  },
  submitButton: {
    marginTop: Spacing.lg,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  loginPromptText: {
    ...Typography.body,
    color: TellaColors.silkGrey,
  },
  loginLink: {
    ...Typography.body,
    color: TellaColors.deepAzure,
    fontWeight: '600',
  },
});