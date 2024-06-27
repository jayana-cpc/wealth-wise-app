// src/app/login/page.js
"use client";

import { useRouter } from 'next/navigation';
import { signInWithGoogle } from '@/lib/firebase';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import { Paper, Group, TextInput, PasswordInput, Checkbox, Button, Title, Divider, Stack, Anchor } from '@mantine/core';
import { GoogleButton } from '@/components/buttons/GoogleButton';
import { useUser } from '@/context/UserContext';
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

  const handleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();
      const userData = {
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
      };
      setUser(userData); 
      router.push('/dashboard'); 
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSubmit = (values) => {
    console.log(values);
    router.push('/dashboard');
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
        <Divider label="Or continue with email" labelPosition="center" my="lg" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}
            <TextInput
              required
              label="Email address"
              placeholder="hello@gmail.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>
          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" className={classes.button}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
