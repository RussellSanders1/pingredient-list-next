import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContextProvider } from '../lib/context';
import { useUserData } from '../lib/useUserData';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const { user, username } = useUserData();
  return (
    <UserContextProvider value={{ user: user!, username: username! }}>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
