import React from 'react';
import Image from 'next/image';
import styles from './NewsItem.module.css';

export function NewsItem({ item }) {
    const publishedUtc = item.published_utc;
    const date = new Date(publishedUtc);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return (
        <a href={item.article_url} className={styles.newsItem}>
            <div className={styles.imageContainer}>
                <Image src={item.image_url} alt={item.title} layout="fill" objectFit="cover" />
            </div>
            <div className={styles.content}>
                <div className={styles.publisher}>
                    <Image src={item.publisher.favicon_url} alt={item.id} width={20} height={20} />
                    <span>{item.publisher.name}</span>
                </div>
                <div className={styles.title}>
                    <h2>{item.title}</h2>
                </div>
                <p className={styles.description}>
                    {item.description}
                </p>
                <p className={styles.date}>
                    {formattedDate}
                </p>
            </div>
        </a>
    );
}
