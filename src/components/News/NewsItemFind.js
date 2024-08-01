import React from "react";
import Image from "next/image";
import styles from "./NewsItem.module.css";
import YahooLogo from "../../../public/yahoo.png";

export function NewsItem({ item }) {
  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <a href={item.url} className={styles.newsItem}>
      <div className={styles.imageContainer}>
        <Image
          src={item.img_url}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.publisher}>
          <Image src={YahooLogo} alt="Yahoo Logo" width={20} height={20} />
          <span>Yahoo Finance</span>
        </div>
        <div className={styles.title}>
          <h2>{item.title}</h2>
        </div>
        <p className={styles.description}>{item.content}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
    </a>
  );
}
