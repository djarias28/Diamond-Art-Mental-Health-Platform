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
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<{ data: User }>('/auth/me');
    return response.data.data;
  },

  async updateUserDetails(userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<{ data: User }>('/auth/updatedetails', userData);
    return response.data.data;
  },

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    await apiClient.put('/auth/updatepassword', { currentPassword, newPassword });
  },

  async updatePreferences(preferences: UserPreferences): Promise<User> {
    const response = await apiClient.put<{ data: User }>('/auth/preferences', { preferences });
    return response.data.data;
  },

  logout(): void {
    localStorage.removeItem('token');
    // Optionally call a logout endpoint if you have one
    // await apiClient.post('/auth/logout');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgotpassword', { email });
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.put(`/auth/resetpassword/${token}`, { password });
  },
};
