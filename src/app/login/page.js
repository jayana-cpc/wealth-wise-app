"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle, handleRedirectResult } from "../../../lib/firebase";
import { Paper, Title, Divider, Button, Center, Group } from "@mantine/core";
import { GoogleButton } from "@/components/buttons/GoogleButton";
import { useUser } from "@/context/UserContext";
import classes from "./page.module.css";

export default function AuthenticationImage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [redirectHandled, setRedirectHandled] = useState(false);

  useEffect(() => {
    const processRedirectResult = async () => {
      console.log("Processing redirect result...");
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
        setRedirectHandled(true);
      }
    };

    if (!redirectHandled && router.query?.redirected) {
      processRedirectResult();
    }
  }, [redirectHandled, router]);

  const handleLogin = async () => {
    try {
      console.log("Starting sign-in with Google...");
      const user1 = await signInWithGoogle();
      const user = user1.user;
          const userData = {
            photoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          };
          setUser(userData);

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
          const backendResult = await res.json();
          console.log("Backend response:", backendResult);
          router.push("/dashboard");
         
      
      router.push("/dashboard");
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
        <Divider label="Continue as Guest" labelPosition="center" my="lg" />
        <Center>
          <Button radius="xl" className={classes.button} onClick={handleGuest}>
            Login
          </Button>
        </Center>
      </Paper>
    </div>
  );
}
