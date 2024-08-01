import React from "react";
import styles from "./Menu.module.css";

export function Menu() {
  return (
    <div className={styles.menu}>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">News</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
