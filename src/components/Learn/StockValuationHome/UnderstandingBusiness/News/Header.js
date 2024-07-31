import React from "react";
import styles from "./Header.module.css";

const Header = ({ title }) => {
  return <div className={styles.header}>{title}</div>;
};

export default Header;
