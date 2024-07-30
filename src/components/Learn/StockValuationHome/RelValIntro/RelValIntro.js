import React from 'react';
import { Title, Text, Container, List, Space, Paper } from '@mantine/core';
import { CompetitorSet } from './CompetitorSet';
const RelativeStockValuation = () => {
  return (
    <Container style={{ color: 'white' }}>
      <Paper shadow="sm" p="md">
        <Title order={2} style={{ color: '#ffffff' }}>Relative Stock Valuation</Title>
        <Text>To understand and apply the concept of relative stock valuation for informed investment decision-making.</Text>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>1. Understanding Relative Valuation</Title>
        <Text>
          <strong>Relative Valuation:</strong> Involves comparing a stock&apos;s value to other stocks to gauge its value.
        </Text>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>2. Key Ratios in Relative Valuation</Title>
        <List spacing="md" size="sm">
          <List.Item>
            <strong>Price-to-Earnings (P/E) Ratio:</strong>
            <Text>
              <strong>Formula:</strong> <code>P/E = Market Price per Share / Earnings per Share (EPS)</code>
            </Text>
            <Text>
              <strong>Interpretation:</strong> Indicates how much investors are willing to pay per dollar of earnings.
            </Text>
            <Text>
              <strong>Example:</strong> If the market price is $50 and EPS is $5, P/E = <code>50 / 5 = 10</code>.
            </Text>
          </List.Item>

          <List.Item>
            <strong>Price-to-Book (P/B) Ratio:</strong>
            <Text>
              <strong>Formula:</strong> <code>P/B = Market Price per Share / Book Value per Share</code>
            </Text>
            <Text>
              <strong>Interpretation:</strong> Compares market value to book value, reflecting what investors are willing to pay for net assets.
            </Text>
            <Text>
              <strong>Example:</strong> If the market price is $50 and the book value per share is $25, P/B = <code>50 / 25 = 2</code>.
            </Text>
          </List.Item>

          <List.Item>
            <strong>Price-to-Sales (P/S) Ratio:</strong>
            <Text>
              <strong>Formula:</strong> <code>P/S = Market Price per Share / Revenue per Share</code>
            </Text>
            <Text>
              <strong>Interpretation:</strong> Useful for companies without positive earnings, showing how much investors are paying per dollar of sales.
            </Text>
            <Text>
              <strong>Example:</strong> If the market price is $50 and revenue per share is $10, P/S = <code>50 / 10 = 5</code>.
            </Text>
          </List.Item>

          <List.Item>
            <strong>Price-to-Earnings Growth (PEG) Ratio:</strong>
            <Text>
              <strong>Formula:</strong> <code>PEG = P/E Ratio / Annual EPS Growth Rate</code>
            </Text>
            <Text>
              <strong>Interpretation:</strong> Adjusts the P/E ratio for growth, providing a more complete picture.
            </Text>
            <Text>
              <strong>Example:</strong> If P/E is 10 and annual EPS growth rate is 2%, PEG = <code>10 / 2 = 5</code>.
            </Text>
          </List.Item>
        </List>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>3. Practical Application</Title>
        <Text>
          <strong>Data Collection:</strong>
        </Text>
        <List spacing="xs" size="sm" center>
          <List.Item>
            Use financial statements, company reports, and financial news websites.
          </List.Item>
          <List.Item>
            Resources: Yahoo Finance, Google Finance, company investor relations pages.
          </List.Item>
        </List>
        <Text>
          <strong>Example Calculation:</strong>
          <br />
          For a company with a market price of $50 and EPS of $5, the P/E ratio is <code>50 / 5 = 10</code>.
          <br />
          Compare this to the industry average P/E to assess valuation.
        </Text>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>4. Case Study Example</Title>
        <Text>
          <strong>Company:</strong> Apple Inc. (AAPL)
        </Text>
        <Text>
          <strong>Steps:</strong>
        </Text>
        <List spacing="xs" size="sm" center>
          <List.Item>
            <strong>P/E Ratio:</strong> Calculate and compare to competitors like Microsoft (MSFT) and Google (GOOGL).
          </List.Item>
          <List.Item>
            <strong>P/B Ratio:</strong> Assess against industry benchmarks.
          </List.Item>
          <List.Item>
            <strong>P/S Ratio:</strong> Analyze in the context of Apple&apos;s revenue.
          </List.Item>
          <List.Item>
            <strong>PEG Ratio:</strong> Evaluate growth-adjusted valuation.
          </List.Item>
        </List>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>5. Limitations of Relative Valuation</Title>
        <List spacing="xs" size="sm" center>
          <List.Item>
            <strong>Market Conditions:</strong> Economic cycles, interest rates, and investor sentiment can affect ratios.
          </List.Item>
          <List.Item>
            <strong>Company Differences:</strong> Comparing startups with established companies or different industries can be misleading.
          </List.Item>
        </List>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>6. Conclusion</Title>
        <Text>
          Relative stock valuation is a valuable tool for investors. By understanding and applying financial ratios, investors can better assess the potential value of different stocks and make informed decisions.
        </Text>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>Formulas Recap:</Title>
        <List spacing="xs" size="sm" center>
          <List.Item>
            <strong>P/E Ratio:</strong> <code>P/E = Market Price per Share / Earnings per Share (EPS)</code>
          </List.Item>
          <List.Item>
            <strong>P/B Ratio:</strong> <code>P/B = Market Price per Share / Book Value per Share</code>
          </List.Item>
          <List.Item>
            <strong>P/S Ratio:</strong> <code>P/S = Market Price per Share / Revenue per Share</code>
          </List.Item>
          <List.Item>
            <strong>PEG Ratio:</strong> <code>PEG = P/E Ratio / Annual EPS Growth Rate</code>
          </List.Item>
        </List>

        <Space h="md" />
        <Title order={3} style={{ color: '#ffffff' }}>Quick Reference:</Title>
        <List spacing="xs" size="sm" center>
          <List.Item>
            <strong>P/E Ratio:</strong> How much investors pay per dollar of earnings.
          </List.Item>
          <List.Item>
            <strong>P/B Ratio:</strong> Comparison of market value to book value.
          </List.Item>
          <List.Item>
            <strong>P/S Ratio:</strong> Price investors pay per dollar of sales.
          </List.Item>
          <List.Item>
            <strong>PEG Ratio:</strong> Growth-adjusted P/E ratio.
          </List.Item>
        </List>
        <Space h="lg"/>

        <Title order={3} style={{ color: '#ffffff' }}>7. Choose Two Competitors</Title>
        <Text>
          Find two companies you wish to relatively evaluate your company to using financial ratios.
        </Text>
        <Space h="lg"/>

        <CompetitorSet/>        
      </Paper>
    </Container>
  );
};

export default RelativeStockValuation;
