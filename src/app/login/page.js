"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { signInWithGoogle, handleRedirectResult } from "../../../lib/firebase";
import { Paper, Group, Title, Divider, Button, Center } from "@mantine/core";
import { GoogleButton } from "@/components/buttons/GoogleButton";
import { useUser } from "@/context/UserContext";
import classes from "./page.module.css";

export default function AuthenticationImage() {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        const result = await handleRedirectResult();
        console.log("Processed redirect result:", result);
        if (result) {
          const { user, additionalUserInfo } = result;
          console.log("User signed in:", user);

          const userData = {
            photoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            isNewUser: additionalUserInfo.isNewUser,
          };
          setUser(userData);

          console.log("Sending user data to backend");
          const res = await fetch("http://localhost:5000/api/login-google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          localStorage.setItem("user", JSON.stringify(userData));
          const result = await res.json();
          console.log("Backend response:", result);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Login failed", error);
        if (error.code === "auth/popup-closed-by-user") {
          alert("Popup closed by user. Please try again.");
        } else {
          alert(`Login failed: ${error.message}`);
        }
      }
    };

    processRedirectResult();
  }, [router, setUser]);

  const handleLogin = async () => {
    try {
      console.log("Starting handleLogin");
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
      if (error.code === "auth/popup-closed-by-user") {
        alert("Popup closed by user. Please try again.");
      } else {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const handleGuest = () => {
    router.push("/dashboard");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome to Wealth Wise
        </Title>
        <Group grow mb="md" mt="md">
          <GoogleButton
            radius="xl"
            className={classes.button}
            onClick={handleLogin}
          >
            Login with Google
          </GoogleButton>
        </Group>
        <Divider label="Or continue as Guest" labelPosition="center" my="lg" />

        <Center>
          <Button radius="xl" className={classes.button} onClick={handleGuest}>
            Login
          </Button>
        </Center>
      </Paper>
    </div>
  );
}
