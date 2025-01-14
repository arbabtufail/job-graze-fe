'use client';
import withAuth from '@/shared/hoc/useAuth';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default withAuth(ProtectedLayout);
