import { OutlinedButton } from '@/components/ui/outlined-button';
import { TellaColors } from '@/constants/colors';
import { BorderRadius, Spacing, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={TellaColors.brandGradient.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile?.username?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.greeting}>Olá, {profile?.username || 'usuário'}!</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>

        {/* Plan Badge */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 100, damping: 15 }}
          style={styles.planBadge}>
          <View style={styles.planBadgeContent}>
            <Text style={styles.planLabel}>Plano atual:</Text>
            <LinearGradient
              colors={
                profile?.plan === 'pro'
                  ? TellaColors.brandGradient.colors
                  : [TellaColors.graphiteShadow, TellaColors.graphiteShadow]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.planTag}>
              <Text style={styles.planText}>
                {profile?.plan === 'pro' ? 'Pro' : 'Free'}
              </Text>
            </LinearGradient>
          </View>
        </MotiView>

        {/* Placeholder Content */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 200 }}
          style={styles.placeholder}>
          <Text style={styles.placeholderTitle}>Em breve...</Text>
          <Text style={styles.placeholderText}>
            Esta é apenas a tela placeholder da Home. As funcionalidades principais do app serão
            implementadas na próxima fase.
          </Text>
        </MotiView>

        {/* Logout Button */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400, delay: 300 }}
          style={styles.logoutContainer}>
          <OutlinedButton
            title="Sair"
            onPress={handleLogout}
            accessibilityLabel="Fazer logout"
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
    paddingTop: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    marginRight: Spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.heading,
    color: '#FFFFFF',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    ...Typography.heading,
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.body,
    fontSize: 14,
    color: TellaColors.silkGrey,
  },
  planBadge: {
    marginBottom: Spacing.xl,
  },
  planBadgeContent: {
    backgroundColor: TellaColors.graphiteShadow,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planLabel: {
    ...Typography.body,
    color: TellaColors.silkGrey,
  },
  planTag: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  planText: {
    ...Typography.button,
    fontSize: 14,
    color: '#FFFFFF',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  placeholderTitle: {
    ...Typography.title,
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  placeholderText: {
    ...Typography.body,
    color: TellaColors.silkGrey,
    textAlign: 'center',
    lineHeight: 24,
  },
  logoutContainer: {
    paddingBottom: Spacing.lg,
  },
});