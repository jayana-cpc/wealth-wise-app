import React from "react";
import { NewsItem } from "./NewsItemFind";
import styles from "./NewsGrid.module.css";

export function NewsGrid({ items }) {
  return (
    <div className={styles.newsGrid}>
      {items.map((item, i) => (
        <NewsItem key={i} item={item} />
      ))}
    </div>
  );
}
