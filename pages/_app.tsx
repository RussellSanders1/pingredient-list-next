import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AuthContext from '../lib/context';
import { useUserData } from '../lib/useUserData';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const userData = useUserData();
  return (
    <AuthContext.Provider value={userData}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
