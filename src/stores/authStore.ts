import { defineStore } from 'pinia';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/services/supabaseClient';

// Define interfaces for your state
interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at?: string;
  avatar_url?: string;
  role?: 'customer' | 'handwerker';
  stripe_customer_id?: string;
  // Add other profile fields as needed
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isHandwerker: boolean;
  isCustomer: boolean;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    profile: null,
    isHandwerker: false,
    isCustomer: false,
    loading: false,
    error: null,
  }),
  
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    userRole: (state): string | null => {
      if (!state.user) return null;
      return state.isHandwerker ? 'handwerker' : 'customer';
    },
  },
  
  actions: {
    async initialize(): Promise<void> {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        this.user = data.session.user;
        await this.fetchProfile();
      }
      
      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        this.user = session?.user || null;
        if (event === 'SIGNED_IN' && this.user) {
          await this.fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          this.profile = null;
          this.isHandwerker = false;
          this.isCustomer = false;
        }
      });
    },
    
    async login(email: string, password: string): Promise<{ success: boolean, error?: string }> {
      this.loading = true;
      this.error = null;
      
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        this.user = data.user;
        await this.fetchProfile();
        
        return { success: true };
      } catch (error: any) {
        this.error = error.message || 'Failed to login';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async register(email: string, password: string, role: 'customer' | 'handwerker'): Promise<{ success: boolean, error?: string }> {
      this.loading = true;
      this.error = null;
      
      try {
        // 1. Create the auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (authError) throw authError;
        
        // 2. Create the profile
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: email,
              role: role,
            });
            
          if (profileError) throw profileError;
          
          this.user = authData.user;
          await this.fetchProfile();
          
          return { success: true };
        } else {
          throw new Error('User registration failed');
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to register';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async logout(): Promise<void> {
      this.loading = true;
      
      try {
        await supabase.auth.signOut();
        this.user = null;
        this.profile = null;
        this.isHandwerker = false;
        this.isCustomer = false;
      } catch (error: any) {
        this.error = error.message || 'Failed to logout';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProfile(): Promise<void> {
      if (!this.user) return;
      
      this.loading = true;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', this.user.id)
          .single();
          
        if (error) throw error;
        
        this.profile = data;
        
        // Determine user role
        if (data.role === 'handwerker') {
          this.isHandwerker = true;
          this.isCustomer = false;
        } else if (data.role === 'customer') {
          this.isHandwerker = false;
          this.isCustomer = true;
        }
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch profile';
        console.error('Error fetching profile:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async updateProfile(profileData: Partial<UserProfile>): Promise<{ success: boolean, error?: string }> {
      if (!this.user) {
        return { success: false, error: 'User not authenticated' };
      }
      
      this.loading = true;
      
      try {
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', this.user.id);
          
        if (error) throw error;
        
        // Refresh profile data
        await this.fetchProfile();
        
        return { success: true };
      } catch (error: any) {
        this.error = error.message || 'Failed to update profile';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async resetPassword(email: string): Promise<{ success: boolean, error?: string }> {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    
    async updatePassword(password: string): Promise<{ success: boolean, error?: string }> {
      try {
        const { error } = await supabase.auth.updateUser({
          password,
        });
        
        if (error) throw error;
        return { success: true };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  }
});