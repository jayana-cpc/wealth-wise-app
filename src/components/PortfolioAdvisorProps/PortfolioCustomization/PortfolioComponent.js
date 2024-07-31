// src/components/PortfolioComponent.js
import React from "react";
import { db, auth } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const PortfolioComponent = ({ portfolio }) => {
  const [user] = useAuthState(auth);

  const savePortfolio = async () => {
    if (user) {
      try {
        const portfolioRef = doc(collection(db, "portfolios"), user.uid);
        await setDoc(portfolioRef, {
          portfolio,
          createdAt: new Date(),
        });
        alert("Portfolio saved successfully!");
      } catch (error) {
        console.error("Error saving portfolio:", error);
      }
    } else {
      alert("Please log in to save your portfolio.");
    }
  };

  return (
    <div>
      <button onClick={savePortfolio}>Create Portfolio</button>
    </div>
  );
};

export default PortfolioComponent;
