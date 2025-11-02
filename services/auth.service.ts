import { supabase } from '@/lib/supabase';
import { LoginData, PlanType, RegisterData } from '@/types/auth.types';
import { Database, Profile, ProfileInsert } from '@/types/database.types';

export class AuthService {
  /**
   * Registra novo usuário
   */
  static async register(data: RegisterData) {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Falha ao criar usuário');

    // 2. Criar perfil no banco
    const profileData: ProfileInsert = {
      id: authData.user.id,
      username: data.username,
      birthdate: data.birthdate,
      likes: null,
      plan: null,
    };

    const { error: profileError } = await supabase
      .from('profiles')
      .insert(profileData);

    if (profileError) {
      // Rollback: deletar usuário se falhar ao criar perfil
      await supabase.auth.admin.deleteUser(authData.user.id);
      throw profileError;
    }

    return authData;
  }

  /**
   * Faz login
   */
  static async login(data: LoginData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) throw error;
    return authData;
  }

  /**
   * Faz logout
   */
  static async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  /**
   * Busca perfil do usuário
   */
  static async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }

  /**
   * Atualiza likes do usuário
   */
  static async updateLikes(userId: string, likes: string[]) {
    const { error } = await supabase
      .from('profiles')
      .update({ likes, updated_at: new Date().toISOString() } as Database['public']['Tables']['profiles']['Update'])
      .eq('id', userId);

    if (error) throw error;
  }

  /**
   * Atualiza plano do usuário
   */
  static async updatePlan(userId: string, plan: PlanType) {
    const { error } = await supabase
      .from('profiles')
      .update({ plan, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) throw error;
  }

  /**
   * Verifica se username está disponível
   */
  static async isUsernameAvailable(username: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (error && error.code === 'PGRST116') {
      // Nenhum resultado encontrado - username disponível
      return true;
    }

    return !data;
  }

  /**
   * Envia email de recuperação de senha
   */
  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'tellaai://reset-password',
    });

    if (error) throw error;
  }

  /**
   * Login com Google (placeholder para implementação futura)
   */
  static async loginWithGoogle() {
    throw new Error('Google OAuth não implementado nesta versão');
  }
}