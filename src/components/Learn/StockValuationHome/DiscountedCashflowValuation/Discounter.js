import React, { useEffect, useState } from 'react';
import { linearRegression } from 'simple-statistics';
import { HistoricalCashflowChart } from './HistoricalCashflowChart';
import { DCFValueChart } from './FutureCashflowChart';
import { Card } from '@mantine/core';
import { IconArrowDown } from '@tabler/icons-react';

const Discounter = () => {
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState(null);

  useEffect(() => {
    const storedSymbol = localStorage.getItem('userStock');
    if (storedSymbol) {
      setStockSymbol(storedSymbol);
    } else {
      setLoading(false);
    }
  }, []);

  //Key Financial Metric
  const [beta, setBeta] = useState("");
  const [price, setPrice] = useState("");
  const [mktCap, setMktCap] = useState("");
  const [weightedAverageShsOut, setWeightedAverageShsOut] = useState("");
  const [interestExpense, setInterestExpense] = useState("");
  const [totalDebt, setTotalDebt] = useState("");
  const [incomeExpense, setIncomeExpense] = useState("");
  const [incomeBeforeTax, setIncomeBeforeTax] = useState("");
  const [cashAndShortTermInvestments, setCashAndShortTermInvestments] = useState("");
  const costDebt = interestExpense / totalDebt;
  const costEquity = (0.0429 + beta) * 0.057;
  const taxRate = incomeExpense / incomeBeforeTax;
  const weightOfDebt = totalDebt / (totalDebt + mktCap);
  const weightOfEquity = mktCap / (totalDebt + mktCap);
  const discountRate = ((weightOfDebt * costDebt) + (weightOfEquity * costEquity)) * (1 - taxRate);

  //Historical Revenues Data for Linear Regression
  const [revenue2022, setRevenue2022] = useState("");
  const [revenue2021, setRevenue2021] = useState("");
  const [revenue2020, setRevenue2020] = useState("");
  const [revenue2019, setRevenue2019] = useState("");
  const [revenue2018, setRevenue2018] = useState("");
  const revenueDF = [
    [2018, revenue2018],
    [2019, revenue2019],
    [2020, revenue2020],
    [2021, revenue2021],
    [2022, revenue2022]
  ];

  //Historical Operating Cashflow Data for Linear Regression
  const [operatingCashFlow2022, setOperatingCashFlow2022] = useState("");
  const [operatingCashFlow2021, setOperatingCashFlow2021] = useState("");
  const [operatingCashFlow2020, setOperatingCashFlow2020] = useState("");
  const [operatingCashFlow2019, setOperatingCashFlow2019] = useState("");
  const [operatingCashFlow2018, setOperatingCashFlow2018] = useState("");
  const operatingCashFlowDF = [
    [2018, operatingCashFlow2018],
    [2019, operatingCashFlow2019],
    [2020, operatingCashFlow2020],
    [2021, operatingCashFlow2021],
    [2022, operatingCashFlow2022]
  ];

  //Historical Capital Expenditure Data for Linear Regression
  const [capEx2022, setCapEx2022] = useState("");
  const [capEx2021, setCapEx2021] = useState("");
  const [capEx2020, setCapEx2020] = useState("");
  const [capEx2019, setCapEx2019] = useState("");
  const [capEx2018, setCapEx2018] = useState("");
  const capExDF = [
    [2018, capEx2018],
    [2019, capEx2019],
    [2020, capEx2020],
    [2021, capEx2021],
    [2022, capEx2022]
  ];

  //Historical Freecashflow Data for Linear Regression
  const [currentFreeCashFlow, setCurrentFreeCashFlow] = useState("");
  const [freeCashFlow2018, setFreeCashFlow2018] = useState("");
  const [freeCashFlow2019, setFreeCashFlow2019] = useState("");
  const [freeCashFlow2020, setFreeCashFlow2020] = useState("");
  const [freeCashFlow2021, setFreeCashFlow2021] = useState("");

  // Future Projection Years
  const futureYears = [2023, 2024, 2025, 2026, 2027];

  // API CALLS FROM POLYGON AND FMP

  // Key Financial Metrics
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
        const data = await response.json();
        setMktCap(data[0].mktCap);
        setBeta(data[0].beta);
        setPrice(data[0].price);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [stockSymbol]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.polygon.io/vX/reference/financials?ticker=${stockSymbol}&apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`);
        const data = await response.json();

        setIncomeExpense(data.results[1].financials.income_statement.income_tax_expense_benefit.value);
        setIncomeBeforeTax(data.results[1].financials.income_statement.income_loss_from_continuing_operations_before_tax.value);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [stockSymbol]);

  // Income Statement Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${stockSymbol}?limit=120&apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}`);
        const data = await response.json();
        setInterestExpense(data[0].interestExpense);
        setWeightedAverageShsOut(data[0].weightedAverageShsOut);
        setRevenue2022(data[0].revenue);
        setRevenue2021(data[1].revenue);
        setRevenue2020(data[2].revenue);
        setRevenue2019(data[3].revenue);
        setRevenue2018(data[4].revenue);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [stockSymbol]);

  // Balance Sheet Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}&limit=120`);
        const data = await response.json();
        setTotalDebt(data[0].totalDebt);
        setCashAndShortTermInvestments(data[0].cashAndShortTermInvestments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [stockSymbol]);

  //Cashflow Data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/cash-flow-statement/${stockSymbol}?apikey=${process.env.NEXT_PUBLIC_FIN_MOD_API_KEY}&limit=120`);
        const data = await response.json();
        setCurrentFreeCashFlow(data[0].freeCashFlow);
        setFreeCashFlow2019(data[3].freeCashFlow);
        setFreeCashFlow2020(data[2].freeCashFlow);
        setFreeCashFlow2018(data[4].freeCashFlow);
        setFreeCashFlow2021(data[1].freeCashFlow);

        setOperatingCashFlow2022(data[0].operatingCashFlow);
        setOperatingCashFlow2021(data[1].operatingCashFlow);
        setOperatingCashFlow2020(data[2].operatingCashFlow);
        setOperatingCashFlow2019(data[3].operatingCashFlow);
        setOperatingCashFlow2018(data[4].operatingCashFlow);

        setCapEx2022(data[0].capitalExpenditure);
        setCapEx2021(data[1].capitalExpenditure);
        setCapEx2020(data[2].capitalExpenditure);
        setCapEx2019(data[3].capitalExpenditure);
        setCapEx2018(data[4].capitalExpenditure);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [stockSymbol]);

  // Projection Using Linear Regression

  // Revenue Projection Equation
  const RevenueLinReg = linearRegression(revenueDF);
  const slope = RevenueLinReg.m;
  const intercept = RevenueLinReg.b;
  const forecastedRevenue = (year) => {
    const forecastRevenue = slope * year + intercept;
    return forecastRevenue;
  };
  const forecastRevenue = futureYears.map((year) => {
    const forecastRevenue = forecastedRevenue(year);
    return { x: year.toString(), y: forecastRevenue };
  });

  //Operating Cashflow Projection Equation
  const OperatingCashFlowLinReg = linearRegression(operatingCashFlowDF);
  const slopeOperatingCashFlow = OperatingCashFlowLinReg.m;
  const interceptOperatingCashFlow = OperatingCashFlowLinReg.b;
  const forecastedOperatingCashFlow = (year) => {
    const forecastOperatingCashFlow = slopeOperatingCashFlow * year + interceptOperatingCashFlow;
    return forecastOperatingCashFlow;
  };
  const forecastOperatingCashFlow = futureYears.map((year) => {
    const forecastOperatingCashFlow = forecastedOperatingCashFlow(year);
    return { x: year.toString(), y: forecastOperatingCashFlow };
  });

  // Capital Expenditure Projection Equation
  const CapExLinReg = linearRegression(capExDF);
  const slopeCapEx = CapExLinReg.m;
  const interceptCapEx = CapExLinReg.b;
  const forecastedCapEx = (year) => {
    const forecastCapEx = slopeCapEx * year + interceptCapEx;
    return forecastCapEx;
  };
  const forecastCapEx = futureYears.map((year) => {
    const forecastCapEx = forecastedCapEx(year);
    return { x: year.toString(), y: forecastCapEx };
  });

  // Cashflow Projections
  const averageCapExMargin = ((capEx2018 / revenue2018) + (capEx2019 / revenue2019) + (capEx2020 / revenue2020) + (capEx2021 / revenue2021) + (capEx2022 / revenue2022)) / 5;
  const projectedCashFlow2023 = (forecastRevenue[0].y - forecastOperatingCashFlow[0].y) * averageCapExMargin;
  const projectedCashFlow2024 = (forecastRevenue[1].y - forecastOperatingCashFlow[1].y) * averageCapExMargin;
  const projectedCashFlow2025 = (forecastRevenue[2].y - forecastOperatingCashFlow[2].y) * averageCapExMargin;
  const projectedCashFlow2026 = (forecastRevenue[3].y - forecastOperatingCashFlow[3].y) * averageCapExMargin;
  const projectedCashFlow2027 = (forecastRevenue[4].y - forecastOperatingCashFlow[4].y) * averageCapExMargin;

  const [projectedCashFlowData, setProjectedCashFlowData] = useState({
    labels: [],
    datasets: [
      {
        label: "Projected Cashflow",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const projectedCashFlowValues = [
      projectedCashFlow2023,
      projectedCashFlow2024,
      projectedCashFlow2025,
      projectedCashFlow2026,
      projectedCashFlow2027,
    ];

    setProjectedCashFlowData({
      labels: [2023, 2024, 2025, 2026, 2027].map((year) => year.toString()),
      datasets: [
        {
          label: "Projected Cashflow",
          data: projectedCashFlowValues,
        },
      ],
    });
  }, [
    projectedCashFlow2023,
    projectedCashFlow2024,
    projectedCashFlow2025,
    projectedCashFlow2026,
    projectedCashFlow2027,
  ]);

  // Freecashflow Projections Discounted Down to Present Value
  const projectedDiscountedCashFlow2023 = projectedCashFlow2023 / Math.pow(1 + discountRate, 1);
  const projectedDiscountedCashFlow2024 = projectedCashFlow2024 / Math.pow(1 + discountRate, 2);
  const projectedDiscountedCashFlow2025 = projectedCashFlow2025 / Math.pow(1 + discountRate, 3);
  const projectedDiscountedCashFlow2026 = projectedCashFlow2026 / Math.pow(1 + discountRate, 4);
  const projectedDiscountedCashFlow2027 = projectedCashFlow2027 / Math.pow(1 + discountRate, 5);

  const year5Cash = projectedDiscountedCashFlow2027;

  // Final DCF Calculations
  const totalDiscountedCashFlow = projectedDiscountedCashFlow2023 + projectedDiscountedCashFlow2024 + projectedDiscountedCashFlow2025 + projectedDiscountedCashFlow2026 + projectedDiscountedCashFlow2027;
  const perpetualGrowthRate = 0.0449;
  const terminalValue = (year5Cash * (1 + perpetualGrowthRate)) / (discountRate - perpetualGrowthRate);
  const discountedTerminalValue = terminalValue / Math.pow(1 + discountRate, 5);
  const projectedEnterpriseValue = discountedTerminalValue + totalDiscountedCashFlow;
  const equityValue = projectedEnterpriseValue + cashAndShortTermInvestments - totalDebt;

  const dcfValue = equityValue / weightedAverageShsOut;
  const valuation = (Math.abs(((price - dcfValue) / price) * 100)).toFixed(2) + '%';

  // Functions Related to Graphing Historical Data and Projections
  const [historicalData, setHistoricalData] = useState({
    labels: [],
    datasets: [],
  });

  // Update UserData whenever any of the freeCashFlow variables change
  useEffect(() => {
    const OperatingCashFlowChart = {
      label: 'Operating CashFlow Chart',
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
        forecastOperatingCashFlow[4].y
      ],
      borderColor: 'rgba(255, 99, 132, 1)',
    };

    const FreeCashFlowChart = {
      label: 'Discounted FreeCashFlow Chart',
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
        projectedCashFlow2027
      ],
      borderColor: 'rgba(0, 99, 132, 255)',
    };

    const CapExChart = {
      label: 'CapEx Chart',
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
        forecastCapEx[4].y
      ],
      borderColor: 'rgba(54, 162, 235, 1)',
    };

    const RevenueChart = {
      label: 'Revenue Chart',
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
        forecastRevenue[4].y
      ],
      borderColor: 'rgba(255, 206, 86, 1)',
    };

    // Update historicalData with the new datasets
    setHistoricalData({
      labels: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027],
      datasets: [OperatingCashFlowChart, FreeCashFlowChart, CapExChart, RevenueChart],
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
    projectedCashFlow2027
  ]);

  const [barChartData, setBarChartData] = useState({
    labels: ['Price', 'DCF Value'],
    datasets: [
      {
        label: 'Value Comparison',
        data: [price, dcfValue],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  });

  // Update barChartData whenever the price or dcfValue changes
  useEffect(() => {
    const newBarChartData = {
      labels: ['Price', 'DCF Value'],
      datasets: [
        {
          label: 'Value Comparison',
          data: [price, dcfValue],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
        },
      ],
    };

    // Update the state with the new data
    setBarChartData(newBarChartData);
  }, [price, dcfValue]);

  return (
    <div>
      <div className="card-body">
        <div className='card2'>
          <div className='card2-content'>
            <>
              <div>
                <h1 style={{ textAlign: 'center' }}>Discounted Cash Flow (DCF) Valuation</h1>

                {/* Step 1: Get the Cost of Equity */}
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 1: Find Cost of Equity</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>
                  <p><strong>Explanation:</strong> Cost of equity represents the return expected by equity investors.</p>
                  <p><strong>Formula:</strong> Cost of Equity = (Risk-Free Rate + Beta) * Market Premium</p>
                  <p><strong>Risk Free Rate:</strong> {0.429.toFixed(2)}</p>
                  <p><strong>Beta:</strong> {beta}</p>
                  <p><strong>Market Premium:</strong> {0.057.toFixed(2)}</p>
                  <p><strong>Cost of Equity:</strong> ${(costEquity).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                {/* Step 2: Get the Cost of Debt */}
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 2: Get the Cost of Debt</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Cost of debt represents the cost of borrowing for the company.</p>
                  <p>Formula: Cost of Debt = Interest Expense / Total Debt</p>
                  <p>Interest Expense: ${interestExpense}</p>
                  <p>Total Debt: ${totalDebt}</p>
                  <p>Cost of Debt: ${(costDebt).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                {/* Step 3: Get Tax Rate */}
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 3: Get Tax Rate</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Tax rate adjusts cash flows for taxes.</p>
                  <p>Formula: Tax Rate = Income Tax Expense / Income Before Tax</p>
                  <p>Income Tax Expense: ${incomeExpense}</p>
                  <p>Income Before Tax: ${incomeBeforeTax}</p>
                  <p>Tax Rate: {(taxRate).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                {/* Step 4: Calculate Weight of Debt */}
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 4: Calculate Weight of Debt</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Weight of debt shows the proportion of debt in the capital structure.</p>
                  <p>Formula: Weight of Debt = Total Debt / (Total Debt + Market Capitalization)</p>
                  <p>Total Debt: ${totalDebt}</p>
                  <p>Market Capitalization: ${mktCap}</p>
                  <p>Weight of Debt: ${(weightOfDebt).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                {/* Step 5: Calculate Weight of Equity */}
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 5: Calculate Weight of Equity</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Weight of equity shows the proportion of equity in the capital structure.</p>
                  <p>Formula: Weight of Equity = Market Capitalization / (Total Debt + Market Capitalization)</p>
                  <p>Market Capitalization: ${mktCap}</p>
                  <p>Total Debt: ${totalDebt}</p>
                  <p>Weight of Equity: ${(weightOfEquity).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                {/* Step 6: Calculate Discount Rate */}
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 6: Calculate Discount Rate</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: The discount rate is the weighted average of cost of debt and cost of equity, adjusted for the tax rate.</p>
                  <p>Formula: Discount Rate = ((Weight of Debt * Cost of Debt) + (Weight of Equity * Cost of Equity)) * (1 - Tax Rate)</p>
                  <p>Weight of Debt: ${(weightOfDebt).toFixed(2)}</p>
                  <p>Cost of Debt: ${(costDebt).toFixed(2)}</p>
                  <p>Weight of Equity: ${(weightOfEquity).toFixed(2)}</p>
                  <p>Cost of Equity: ${(costEquity).toFixed(2)}</p>
                  <p>Discount Rate: {(discountRate).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                <h2 style={{ textAlign: 'center' }}>Part 2: Project and Discount Cash Flows</h2>
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 1: Use Linear Regression to Project Next 5 Years of Cash Flows</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <HistoricalCashflowChart chartData={historicalData} />
                </Card>
                <div className="gap2"></div>

                <p style={{ textAlign: 'center' }}><strong>Step 2: Discount Each Future Year with the Discount Rate</strong></p>
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 2: Calculate Terminal Value</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p>Explanation: Terminal value represents the value beyond the projection period.</p>
                  <p>Formula: Terminal Value = (Year 5 Cash Flow * (1 + Perpetual Growth Rate)) / (Discount Rate - Perpetual Growth Rate)</p>
                  <p>Year 5 Cash Flow: ${year5Cash}</p>
                  <p>Perpetual Growth Rate: {perpetualGrowthRate}</p>
                  <p>Discount Rate: {discountRate}</p>
                  <p><strong>Terminal Value:</strong> ${(terminalValue).toFixed(2)}</p>
                </Card>
                <div className="gap2"></div>

                <p></p>
                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 3: Discount Terminal Value</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Discount terminal value back to its present value.</p>
                  <p>Formula: Discounted Terminal Value = Terminal Value / (1 + Discount Rate)^5</p>
                  <p><strong>Terminal Value: ${(terminalValue).toFixed(2)}</strong></p>
                  <p><strong>Discount Rate: ${(discountRate).toFixed(2)}</strong></p>
                </Card>
                <div className="gap2"></div>

                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 4: Calculate Projected Enterprise Value</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Projected enterprise value is the sum of discounted terminal value and total discounted cash flows.</p>
                  <p>Formula: Projected Enterprise Value = Discounted Terminal Value + Total Discounted Cash Flow</p>
                  <p><strong>Discounted Terminal Value: ${(discountedTerminalValue).toFixed(2)}</strong></p>
                  <p><strong>Total Discounted Cash Flow: ${(totalDiscountedCashFlow).toFixed(2)}</strong></p>
                  <p><strong>Projected Enterprise Value: ${(projectedEnterpriseValue).toFixed(2)}</strong></p>
                </Card>
                <div className="gap2"></div>

                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 5: Calculate Equity Value</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: Equity value is projected enterprise value adjusted for cash and short-term investments minus total debt.</p>
                  <p>Formula: Equity Value = Projected Enterprise Value + Cash and Short-Term Investments - Total Debt</p>
                  <p><strong>Projected Enterprise Value: </strong> ${(projectedEnterpriseValue).toFixed(2)}</p>
                  <p><strong>Cash and Short Investments: </strong> ${cashAndShortTermInvestments}</p>
                  <p><strong>Total Debt:</strong> ${totalDebt}</p>
                </Card>
                <div className="gap2"></div>

                <Card type="inner" title={<strong style={{ textAlign: 'center', justifyContent: 'center', fontSize: '20px', color: 'white' }}>Step 7: Calculate Estimated DCF Value</strong>} style={{ backgroundColor: '#111936', color: 'white', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)' }}>

                  <p style={{ textAlign: 'center' }}><strong></strong></p>
                  <p>Explanation: DCF value is the equity value divided by weighted average shares outstanding, providing an intrinsic value per share.</p>
                  <p>Formula: DCF Value = Equity Value / Weighted Average Shares Outstanding</p>
                  <p><strong>Equity Value:</strong> ${(equityValue).toFixed(2)}</p>
                  <p>averageCapExMargin: {averageCapExMargin}</p>

                  <p><strong>Weighted Average Shares Outstanding:</strong> {weightedAverageShsOut}</p>
                  <p>DCF Value: ${(dcfValue).toFixed(2)}</p>

                  <div style={{ textAlign: 'center' }}>
                    <h1>Discounted Cash Flow (DCF) Valuation</h1>

                    {price < dcfValue ? (
                      <div
                        value={valuation}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<IconArrowDown />}
                      />
                    ) : (
                      <div
                        value={valuation}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<IconArrowDown />}
                      />
                    )}

                  </div>
                  <DCFValueChart chartData={barChartData} />

                </Card>

              </div>
            </>
          </div>
        </div>
        <div className="gap2"></div>
      </div>
    </div>
  );
};

export default Discounter;
