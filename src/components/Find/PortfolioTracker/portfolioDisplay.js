import React, {
  useState,
  useEffect,
  createContext,
  useRef,
  useCallback,
} from "react";
import classNames from "classnames";
import { Chart as ChartJS, CategoryScale } from "chart.js/auto";
import "./portfolioDisplay.module.scss";
import Image from "next/image";

const AppContext = createContext();

const RequestStatus = {
  Error: "Error",
  Idle: "Idle",
  Loading: "Loading",
  Success: "Success",
};

// Helper functions
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

const StockListItem = ({ symbol }) => {
  const { state, selectStock } = React.useContext(AppContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [percentChange, setPercentChange] = useState("");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
        );
        const data = await response.json();
        const nameWords = data.results.name.split(" ");
        const truncatedName = nameWords.slice(0, 2).join(" ");
        setName(truncatedName);
        const logoUrl = data.results.branding?.icon_url
          ? `${data.results.branding.icon_url}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
          : "https://t3.ftcdn.net/jpg/02/81/14/10/360_F_281141027_p3QurYdJnzbnf3Aola5uu0X6ElC5zVpf.jpg";
        setImage(logoUrl);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const fetchStockSnapshot = async () => {
      try {
        const response = await fetch(
          `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
        );
        const data = await response.json();
        const formattedPercentChange =
          data.ticker.todaysChangePerc.toFixed(2) + "%";
        setPercentChange(formattedPercentChange);
        setPrice(data.ticker.day.o);
      } catch (error) {
        console.error("Error fetching stock snapshot:", error);
      }
    };

    fetchStockData();
    fetchStockSnapshot();
  }, [symbol]);

  const getClasses = () => {
    const selected =
      state.selectedStock && state.selectedStock.symbol === symbol;
    return classNames("stock-list-item", { selected });
  };

  return (
    <button
      type="button"
      className={getClasses()}
      onClick={() => selectStock(symbol)}
    >
      <div className="stock-list-item-background">
        <h1 className="stock-list-item-symbol">{symbol}</h1>
        <Image
          className="stock-list-item-background-image"
          src={image}
          alt={`${symbol} Logo`}
          width={50}
          height={50}
        />
      </div>
      <div className="stock-list-item-content">
        <Image
          className="stock-list-item-image"
          src={image}
          alt={`${symbol} Logo`}
          width={50}
          height={50}
        />
        <div className="stock-list-item-details">
          <h1 className="stock-list-item-name">{name}</h1>
          <h1 className="stock-list-item-price">
            <strong>Current Price: $</strong>
            {price}
          </h1>
          <h1 className="stock-list-item-price">
            <strong>Percent Change: </strong>
            {percentChange}
          </h1>
        </div>
      </div>
    </button>
  );
};

const StockList = () => {
  const { state } = React.useContext(AppContext);
  const [specificStocks, setSpecificStocks] = useState([]);

  useEffect(() => {
    const fetchPortfolioAndSetStocks = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User data is missing from localStorage.");
        return;
      }

      try {
        const portfolioData = await fetchPortfolioInfo(user);
        const stockSymbols = Object.keys(portfolioData);
        setSpecificStocks(stockSymbols.map((symbol) => ({ symbol })));
      } catch (error) {
        console.error("Error fetching portfolio info:", error);
        const guestPortfolio = JSON.parse(
          localStorage.getItem("guestPortfolio"),
        );
        if (guestPortfolio) {
          const stockSymbols = Object.keys(guestPortfolio);
          setSpecificStocks(stockSymbols.map((symbol) => ({ symbol })));
        }
      }
    };

    fetchPortfolioAndSetStocks();
  }, []);

  if (state.status === RequestStatus.Success && specificStocks.length > 0) {
    return (
      <div id="stock-list">
        {specificStocks.map((item) => (
          <StockListItem key={item.symbol} symbol={item.symbol} />
        ))}
      </div>
    );
  }

  return null;
};

const CryptoUtility = {
  formatPercent(value) {
    return (value / 100).toLocaleString("en-US", {
      style: "percent",
      minimumFractionDigits: 2,
    });
  },
  formatUSD(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  },
  getByID(id, cryptos) {
    return cryptos.find((crypto) => crypto.id === id) || null;
  },
  map(data) {
    return {
      change: data.price_change_percentage_24h,
      id: data.id,
      image: data.image,
      marketCap: this.formatUSD(data.market_cap),
      name: data.name,
      price: this.formatUSD(data.current_price),
      rank: data.market_cap_rank,
      supply: data.circulating_supply.toLocaleString(),
      symbol: data.symbol,
      volume: this.formatUSD(data.total_volume),
    };
  },
  mapAll(data) {
    return data.map((item) => this.map(item));
  },
};

const CryptoDetails = ({ selectedStockSymbol }) => {
  const [percentChange, setPercentChange] = useState("");
  const [priceData, setPriceData] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceResponse, snapshotResponse] = await Promise.all([
          fetch(
            `https://api.polygon.io/v2/aggs/ticker/${selectedStockSymbol}/range/1/minute/2023-10-24/2023-10-24?adjusted=true&sort=asc&limit=120&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
          ),
          fetch(
            `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${selectedStockSymbol}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
          ),
        ]);

        const priceData = await priceResponse.json();
        setPriceData(priceData);

        const snapshotData = await snapshotResponse.json();
        const formattedPercentChange =
          snapshotData.ticker.todaysChangePerc.toFixed(2);
        setPercentChange(formattedPercentChange);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedStockSymbol]);

  return (
    <div id="crypto-details">
      <div id="crypto-details-content">
        <div id="crypto-fields">{/* ... */}</div>
        <h1 id="crypto-details-symbol">{selectedStockSymbol}</h1>
        <div>
          <StockPriceGraph
            priceData={priceData}
            percentChange={percentChange}
          />
        </div>
      </div>
    </div>
  );
};

