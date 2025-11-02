import { Session, User } from '@supabase/supabase-js';
import { Profile } from './database.types';

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  acceptedTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export type PlanType = 'free' | 'pro';