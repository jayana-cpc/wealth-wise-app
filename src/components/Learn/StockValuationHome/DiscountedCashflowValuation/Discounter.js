import React, { useEffect, useState } from "react";
import { linearRegression } from "simple-statistics";
import { HistoricalCashflowChart } from "./HistoricalCashflowChart";
import { DCFValueChart } from "./FutureCashflowChart";
import { Card, Container, Title, Text, Center, Loader } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import styles from "./Discounter.module.css";

const Discounter = () => {
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState(null);

  // Key Financial Metric States
  const [beta, setBeta] = useState("");
  const [price, setPrice] = useState("");
  const [mktCap, setMktCap] = useState("");
  const [weightedAverageShsOut, setWeightedAverageShsOut] = useState("");
  const [interestExpense, setInterestExpense] = useState("");
  const [totalDebt, setTotalDebt] = useState("");
  const [incomeExpense, setIncomeExpense] = useState("");
  const [incomeBeforeTax, setIncomeBeforeTax] = useState("");
  const [cashAndShortTermInvestments, setCashAndShortTermInvestments] =
    useState("");

  // Historical Revenue Data States
  const [revenue2022, setRevenue2022] = useState("");
  const [revenue2021, setRevenue2021] = useState("");
  const [revenue2020, setRevenue2020] = useState("");
  const [revenue2019, setRevenue2019] = useState("");
  const [revenue2018, setRevenue2018] = useState("");

  // Historical Operating Cashflow Data States
  const [operatingCashFlow2022, setOperatingCashFlow2022] = useState("");
  const [operatingCashFlow2021, setOperatingCashFlow2021] = useState("");
  const [operatingCashFlow2020, setOperatingCashFlow2020] = useState("");
  const [operatingCashFlow2019, setOperatingCashFlow2019] = useState("");
  const [operatingCashFlow2018, setOperatingCashFlow2018] = useState("");

  // Historical Capital Expenditure Data States
  const [capEx2022, setCapEx2022] = useState("");
  const [capEx2021, setCapEx2021] = useState("");
  const [capEx2020, setCapEx2020] = useState("");
  const [capEx2019, setCapEx2019] = useState("");
  const [capEx2018, setCapEx2018] = useState("");

  // Historical Free Cashflow Data States
  const [currentFreeCashFlow, setCurrentFreeCashFlow] = useState("");
  const [freeCashFlow2018, setFreeCashFlow2018] = useState("");
  const [freeCashFlow2019, setFreeCashFlow2019] = useState("");
  const [freeCashFlow2020, setFreeCashFlow2020] = useState("");
  const [freeCashFlow2021, setFreeCashFlow2021] = useState("");

  // Derived Financial Calculations
  const costDebt = interestExpense / totalDebt;
  const costEquity = (0.0429 + beta) * 0.057;
  const taxRate = incomeExpense / incomeBeforeTax;
  const weightOfDebt = totalDebt / (totalDebt + mktCap);
  const weightOfEquity = mktCap / (totalDebt + mktCap);
  const discountRate =
    (weightOfDebt * costDebt + weightOfEquity * costEquity) * (1 - taxRate);

  // Historical Data for Linear Regression
  const revenueDF = [
    [2018, revenue2018],
    [2019, revenue2019],
    [2020, revenue2020],
    [2021, revenue2021],
    [2022, revenue2022],
  ];

  const operatingCashFlowDF = [
    [2018, operatingCashFlow2018],
    [2019, operatingCashFlow2019],
    [2020, operatingCashFlow2020],
    [2021, operatingCashFlow2021],
    [2022, operatingCashFlow2022],
  ];

  const capExDF = [
    [2018, capEx2018],
    [2019, capEx2019],
    [2020, capEx2020],
    [2021, capEx2021],
    [2022, capEx2022],
  ];

  // Future Projection Years
  const futureYears = [2023, 2024, 2025, 2026, 2027];

  // Effect to Load Stock Symbol from Local Storage
  useEffect(() => {
    const storedSymbol = localStorage.getItem("userStock");
    if (storedSymbol) {
      setStockSymbol(storedSymbol);
    } else {
      setLoading(false);
    }
  }, []);

  // API Calls to Fetch Financial Data
  useEffect(() => {
    async function fetchData() {
      try {
        const profileResponse = await fetch(
          `https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
        );
        const profileData = await profileResponse.json();
        setMktCap(profileData[0].mktCap);
        setBeta(profileData[0].beta);
        setPrice(profileData[0].price);

        const financialsResponse = await fetch(
          `https://api.polygon.io/vX/reference/financials?ticker=${stockSymbol}&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`,
        );
        const financialsData = await financialsResponse.json();
        setIncomeExpense(
          financialsData.results[1].financials.income_statement
            .income_tax_expense_benefit.value,
        );
        setIncomeBeforeTax(
          financialsData.results[1].financials.income_statement
            .income_loss_from_continuing_operations_before_tax.value,
        );

        const incomeResponse = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/${stockSymbol}?limit=120&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`,
        );
        const incomeData = await incomeResponse.json();
        setInterestExpense(incomeData[0].interestExpense);
        setWeightedAverageShsOut(incomeData[0].weightedAverageShsOut);
        setRevenue2022(incomeData[0].revenue);
        setRevenue2021(incomeData[1].revenue);
        setRevenue2020(incomeData[2].revenue);
        setRevenue2019(incomeData[3].revenue);
        setRevenue2018(incomeData[4].revenue);

        const balanceResponse = await fetch(
          `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}&limit=120`,
        );
        const balanceData = await balanceResponse.json();
        setTotalDebt(balanceData[0].totalDebt);
        setCashAndShortTermInvestments(
          balanceData[0].cashAndShortTermInvestments,
        );

        const cashFlowResponse = await fetch(
          `https://financialmodelingprep.com/api/v3/cash-flow-statement/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}&limit=120`,
        );
        const cashFlowData = await cashFlowResponse.json();
        setCurrentFreeCashFlow(cashFlowData[0].freeCashFlow);
        setFreeCashFlow2019(cashFlowData[3].freeCashFlow);
        setFreeCashFlow2020(cashFlowData[2].freeCashFlow);
        setFreeCashFlow2018(cashFlowData[4].freeCashFlow);
        setFreeCashFlow2021(cashFlowData[1].freeCashFlow);
        setOperatingCashFlow2022(cashFlowData[0].operatingCashFlow);
        setOperatingCashFlow2021(cashFlowData[1].operatingCashFlow);
        setOperatingCashFlow2020(cashFlowData[2].operatingCashFlow);
        setOperatingCashFlow2019(cashFlowData[3].operatingCashFlow);
        setOperatingCashFlow2018(cashFlowData[4].operatingCashFlow);
        setCapEx2022(cashFlowData[0].capitalExpenditure);
        setCapEx2021(cashFlowData[1].capitalExpenditure);
        setCapEx2020(cashFlowData[2].capitalExpenditure);
        setCapEx2019(cashFlowData[3].capitalExpenditure);
        setCapEx2018(cashFlowData[4].capitalExpenditure);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    if (stockSymbol) fetchData();
  }, [stockSymbol]);

  // Projection Using Linear Regression
  const RevenueLinReg = linearRegression(revenueDF);
  const slope = RevenueLinReg.m;
  const intercept = RevenueLinReg.b;
  const forecastedRevenue = (year) => slope * year + intercept;

  const forecastRevenue = futureYears.map((year) => ({
    x: year.toString(),
    y: forecastedRevenue(year),
  }));

  const OperatingCashFlowLinReg = linearRegression(operatingCashFlowDF);
  const slopeOperatingCashFlow = OperatingCashFlowLinReg.m;
  const interceptOperatingCashFlow = OperatingCashFlowLinReg.b;
  const forecastedOperatingCashFlow = (year) =>
    slopeOperatingCashFlow * year + interceptOperatingCashFlow;

  const forecastOperatingCashFlow = futureYears.map((year) => ({
    x: year.toString(),
    y: forecastedOperatingCashFlow(year),
  }));

  const CapExLinReg = linearRegression(capExDF);
  const slopeCapEx = CapExLinReg.m;
  const interceptCapEx = CapExLinReg.b;
  const forecastedCapEx = (year) => slopeCapEx * year + interceptCapEx;

  const forecastCapEx = futureYears.map((year) => ({
    x: year.toString(),
    y: forecastedCapEx(year),
  }));

  // Cashflow Projections
  const averageCapExMargin =
    (capEx2018 / revenue2018 +
      capEx2019 / revenue2019 +
      capEx2020 / revenue2020 +
      capEx2021 / revenue2021 +
      capEx2022 / revenue2022) /
    5;
  const projectedCashFlow2023 =
    (forecastRevenue[0].y - forecastOperatingCashFlow[0].y) *
    averageCapExMargin;
  const projectedCashFlow2024 =
    (forecastRevenue[1].y - forecastOperatingCashFlow[1].y) *
    averageCapExMargin;
  const projectedCashFlow2025 =
    (forecastRevenue[2].y - forecastOperatingCashFlow[2].y) *
    averageCapExMargin;
  const projectedCashFlow2026 =
    (forecastRevenue[3].y - forecastOperatingCashFlow[3].y) *
    averageCapExMargin;
  const projectedCashFlow2027 =
    (forecastRevenue[4].y - forecastOperatingCashFlow[4].y) *
    averageCapExMargin;

  // Freecashflow Projections Discounted Down to Present Value
  const projectedDiscountedCashFlow2023 =
    projectedCashFlow2023 / Math.pow(1 + discountRate, 1);
  const projectedDiscountedCashFlow2024 =
    projectedCashFlow2024 / Math.pow(1 + discountRate, 2);
  const projectedDiscountedCashFlow2025 =
    projectedCashFlow2025 / Math.pow(1 + discountRate, 3);
  const projectedDiscountedCashFlow2026 =
    projectedCashFlow2026 / Math.pow(1 + discountRate, 4);
  const projectedDiscountedCashFlow2027 =
    projectedCashFlow2027 / Math.pow(1 + discountRate, 5);

  const year5Cash = projectedDiscountedCashFlow2027;

  // Final DCF Calculations
  const totalDiscountedCashFlow =
    projectedDiscountedCashFlow2023 +
    projectedDiscountedCashFlow2024 +
    projectedDiscountedCashFlow2025 +
    projectedDiscountedCashFlow2026 +
    projectedDiscountedCashFlow2027;
  const perpetualGrowthRate = 0.0449;
  const terminalValue =
    (year5Cash * (1 + perpetualGrowthRate)) /
    (discountRate - perpetualGrowthRate);
  const discountedTerminalValue = terminalValue / Math.pow(1 + discountRate, 5);
  const projectedEnterpriseValue =
    discountedTerminalValue + totalDiscountedCashFlow;
  const equityValue =
    projectedEnterpriseValue + cashAndShortTermInvestments - totalDebt;

  const dcfValue = equityValue / weightedAverageShsOut;
  const valuation = ((price - dcfValue) / price) * 100;
  const valuationFormatted = `${Math.abs(valuation).toFixed(2)}%`;

  // Functions Related to Graphing Historical Data and Projections
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const OperatingCashFlowChart = {
      label: "Operating CashFlow",
      data: [
        operatingCashFlow2018,
        operatingCashFlow2019,
        operatingCashFlow2020,
        operatingCashFlow2021,
        operatingCashFlow2022,
        forecastOperatingCashFlow[0].y,
        forecastOperatingCashFlow[1].y,
        forecastOperatingCashFlow[2].y,
        forecastOperatingCashFlow[3].y,
        forecastOperatingCashFlow[4].y,
      ],
      borderColor: "rgba(255, 99, 132, 1)",
    };

    const FreeCashFlowChart = {
      label: "Discounted Free CashFlow",
      data: [
        freeCashFlow2018,
        freeCashFlow2019,
        freeCashFlow2020,
        freeCashFlow2021,
        currentFreeCashFlow,
        projectedCashFlow2023,
        projectedCashFlow2024,
        projectedCashFlow2025,
        projectedCashFlow2026,
        projectedCashFlow2027,
      ],
      borderColor: "rgba(0, 99, 132, 255)",
    };

    const CapExChart = {
      label: "CapEx",
      data: [
        capEx2018,
        capEx2019,
        capEx2020,
        capEx2021,
        capEx2022,
        forecastCapEx[0].y,
        forecastRevenue[1].y,
        forecastCapEx[2].y,
        forecastCapEx[3].y,
        forecastCapEx[4].y,
      ],
      borderColor: "rgba(54, 162, 235, 1)",
    };

    const RevenueChart = {
      label: "Revenue",
      data: [
        revenue2018,
        revenue2019,
        revenue2020,
        revenue2021,
        revenue2022,
        forecastRevenue[0].y,
        forecastRevenue[1].y,
        forecastRevenue[2].y,
        forecastRevenue[3].y,
        forecastRevenue[4].y,
      ],
      borderColor: "rgba(255, 206, 86, 1)",
    };

    // Update historicalData with the new datasets
    setHistoricalData({
      labels: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
      datasets: [
        OperatingCashFlowChart,
        FreeCashFlowChart,
        CapExChart,
        RevenueChart,
      ],
    });
  }, [
    freeCashFlow2018,
    freeCashFlow2019,
    freeCashFlow2020,
    freeCashFlow2021,
    currentFreeCashFlow,
    operatingCashFlow2018,
    operatingCashFlow2019,
    operatingCashFlow2020,
    operatingCashFlow2021,
    operatingCashFlow2022,
    forecastOperatingCashFlow,
    capEx2018,
    capEx2019,
    capEx2020,
    capEx2021,
    capEx2022,
    forecastCapEx,
    revenue2018,
    revenue2019,
    revenue2020,
    revenue2021,
    revenue2022,
    forecastRevenue,
    projectedCashFlow2023,
    projectedCashFlow2024,
    projectedCashFlow2025,
    projectedCashFlow2026,
    projectedCashFlow2027,
  ]);

  const [barChartData, setBarChartData] = useState({
    labels: ["Price", "DCF Value"],
    datasets: [
      {
        label: "Value Comparison",
        data: [price, dcfValue],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  });

  useEffect(() => {
    setBarChartData({
      labels: ["Price", "DCF Value"],
      datasets: [
        {
          label: "Value Comparison",
          data: [price, dcfValue],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
        },
      ],
    });
  }, [price, dcfValue]);

  return (
    <Container className={styles.container}>
      <Center>
        <Title>Discounted Cashflow Valuation</Title>
      </Center>

      {loading ? (
        <Center>
          <Loader color="violet" size="xl" />
        </Center>
      ) : (
        <div className={styles.content}>
          <Title order={3} className={styles.stepTitle}>
            Part 1: Calculate Cost of Capital
          </Title>
          {/* Step 1: Get the Cost of Equity */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 1: Find Cost of Equity
            </Title>
            <Text>
              <strong>Explanation:</strong> Cost of equity represents the return
              expected by equity investors.
            </Text>
            <Text>
              <strong>Formula:</strong> Cost of Equity = (Risk-Free Rate + Beta)
              * Market Premium
            </Text>
            <Text>
              <strong>Risk Free Rate:</strong> {(0.429).toFixed(2)}
            </Text>
            <Text>
              <strong>Beta:</strong> {beta}
            </Text>
            <Text>
              <strong>Market Premium:</strong> {(0.057).toFixed(2)}
            </Text>
            <Text>
              <strong>Cost of Equity:</strong> ${costEquity.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 2: Get the Cost of Debt */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 2: Get the Cost of Debt
            </Title>
            <Text>
              <strong>Explanation:</strong> Cost of debt represents the cost of
              borrowing for the company.
            </Text>
            <Text>
              <strong>Formula:</strong> Cost of Debt = Interest Expense / Total
              Debt
            </Text>
            <Text>
              <strong>Interest Expense:</strong> ${interestExpense}
            </Text>
            <Text>
              <strong>Total Debt:</strong> ${totalDebt}
            </Text>
            <Text>
              <strong>Cost of Debt:</strong> ${costDebt.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 3: Get Tax Rate */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 3: Get Tax Rate
            </Title>
            <Text>
              <strong>Explanation:</strong> Tax rate adjusts cash flows for
              taxes.
            </Text>
            <Text>
              <strong>Formula:</strong> Tax Rate = Income Tax Expense / Income
              Before Tax
            </Text>
            <Text>
              <strong>Income Tax Expense:</strong> ${incomeExpense}
            </Text>
            <Text>
              <strong>Income Before Tax:</strong> ${incomeBeforeTax}
            </Text>
            <Text>
              <strong>Tax Rate:</strong> {taxRate.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 4: Calculate Weight of Debt */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 4: Calculate Weight of Debt
            </Title>
            <Text>
              <strong>Explanation:</strong> Weight of debt shows the proportion
              of debt in the capital structure.
            </Text>
            <Text>
              <strong>Formula:</strong> Weight of Debt = Total Debt / (Total
              Debt + Market Capitalization)
            </Text>
            <Text>
              <strong>Total Debt:</strong> ${totalDebt}
            </Text>
            <Text>
              <strong>Market Capitalization:</strong> ${mktCap}
            </Text>
            <Text>
              <strong>Weight of Debt:</strong> ${weightOfDebt.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 5: Calculate Weight of Equity */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 5: Calculate Weight of Equity
            </Title>
            <Text>
              <strong>Explanation:</strong> Weight of equity shows the
              proportion of equity in the capital structure.
            </Text>
            <Text>
              <strong>Formula:</strong> Weight of Equity = Market Capitalization
              / (Total Debt + Market Capitalization)
            </Text>
            <Text>
              <strong>Market Capitalization:</strong> ${mktCap}
            </Text>
            <Text>
              <strong>Total Debt:</strong> ${totalDebt}
            </Text>
            <Text>
              <strong>Weight of Equity:</strong> ${weightOfEquity.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 6: Calculate Discount Rate */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 6: Calculate Discount Rate
            </Title>
            <Text>
              <strong>Explanation:</strong> The discount rate is the weighted
              average of cost of debt and cost of equity, adjusted for the tax
              rate.
            </Text>
            <Text>
              <strong>Formula:</strong> Discount Rate = ((Weight of Debt * Cost
              of Debt) + (Weight of Equity * Cost of Equity)) * (1 - Tax Rate)
            </Text>
            <Text>
              <strong>Weight of Debt:</strong> ${weightOfDebt.toFixed(2)}
            </Text>
            <Text>
              <strong>Cost of Debt:</strong> ${costDebt.toFixed(2)}
            </Text>
            <Text>
              <strong>Weight of Equity:</strong> ${weightOfEquity.toFixed(2)}
            </Text>
            <Text>
              <strong>Cost of Equity:</strong> ${costEquity.toFixed(2)}
            </Text>
            <Text>
              <strong>Discount Rate:</strong> {discountRate.toFixed(2)}
            </Text>
          </Card>

          <Title order={3} className={styles.stepTitle}>
            Part 2: Project and Discount Cash Flows
          </Title>

          {/* Step 1: Use Linear Regression to Project Next 5 Years of Cash Flows */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 1: Use Linear Regression to Project Next 5 Years of Cash
              Flows
            </Title>
            <div className={styles.chartContainer}>
              <HistoricalCashflowChart chartData={historicalData} />
            </div>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 2: Discount Each Future Year with the Discount Rate */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 2: Discount Each Future Year with the Discount Rate
            </Title>
            <Text>
              <strong>Explanation:</strong> Discounting future cash flows
              adjusts them to their present value.
            </Text>
            <Text>
              <strong>Year 5 Cash Flow:</strong> ${year5Cash}
            </Text>
            <Text>
              <strong>Perpetual Growth Rate:</strong> {perpetualGrowthRate}
            </Text>
            <Text>
              <strong>Discount Rate:</strong> {discountRate}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 3: Calculate Terminal Value */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 3: Calculate Terminal Value
            </Title>
            <Text>
              <strong>Explanation:</strong> Terminal value represents the value
              beyond the projection period.
            </Text>
            <Text>
              <strong>Formula:</strong> Terminal Value = (Year 5 Cash Flow * (1
              + Perpetual Growth Rate)) / (Discount Rate - Perpetual Growth
              Rate)
            </Text>
            <Text>
              <strong>Terminal Value:</strong> ${terminalValue.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 4: Discount Terminal Value */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 4: Discount Terminal Value
            </Title>
            <Text>
              <strong>Explanation:</strong> Discount terminal value back to its
              present value.
            </Text>
            <Text>
              <strong>Formula:</strong> Discounted Terminal Value = Terminal
              Value / (1 + Discount Rate)^5
            </Text>
            <Text>
              <strong>Terminal Value:</strong> ${terminalValue.toFixed(2)}
            </Text>
            <Text>
              <strong>Discount Rate:</strong> {discountRate.toFixed(2)}
            </Text>
            <Text>
              <strong>Discounted Terminal Value:</strong> $
              {discountedTerminalValue.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 5: Calculate Projected Enterprise Value */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 5: Calculate Projected Enterprise Value
            </Title>
            <Text>
              <strong>Explanation:</strong> Projected enterprise value is the
              sum of discounted terminal value and total discounted cash flows.
            </Text>
            <Text>
              <strong>Formula:</strong> Projected Enterprise Value = Discounted
              Terminal Value + Total Discounted Cash Flow
            </Text>
            <Text>
              <strong>Discounted Terminal Value:</strong> $
              {discountedTerminalValue.toFixed(2)}
            </Text>
            <Text>
              <strong>Total Discounted Cash Flow:</strong> $
              {totalDiscountedCashFlow.toFixed(2)}
            </Text>
            <Text>
              <strong>Projected Enterprise Value:</strong> $
              {projectedEnterpriseValue.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 6: Calculate Equity Value */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 6: Calculate Equity Value
            </Title>
            <Text>
              <strong>Explanation:</strong> Equity value is projected enterprise
              value adjusted for cash and short-term investments minus total
              debt.
            </Text>
            <Text>
              <strong>Formula:</strong> Equity Value = Projected Enterprise
              Value + Cash and Short-Term Investments - Total Debt
            </Text>
            <Text>
              <strong>Projected Enterprise Value:</strong> $
              {projectedEnterpriseValue.toFixed(2)}
            </Text>
            <Text>
              <strong>Cash and Short Investments:</strong> $
              {cashAndShortTermInvestments}
            </Text>
            <Text>
              <strong>Total Debt:</strong> ${totalDebt}
            </Text>
            <Text>
              <strong>Equity Value:</strong> ${equityValue.toFixed(2)}
            </Text>
          </Card>

          <div className={styles.gap}></div>

          {/* Step 7: Calculate Estimated DCF Value */}
          <Card className={styles.card}>
            <Title order={4} className={styles.cardTitle}>
              Step 7: Calculate Estimated DCF Value
            </Title>
            <Text>
              <strong>Explanation:</strong> DCF value is the equity value
              divided by weighted average shares outstanding, providing an
              intrinsic value per share.
            </Text>
            <Text>
              <strong>Formula:</strong> DCF Value = Equity Value / Weighted
              Average Shares Outstanding
            </Text>
            <Text>
              <strong>Equity Value:</strong> ${equityValue.toFixed(2)}
            </Text>
            <Text>
              <strong>Weighted Average Shares Outstanding:</strong>{" "}
              {weightedAverageShsOut}
            </Text>
            <Text>
              <strong>DCF Value:</strong> ${dcfValue.toFixed(2)}
            </Text>

            <div className={styles.valueComparison}>
              {price < dcfValue ? (
                <div
                  className={`${styles.valueComparisonValue} ${styles.positive}`}
                >
                  <IconArrowUp /> {valuationFormatted}
                </div>
              ) : (
                <div
                  className={`${styles.valueComparisonValue} ${styles.negative}`}
                >
                  <IconArrowDown /> {valuationFormatted}
                </div>
              )}
            </div>

            <div className={styles.chartContainer}>
              <DCFValueChart chartData={barChartData} />
            </div>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default Discounter;