const StockPriceGraph = ({ priceData, percentChange }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const lineColor = percentChange >= 0 ? "green" : "red";
  const fillColor =
    percentChange >= 0 ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationStartTime;
    const animationDuration = 1000; // 1 second animation

    const renderFrame = (timestamp) => {
      if (!animationStartTime) {
        animationStartTime = timestamp;
      }
      const progress = (timestamp - animationStartTime) / animationDuration;

      if (progress < 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const openingPrices = priceData.results.map((item) => item.o);
        const labels = openingPrices.map((_, index) => (index + 1).toString());

        const minY = Math.min(...openingPrices);
        const maxY = Math.max(...openingPrices);

        const suggestedMin = minY - 1;
        const suggestedMax = maxY + 1;

        const width = canvas.width;
        const height = canvas.height;
        const stepX = width / (labels.length - 1);
        const stepY = (height - 40) / (suggestedMax - suggestedMin);

        ctx.beginPath();
        ctx.moveTo(
          0,
          height - (openingPrices[0] - suggestedMin) * stepY * progress,
        );

        for (let i = 1; i < openingPrices.length; i++) {
          const yPos =
            height - (openingPrices[i] - suggestedMin) * stepY * progress;
          ctx.lineTo(i * stepX, yPos);
        }

        ctx.lineTo((openingPrices.length - 1) * stepX, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = fillColor;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(
          0,
          height - (openingPrices[0] - suggestedMin) * stepY * progress,
        );

        for (let i = 1; i < openingPrices.length; i++) {
          const yPos =
            height - (openingPrices[i] - suggestedMin) * stepY * progress;
          ctx.lineTo(i * stepX, yPos);
        }

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        animationFrameRef.current = requestAnimationFrame(renderFrame);
      }
    };

    if (priceData.results && priceData.results.length > 0) {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [priceData, lineColor, fillColor]);

  return (
    <div id="crypto-price-chart-wrapper">
      <canvas
        id="crypto-price-chart"
        ref={canvasRef}
        width={1000}
        height={1000}
        style={{ marginBottom: "500px" }}
      ></canvas>
    </div>
  );
};

const PortfolioDisplay = () => {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("");

  const [state, setState] = useState({
    cryptos: [],
    listToggled: true,
    selectedCrypto: null,
    status: RequestStatus.Loading,
  });

  const setStatus = useCallback((status) => {
    setState((prevState) => ({ ...prevState, status }));
  }, []);

  const selectCrypto = useCallback((id) => {
    setState((prevState) => ({
      ...prevState,
      listToggled: window.innerWidth > 800,
      selectedCrypto: CryptoUtility.getByID(id, prevState.cryptos),
    }));
  }, []);

  const selectStock = useCallback((symbol) => {
    setSelectedStockSymbol(symbol);
  }, []);

  const toggleList = (listToggled) => {
    setState((prevState) => ({ ...prevState, listToggled }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus(RequestStatus.Loading);

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          console.error("User data is missing from localStorage.");
          return;
        }

        try {
          const portfolioData = await fetchPortfolioInfo(user);
          const stockSymbols = Object.keys(portfolioData);
          const portfolioArray = stockSymbols.map((symbol) => ({ symbol }));

          setState((prevState) => ({
            ...prevState,
            status: RequestStatus.Success,
          }));

          if (portfolioArray.length > 0) {
            setSelectedStockSymbol(portfolioArray[0].symbol);
          }
        } catch (err) {
          console.error(err);
          const guestPortfolio = JSON.parse(
            localStorage.getItem("guestPortfolio"),
          );
          if (guestPortfolio) {
            const stockSymbols = Object.keys(guestPortfolio);
            const portfolioArray = stockSymbols.map((symbol) => ({ symbol }));

            setState((prevState) => ({
              ...prevState,
              status: RequestStatus.Success,
            }));

            if (portfolioArray.length > 0) {
              setSelectedStockSymbol(portfolioArray[0].symbol);
            }
          } else {
            setStatus(RequestStatus.Error);
          }
        }
      } catch (err) {
        console.error(err);
        setStatus(RequestStatus.Error);
      }
    };

    fetchData();
  }, [setStatus]);

  useEffect(() => {
    if (state.status === RequestStatus.Success) {
      selectStock(selectedStockSymbol);
    }
  }, [state.status, selectedStockSymbol, selectStock]);

  useEffect(() => {
    if (state.status === RequestStatus.Success && state.cryptos.length > 0) {
      selectCrypto(state.cryptos[0].id);
    }
  }, [state.status, state.cryptos, selectCrypto]);

  ChartJS.register(CategoryScale);

  return (
    <AppContext.Provider
      value={{ state, selectCrypto, setState, toggleList, selectStock }}
    >
      <div
        id="app"
        className={classNames({ "list-toggled": state.listToggled })}
      >
        <StockList />
        <CryptoDetails selectedStockSymbol={selectedStockSymbol} />
      </div>
    </AppContext.Provider>
  );
};

export default PortfolioDisplay;
