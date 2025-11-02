export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          birthdate: string | null
          likes: string[] | null
          plan: 'free' | 'pro' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          birthdate?: string | null
          likes?: string[] | null
          plan?: 'free' | 'pro' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          birthdate?: string | null
          likes?: string[] | null
          plan?: 'free' | 'pro' | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];