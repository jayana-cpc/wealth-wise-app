"use client"

import Image from "next/image";
import styles from "./page.module.css";
import ApiComponent from "@/components/flaskTester";
export default function Home() {
  return (
    <ApiComponent />
  );
}
