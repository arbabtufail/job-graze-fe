'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const withAuth = (Component: React.ComponentType<any>) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const [state, setState] = useState<'loading' | 'authenticated'>('loading');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setState('authenticated');
      } else {
        const timer = setTimeout(() => {
          router.push('/login');
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [router]);

    if (state === 'loading') {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
