import { supabase } from '@/lib/supabase';
import { AuthService } from '@/services/auth.service';
import { AuthState, LoginData, PlanType, RegisterData } from '@/types/auth.types';
import { Session } from '@supabase/supabase-js';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextValue extends AuthState {
  signIn: (data: LoginData) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  updateLikes: (likes: string[]) => Promise<void>;
  updatePlan: (plan: PlanType) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    initialized: false,
  });

  useEffect(() => {
    // Busca sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionChange(session);
    });

    // Listener de mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSessionChange(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSessionChange(session: Session | null) {
    if (session?.user) {
      // Busca perfil do usuário
      const profile = await AuthService.getProfile(session.user.id);

      setState({
        user: session.user,
        profile,
        session,
        loading: false,
        initialized: true,
      });
    } else {
      setState({
        user: null,
        profile: null,
        session: null,
        loading: false,
        initialized: true,
      });
    }
  }

  async function signIn(data: LoginData) {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await AuthService.login(data);
      // handleSessionChange será chamado automaticamente pelo listener
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  }

  async function signUp(data: RegisterData) {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await AuthService.register(data);
      // handleSessionChange será chamado automaticamente pelo listener
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  }

  async function signOut() {
    try {
      setState((prev) => ({ ...prev, loading: true }));
      await AuthService.logout();
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false }));
      throw error;
    }
  }

  async function updateLikes(likes: string[]) {
    if (!state.user) throw new Error('User not authenticated');

    await AuthService.updateLikes(state.user.id, likes);
    
    // Atualiza profile local
    setState((prev) => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, likes } : null,
    }));
  }

  async function updatePlan(plan: PlanType) {
    if (!state.user) throw new Error('User not authenticated');

    await AuthService.updatePlan(state.user.id, plan);
    
    // Atualiza profile local
    setState((prev) => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, plan } : null,
    }));
  }

  async function refreshProfile() {
    if (!state.user) return;

    const profile = await AuthService.getProfile(state.user.id);
    setState((prev) => ({ ...prev, profile }));
  }

  const value: AuthContextValue = {
    ...state,
    signIn,
    signUp,
    signOut,
    updateLikes,
    updatePlan,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}