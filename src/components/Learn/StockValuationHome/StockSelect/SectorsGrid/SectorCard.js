import React from "react";
import {
  Title,
  Text,
  Space,
  Group,
  Avatar,
  Alert,
  Skeleton,
} from "@mantine/core";
import CompanyTable from "./CompanyTable";
import SectorProsAndCons from "./SectorProsAndCons";
import styles from "./SectorCard.module.css";

const SectorCard = ({ sectorName, description, pros, cons, icon, stocks, loading, error }) => {
  return (
    <div className={styles.textBody}>
      <Group>
        <Avatar>{icon}</Avatar>
        <Title order={3}>{sectorName} Sector</Title>
      </Group>

      <Space h="md" />
      <Text>{description}</Text>
      <Space h="sm" />
      <SectorProsAndCons sectorName={sectorName} pros={pros} cons={cons} />
      <Space h="sm" />
      {loading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert title="Error" color="red">
          {error}
        </Alert>
      ) : (
        <CompanyTable
          sector={sectorName}
          stocks={stocks}
        />
      )}
    </div>
  );
};

const SkeletonTable = () => (
  <div>
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} height={50} mb="sm" />
    ))}
  </div>
);

export default SectorCard;
