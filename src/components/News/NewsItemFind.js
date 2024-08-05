import React from "react";
import Image from "next/image";
import styles from "./NewsItem.module.css";
import { Alert } from '@mantine/core';

export function NewsItem({ item }) {
  const today = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date(item.published_utc || today).toLocaleDateString("en-US", options);

  if (!item) {
    return <Alert title="Error" color="red">News data isn&apos;`t available.</Alert>;
  }

  return (
    <a href={item.article_url} className={styles.newsItem}>
      <div className={styles.imageContainer}>
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className={styles.placeholderImage}>No Image</div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.publisher}>
          {item.publisher && item.publisher.logo_url ? (
            <Image
              src={item.publisher.logo_url}
              alt={`${item.publisher.name} Logo`}
              width={20}
              height={20}
            />
          ) : (
            <div className={styles.placeholderLogo}>No Logo</div>
          )}
          {item.publisher && <span>{item.publisher.name}</span>}
        </div>
        <div className={styles.title}>
          <h2>{item.title}</h2>
        </div>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.date}>{formattedDate}</p>
      </div>
    </a>
  );
}
