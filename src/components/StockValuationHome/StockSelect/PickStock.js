import React from 'react';
import { SectorCarousel } from './sectorCarousel';
import styles from './PickStock.module.css';

export function PickStock() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            <h1>Market Sectors</h1>
          </div>
        </div>
      </div>
      <SectorCarousel />
      
    </>
  );
}