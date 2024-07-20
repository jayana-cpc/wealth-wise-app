// src/app/login/page.js
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, getRedirectResultHandler, auth } from '@/lib/firebase';
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Paper, Group, Title, } from '@mantine/core';
import { GoogleButton } from '@/components/buttons/GoogleButton';
import { useUser } from '@/context/UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import classes from './page.module.css';

export default function AuthenticationImage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  useEffect(() => {
    const handleRedirectResult = async () => {
      console.log('Checking redirect result...');
      const result = await getRedirectResultHandler();
      console.log('Redirect result:', result);
      if (result) {
        const { user } = result;
        const userData = {
          photoURL: user.photoURL,
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        };
        console.log('User data retrieved:', userData);
        setUser(userData);

        const res = await fetch('http://localhost:5000/api/login-google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        localStorage.setItem('user', JSON.stringify(userData));

        const result = await res.json();
        console.log('API response:', result);
        router.push('/dashboard');
      } else {
        console.log('No redirect result found');
      }
    };

    handleRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          photoURL: user.photoURL,
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        };
        console.log('User authenticated:', userData);
        setUser(userData);
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router, setUser]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to Wealth Wise!
        </Title>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl" className={classes.button} onClick={handleLogin}>Login with Google</GoogleButton>
        </Group>
      </Paper>
    </div>
  );
}
