import React from "react";
import {
  Title,
  Text,
  Center,
  Button,
  Container,
  List,
  Space,
  Paper,
} from "@mantine/core";
import { PEGrowth } from "./PEtoGrowth";
import PricetoBook from "./PricetoBook";
import PricetoSales from "./PricetoSales";

import { useRouter } from "next/navigation";

export function EquityValueMultiples() {
  const router = useRouter();

  const continueButton = () => {
    router.push("/learn/stockValuation/discountedCashflowValuation");
  };

  return (
    <>
      <Container style={{ color: "white" }}>
        <Paper shadow="sm" p="md">
          <Title order={2} style={{ color: "#ffffff" }}>
            Equity Valuation Multiples
          </Title>
          <Text>
            To understand and apply the valuation ratios PE to Growth, Price to
            Book, and Price to Sales for informed investment decision-making.
          </Text>

          <Space h="md" />
          <Title order={3} style={{ color: "#ffffff" }}>
            1. Introduction to Equity Valuation Ratios
          </Title>
          <Text>
            <strong>Equity Valuation Ratios:</strong> Metrics used to assess the
            attractiveness of investing in a company&#39;s stock by comparing it
            to its peers or industry benchmarks.
          </Text>
          <Text>
            <strong>Importance:</strong>
          </Text>
          <List spacing="xs" size="sm" center>
            <List.Item>
              Provides insights into a company&#39;s stock performance and
              growth potential.
            </List.Item>
            <List.Item>
              Enables investors to compare valuation with competitors and
              industry averages.
            </List.Item>
          </List>

          <Space h="md" />
          <Title order={3} style={{ color: "#ffffff" }}>
            2. Understanding PE to Growth (PEG) Ratio
          </Title>
          <Text>
            <strong>PEG Ratio:</strong> A valuation metric that adjusts the
            Price-to-Earnings ratio for growth, offering a more nuanced view of
            a company&#39;s value.
          </Text>
          <Text>
            <strong>Formula:</strong>{" "}
            <code>PEG = PE Ratio / Annual EPS Growth Rate</code>
          </Text>
          <Text>
            <strong>Interpretation:</strong> Provides insight into how much
            investors are paying for each unit of growth. A PEG ratio close to 1
            is often considered fair value.
          </Text>
          <Text>
            <strong>Example:</strong> If the PE Ratio is 15 and the annual EPS
            growth rate is 5%, PEG = <code>15 / 5 = 3</code>.
          </Text>
          <Space h="md" />
          <PEGrowth />
          <Space h="lg" />

          <Title order={3} style={{ color: "#ffffff" }}>
            3. Understanding Price to Book Ratio
          </Title>
          <Text>
            <strong>Price to Book Ratio:</strong> A valuation measure comparing
            the market price of a stock to its book value.
          </Text>
          <Text>
            <strong>Formula:</strong>{" "}
            <code>
              Price to Book = Market Price per Share / Book Value per Share
            </code>
          </Text>
          <Text>
            <strong>Interpretation:</strong> Indicates how much investors are
            willing to pay for a company&#39;s net assets. A ratio below 1 may
            indicate undervaluation.
          </Text>
          <Text>
            <strong>Example:</strong> If the market price per share is $50 and
            the book value per share is $30, Price to Book ={" "}
            <code>50 / 30 = 1.67</code>.
          </Text>
          <Space h="md" />
          <PricetoBook />
          <Space h="lg" />

          <Title order={3} style={{ color: "#ffffff" }}>
            4. Understanding Price to Sales Ratio
          </Title>
          <Text>
            <strong>Price to Sales Ratio:</strong> A financial ratio that
            compares a company&#39;s stock price to its revenue per share.
          </Text>
          <Text>
            <strong>Formula:</strong>{" "}
            <code>
              Price to Sales = Market Price per Share / Sales per Share
            </code>
          </Text>
          <Text>
            <strong>Interpretation:</strong> Useful for assessing how much
            investors value each dollar of a company&#39;s sales. A lower ratio
            might indicate undervaluation.
          </Text>
          <Text>
            <strong>Example:</strong> If the market price per share is $50 and
            sales per share is $20, Price to Sales = <code>50 / 20 = 2.5</code>.
          </Text>
          <Space h="md" />
          <PricetoSales />

          <Space h="md" />
          <Title order={3} style={{ color: "#ffffff" }}>
            5. Limitations of These Ratios
          </Title>
          <List spacing="xs" size="sm" center>
            <List.Item>
              <strong>Market Conditions:</strong> External factors such as
              economic trends can skew these ratios.
            </List.Item>
            <List.Item>
              <strong>Industry Variations:</strong> Different industries have
              different benchmarks, making cross-industry comparisons tricky.
            </List.Item>
            <List.Item>
              <strong>Short-term Fluctuations:</strong> Stock price volatility
              can impact the accuracy of these ratios.
            </List.Item>
          </List>

          <Space h="md" />
          <Title order={3} style={{ color: "#ffffff" }}>
            6. Conclusion
          </Title>
          <Text>
            Understanding PE to Growth, Price to Book, and Price to Sales ratios
            provides investors with critical insights into a company&#39;s
            valuation. These metrics offer a comparative analysis against peers,
            aiding in more strategic investment decisions.
          </Text>

          <Space h="md" />
          <Title order={3} style={{ color: "#ffffff" }}>
            Formulas Recap:
          </Title>
          <List spacing="xs" size="sm" center>
            <List.Item>
              <strong>PEG:</strong>{" "}
              <code>PEG = PE Ratio / Annual EPS Growth Rate</code>
            </List.Item>
            <List.Item>
              <strong>Price to Book:</strong>{" "}
              <code>
                Price to Book = Market Price per Share / Book Value per Share
              </code>
            </List.Item>
            <List.Item>
              <strong>Price to Sales:</strong>{" "}
              <code>
                Price to Sales = Market Price per Share / Sales per Share
              </code>
            </List.Item>
          </List>

          <Space h="md" />
          <Title order={3} style={{ color: "#ffffff" }}>
            Quick Reference:
          </Title>
          <List spacing="xs" size="sm" center>
            <List.Item>
              <strong>PEG:</strong> Reflects a company&#39;s value relative to
              its growth rate.
            </List.Item>
            <List.Item>
              <strong>Price to Book:</strong> Compares market price to book
              value, indicating perceived asset value.
            </List.Item>
            <List.Item>
              <strong>Price to Sales:</strong> Measures valuation relative to
              sales revenue.
            </List.Item>
          </List>
          <Space h="md" />
          <Center>
            <Button onClick={continueButton}>Continue</Button>
          </Center>
        </Paper>
      </Container>
    </>
  );
}

export default EquityValueMultiples;
