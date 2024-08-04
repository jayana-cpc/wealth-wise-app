import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Group, Image, Anchor, NumberInput, Modal } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import styles from "./TickerSearch.module.css";
import StockPriceChart from "./PriceChart";

export function SelectedStocksTable({ selectedTicker }) {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [priceData, setPriceData] = useState({ results: [] });
  const [currentStock, setCurrentStock] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBuyInfo, setCurrentBuyInfo] = useState({ symbol: "", index: -1 });
  const [viewStatsOpen, setViewStatsOpen] = useState(false);

  const fetchStockPriceData = useCallback(async (symbol) => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayFormatted = yesterday.toISOString().split("T")[0];

      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
      const oneMonthAgoFormatted = oneMonthAgo.toISOString().split("T")[0];

      const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${oneMonthAgoFormatted}/${yesterdayFormatted}?adjusted=true&sort=asc&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setPriceData(data);
    } catch (error) {
      console.error("Error fetching stock price data:", error);
    }
  }, []);

  const fetchStockDetails = useCallback(async (symbol) => {
    try {
      const response = await fetch(
        `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
      );
      if (!response.ok) {
        throw new Error("Error fetching stock details");
      }
      const data = await response.json();
      if (data && data[0]) {
        return { ...data[0], buyInfo: data[0].buyInfo || [{ date: null, shares: 0 }] };
      } else {
        console.error("Invalid data format from API");
        return null;
      }
    } catch (error) {
      console.error("Error fetching stock details:", error);
      return null;
    }
  }, []);

  const fetchAndAddStockDetails = useCallback(
    async (symbol) => {
      try {
        const data = await fetchStockDetails(symbol);
        if (data) {
          setSelectedStocks((prevStocks) => {
            const updatedStocks = [...prevStocks, data];
            localStorage.setItem(
              "guestPortfolio",
              JSON.stringify(updatedStocks),
            );
            return updatedStocks;
          });
        }
      } catch (error) {
        console.error("Error occurred during API request:", error);
        saveToLocalStorage({ symbol });
      }
    },
    [fetchStockDetails],
  );

  const loadPortfolio = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      loadGuestPortfolio();
      return;
    }

    try {
      const portfolioData = await fetchPortfolioInfo(user);
      const stockDetailsPromises =
        Object.keys(portfolioData).map(fetchStockDetails);
      const stockDetails = await Promise.all(stockDetailsPromises);
      setSelectedStocks(stockDetails.filter((stock) => stock !== null).map(stock => ({ ...stock, buyInfo: stock.buyInfo || [{ date: null, shares: 0 }] })));
    } catch (error) {
      console.error("Error fetching portfolio info:", error);
    }
  }, [fetchStockDetails]);

  useEffect(() => {
    if (currentStock) {
      fetchStockPriceData(currentStock.symbol);
    }
  }, [currentStock, fetchStockPriceData]);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  useEffect(() => {
    if (selectedTicker) {
      fetchAndAddStockDetails(selectedTicker.symbol);
    }
  }, [selectedTicker, fetchAndAddStockDetails]);

  const fetchPortfolioInfo = async (user) => {
    const res = await fetch("http://localhost:5000/api/get-portfolio-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  };

  const handleRemove = async (stock) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      removeFromLocalStorage(stock);
      return;
    }

    const payload = {
      stock,
      user,
    };

    try {
      const res = await fetch(
        "http://localhost:5000/api/delete-portfolio-info",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setSelectedStocks((prevStocks) => {
        const updatedStocks = prevStocks.filter(
          (s) => s.symbol !== stock.symbol,
        );
        localStorage.setItem("guestPortfolio", JSON.stringify(updatedStocks));
        closeModal(); // Close the modal if open
        return updatedStocks;
      });
    } catch (error) {
      console.error("Error occurred during API request:", error);
      removeFromLocalStorage(stock);
    }
  };

  const saveToLocalStorage = (ticker) => {
    let guestPortfolio =
      JSON.parse(localStorage.getItem("guestPortfolio")) || [];
    guestPortfolio.push(ticker);
    localStorage.setItem("guestPortfolio", JSON.stringify(guestPortfolio));
    setSelectedStocks(guestPortfolio);
  };

  const removeFromLocalStorage = (stock) => {
    let guestPortfolio =
      JSON.parse(localStorage.getItem("guestPortfolio")) || [];
    guestPortfolio = guestPortfolio.filter((s) => s.symbol !== stock.symbol);
    localStorage.setItem("guestPortfolio", JSON.stringify(guestPortfolio));
    setSelectedStocks(guestPortfolio.map(stock => ({ ...stock, buyInfo: stock.buyInfo || [{ date: null, shares: 0 }] })));
    closeModal(); // Close the modal if open
  };

  const loadGuestPortfolio = () => {
    const guestPortfolio =
      JSON.parse(localStorage.getItem("guestPortfolio")) || [];
    setSelectedStocks(guestPortfolio.map(stock => ({ ...stock, buyInfo: stock.buyInfo || [{ date: null, shares: 0 }] })));
  };

  const handleViewStats = (stock) => {
    setCurrentStock(stock);
    setViewStatsOpen(true);
  };

  const handleBuyInfoChange = (symbol, index, field, value) => {
    const updatedStocks = selectedStocks.map((stock) => {
      if (stock.symbol === symbol) {
        const newBuyInfo = stock.buyInfo.map((info, i) => 
          i === index ? { ...info, [field]: value } : info
        );
        return { ...stock, buyInfo: newBuyInfo };
      }
      return stock;
    });

    setSelectedStocks(updatedStocks);
    localStorage.setItem("guestPortfolio", JSON.stringify(updatedStocks));
  };

  const addBuyInfo = () => {
    const updatedStocks = selectedStocks.map((stock) => {
      if (stock.symbol === currentBuyInfo.symbol) {
        return { ...stock, buyInfo: [...stock.buyInfo, { date: null, shares: 0 }] };
      }
      return stock;
    });

    setSelectedStocks(updatedStocks);
    localStorage.setItem("guestPortfolio", JSON.stringify(updatedStocks));
  };

  const parseDatesInPortfolio = (portfolio) => {
    return portfolio.map(stock => ({
      ...stock,
      buyInfo: stock.buyInfo.map(info => ({
        ...info,
        date: info.date ? new Date(info.date) : null,
      })),
    }));
  };

  useEffect(() => {
    const guestPortfolio = JSON.parse(localStorage.getItem("guestPortfolio")) || [];
    const parsedPortfolio = parseDatesInPortfolio(guestPortfolio);
    setSelectedStocks(parsedPortfolio);
  }, []);

  const openModal = (symbol, index) => {
    setCurrentBuyInfo({ symbol, index });
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentBuyInfo({ symbol: "", index: -1 });
    setModalOpen(false);
  };

  return (
    <>
      <Modal opened={modalOpen} onClose={closeModal} title="Edit Buy Info">
        {currentBuyInfo.symbol && currentBuyInfo.index > -1 && (
          <div>
            {selectedStocks.find(stock => stock.symbol === currentBuyInfo.symbol)?.buyInfo.map((info, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <DateInput
                  value={info.date}
                  onChange={(date) => handleBuyInfoChange(currentBuyInfo.symbol, index, 'date', date)}
                  label="Purchase Date"
                  placeholder="Pick date"
                  style={{ marginBottom: '10px' }}
                />
                <NumberInput
                  value={info.shares}
                  onChange={(value) => handleBuyInfoChange(currentBuyInfo.symbol, index, 'shares', value)}
                  label="Number of Shares"
                  placeholder="Number of Shares"
                  style={{ marginBottom: '10px' }}
                />
              </div>
            ))}
            <Button onClick={addBuyInfo}>Add Buy Info</Button>
          </div>
        )}
      </Modal>
      <Modal
        opened={viewStatsOpen}
        onClose={() => setViewStatsOpen(false)}
        title={currentStock ? currentStock.companyName : "Stock Stats"}
        size="70%"
      >
        <StockPriceChart priceData={priceData} />
        {currentStock && (
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
        )}
      </Modal>
      <Table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Company</th>
            <th>Price</th>
            <th>Industry</th>
            <th>Buy Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedStocks.map((stock) => (
            <tr key={stock.symbol}>
              <td>
                <Image
                  src={stock.image || "default-image.png"}
                  alt={`${stock.companyName || "N/A"} logo`}
                  width={50}
                />
              </td>
              <td>
                <Anchor
                  href={stock.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.companyLink}
                >
                  {stock.companyName || "N/A"}
                </Anchor>
              </td>
              <td>${stock.price !== undefined ? stock.price : "N/A"}</td>
              <td>{stock.industry || "N/A"}</td>
              <td>
                {stock.buyInfo.map((info, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <Button onClick={() => openModal(stock.symbol, index)}>Edit Shares</Button>
                  </div>
                ))}
              </td>
              <td>
                <Group justify="center">
                  <Button
                    color="red"
                    size="compact-md"
                    onClick={() => handleRemove(stock)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="gradient"
                    gradient={{ from: "violet", to: "blue", deg: 153 }}
                    size="compact-md"
                    onClick={() => handleViewStats(stock)}
                  >
                    View Stats
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
