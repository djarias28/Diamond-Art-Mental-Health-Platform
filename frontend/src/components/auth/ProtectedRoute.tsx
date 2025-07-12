'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push(`/signin?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      // If role is required and user doesn't have it, redirect to home
      if (requiredRole && user?.role !== requiredRole) {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, router, requiredRole, user]);

  if (loading || !isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
