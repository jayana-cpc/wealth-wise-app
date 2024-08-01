import React, { useState, useEffect } from "react";
import { Table, UnstyledButton, Group, Modal, Center } from "@mantine/core";
import Image from "next/image";
import styles from "./CompanyTable.module.css";
import StockPriceChart from "@/components/PortfolioAdvisorProps/PortfolioCustomization/PriceChart";

const polygonApiKey = process.env.NEXT_PUBLIC_POLYGON_API_KEY;

const CompanyTable = ({
  sector,
  stocks,
  currentStock,
  setCurrentStock,
  opened,
  setOpened,
}) => {
  const [priceData, setPriceData] = useState({ results: [] });

  useEffect(() => {
    async function fetchData() {
      if (!currentStock) return;

      try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayFormatted = yesterday.toISOString().split("T")[0];

        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(yesterday.getDate() - 30);
        const oneMonthAgoFormatted = oneMonthAgo.toISOString().split("T")[0];

        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${currentStock.symbol}/range/1/day/${oneMonthAgoFormatted}/${yesterdayFormatted}?adjusted=true&sort=asc&limit=120&apiKey=${polygonApiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        setPriceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [currentStock]);

  const handleViewStats = (stock) => {
    setCurrentStock(stock);
    setOpened(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Companies in the {sector} Sector</div>
      <Table className={styles.table}>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>
                <Image
                  src={stock.image}
                  alt={`${stock.companyName} logo`}
                  width={50}
                  height={50}
                />
              </td>
              <td>
                <Center>
                  <a
                    href={stock.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.companyLink}
                  >
                    {stock.companyName}
                  </a>
                </Center>
              </td>
              <td>
                <Center>${stock.price}</Center>
              </td>
              <td>
                <Group className={styles.actionsGroup}>
                  <UnstyledButton
                    className={styles.viewStatsButton}
                    onClick={() => handleViewStats(stock)}
                  >
                    View Stats
                  </UnstyledButton>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {currentStock && (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={currentStock.companyName}
          size="70%"
        >
          <StockPriceChart priceData={priceData} />
          <div>
            <p>
              <strong>Symbol: </strong> {currentStock.symbol}
            </p>
            <p>
              <strong>Price: </strong>${currentStock.price}
            </p>
            <p>
              <strong>Industry: </strong> {currentStock.industry}
            </p>
            <p>
              <strong>Description: </strong>
              <br />
              {currentStock.description}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CompanyTable;
