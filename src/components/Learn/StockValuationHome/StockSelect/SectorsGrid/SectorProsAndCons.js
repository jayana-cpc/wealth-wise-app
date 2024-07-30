import React from 'react';
import styles from './SectorProsAndCons.module.css';
import { List, ThemeIcon } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

const SectorProsAndCons = ({ sectorName, pros, cons }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Pros and Cons of the {sectorName} Sector</div>
      <div className={styles.content}>
        <div className={styles.pros}>
          <h3>Pros</h3>
          <List
            spacing="sm"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCheck size={16} />
              </ThemeIcon>
            }
          >
            {pros.map((pro, index) => (
              <List.Item key={index}>{pro}</List.Item>
            ))}
          </List>
        </div>
        <div className={styles.cons}>
          <h3>Cons</h3>
          <List
            spacing="sm"
            size="sm"
            center
            icon={
              <ThemeIcon color="red" size={24} radius="xl">
                <IconX size={16} />
              </ThemeIcon>
            }
          >
            {cons.map((con, index) => (
              <List.Item key={index}>{con}</List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default SectorProsAndCons;
