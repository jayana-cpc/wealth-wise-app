"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, handleRedirectResult } from "../../../lib/firebase";
import { Paper, Title, Divider, Button, Center, Group, Box, LoadingOverlay } from "@mantine/core";
import { GoogleButton } from "@/components/buttons/GoogleButton";
import { useUser } from "@/context/UserContext";
import { useDisclosure } from "@mantine/hooks";
import classes from "./page.module.css";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL 
export default function AuthenticationImage() {
  
  const router = useRouter();
  const { setUser } = useUser();
  const [redirectHandled, setRedirectHandled] = useState(false);
  const [visible, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const processRedirectResult = async () => {
      console.log("Processing redirect result...");
      open(); 
      try {
        const result = await handleRedirectResult();
        if (result) {
          console.log("Redirect result:", result);
          const { user, additionalUserInfo } = result;
          const userData = {
            photoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            isNewUser: additionalUserInfo.isNewUser,
          };
          setUser(userData);

          const res = await fetch(`http://${URL}/api/login-google`, {
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
          const backendResult = await res.json();
          console.log("Backend response:", backendResult);
          router.push("/dashboard");
        } else {
          console.log("No redirect result found.");
        }
      } catch (error) {
        console.error("Login failed", error);
        if (error.code === "auth/popup-closed-by-user") {
          alert("Popup closed by user. Please try again.");
        } else {
          alert(`Login failed: ${error.message}`);
        }
      } finally {
        close(); // Hide the loading overlay
        setRedirectHandled(true);
      }
    };

    if (!redirectHandled && router.query?.redirected) {
      processRedirectResult();
    }
  }, [redirectHandled, router, setUser, open, close]);

  const handleLogin = async () => {
    try {
      console.log("Starting sign-in with Google...");
      open(); // Show the loading overlay
      const user1 = await signInWithGoogle();
      const user = user1.user;
      const userData = {
        photoURL: user.photoURL,
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
      };
      setUser(userData);

      const res = await fetch(`http://${URL}/api/login-google`, {
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
      const backendResult = await res.json();
      console.log("Backend response:", backendResult);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      if (error.code === "auth/popup-closed-by-user") {
        alert("Popup closed by user. Please try again.");
      } else {
        alert(`Login failed: ${error.message}`);
      }
    } finally {
      close(); 
    }
  };

  const handleGuest = () => {
    router.push("/dashboard");
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay}></div>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
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
              Sign Up/Login with Google
            </GoogleButton>
          </Group>
          <Divider label="Continue as Guest" labelPosition="center" my="lg" />
          <Center>
            <Button radius="xl" className={classes.button} onClick={handleGuest}>
              Login
            </Button>
          </Center>
        </Paper>
      </Box>
    </div>
  );
}