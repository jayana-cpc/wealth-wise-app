import React from "react";
import styles from "../Learn/StockValuationHome/UnderstandingBusiness/News/Header.module.css";

export default function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
    </header>
  );
}
