import React, { useState, useEffect } from "react";
import { Table, UnstyledButton, Group, Modal, Center } from "@mantine/core";
import Image from "next/image";
import styles from "./CompanyTable.module.css";
import StockPriceChart from "@/components/PortfolioAdvisorProps/PortfolioCustomization/PriceChart";


const CompanyTable = ({
  sector,
  stocks = [], // Data fetched from Flask server
}) => {
  const [currentStock, setCurrentStock] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    console.log("Stocks:", stocks); // Debugging log to check the structure of `stocks`
  }, [stocks]);

  const handleViewStats = (stock) => {
    setCurrentStock(stock);
    setOpened(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Companies in the {sector} Sector</div>
      <Table className={styles.table}>
        <tbody>
          {Array.isArray(stocks) && stocks.length > 0 ? (
            stocks.map((stock) => (
              <tr key={stock.symbol || 'unknown-symbol'}>
                <td>
                  <Image
                    src={stock.image || '/default-image.png'}
                    alt={`${stock.companyName || 'Unknown Company'} logo`}
                    width={50}
                    height={50}
                  />
                </td>
                <td>
                  <Center>
                    <a
                      href={stock.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.companyLink}
                    >
                      {stock.companyName || 'Unknown Company'}
                    </a>
                  </Center>
                </td>
                <td>
                  <Center>${stock.price || 'N/A'}</Center>
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
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {currentStock && (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={currentStock.companyName}
          size="70%"
        >
          <StockPriceChart priceData={currentStock.priceData} />
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
