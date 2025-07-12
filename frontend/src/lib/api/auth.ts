import { apiClient } from '@/lib/api/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: boolean;
  language?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export const authService = {
  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Failed to register. Please try again.');
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid email or password. Please try again.');
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<{ data: User }>('/api/auth/me');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to load user data');
    }
  },

  async updateUserDetails(userData: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.put<{ data: User }>('/api/auth/updatedetails', userData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update user details:', error);
      throw new Error('Failed to update user details');
    }
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await apiClient.put('/api/auth/updatepassword', { currentPassword, newPassword });
    } catch (error) {
      console.error('Password update error:', error);
      throw new Error('Failed to update password');
    }
  },

  async updatePreferences(preferences: UserPreferences): Promise<User> {
    try {
      const response = await apiClient.put<{ data: User }>('/api/auth/preferences', { preferences });
      return response.data.data;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw new Error('Failed to update preferences');
    }
  },

  logout(): void {
    try {
      // Call the logout endpoint
      apiClient.get('/api/auth/logout').catch(console.error);
    } finally {
      // Always clear local storage and redirect
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  },

  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post('/api/auth/forgotpassword', { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw new Error('Failed to send password reset email');
    }
  },

  async resetPassword(token: string, password: string): Promise<void> {
    try {
      await apiClient.put(`/api/auth/resetpassword/${token}`, { password });
    } catch (error) {
      console.error('Reset password error:', error);
      throw new Error('Failed to reset password');
    }
  }
};
