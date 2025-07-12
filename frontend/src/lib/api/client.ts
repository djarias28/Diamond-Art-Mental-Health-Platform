/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Use environment variable or default to production URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://diamond-art-therapy-server.vercel.app';

class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      withCredentials: true,
      timeout: 15000,
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Only run in browser environment
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized errors
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}

// Create and export a singleton instance
export const apiClient = ApiClient.getInstance();
