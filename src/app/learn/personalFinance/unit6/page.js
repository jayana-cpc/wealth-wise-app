"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Paper,
  Center,
  Space,
  List,
  ListItem,
  Button,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const Unit6Lesson1 = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/learn/personalFinance");
  };

  return (
    <NavBarTemplate>
      <Center>
        <Breadcrumbs
          prevRoute="/learn/personalFinance/unit5/lesson2"
          nextRoute="/learn/personalFinance/unit7/lesson1"
        />
      </Center>
      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit Six - Financial Investing</Title>
          </Center>
          <Divider my="sm" />
          <Text>Welcome to Unit Six - Financial Investing!</Text>
          <Text>
            In this unit, we&apos;ll explore foundational concepts and
            strategies in investing, focusing on market efficiency, stocks,
            diversification, mutual funds, and the Efficient Market Hypothesis
            (EMH). By understanding these principles, you will be better
            equipped to make informed investment decisions and manage your
            portfolio effectively. For a more comprehensive view on stock
            selection we would highly recommend you visit our course on stock
            selection, guiding you through the process of analyzing a stock of
            your choosing!
          </Text>
          <Space h="md" />
          <Center>
            <Button
              variant="gradient"
              gradient={{ from: "violet", to: "blue", deg: 153 }}
              size="md"
              onClick={handleButtonClick}
            >
              Investing Course
            </Button>
          </Center>
          <Divider my="sm" />
          <Title order={2}>
            1. Market Efficiency and Investment Strategies
          </Title>
          <Text>
            In the world of personal finance, economists often discuss the
            &ldquo;efficiency&rdquo; of markets rather than recommending
            specific stocks. The concept of market efficiency suggests that
            financial markets quickly adjust to new information, leaving little
            opportunity for profit from new developments. This idea is
            humorously illustrated by an old economics joke: two economists are
            walking down the street when the younger one spots a $20 bill. He
            bends down to pick it up, only for the older economist to say,
            &ldquo;Don&apos;t bother! If it were real, someone would have
            already taken it.&rdquo;
          </Text>
          <Text>
            <strong>Explanation:</strong> This joke highlights the belief that
            in efficient markets, profitable opportunities are quickly
            exploited, meaning they are unlikely to persist for long.
          </Text>
          <Divider my="sm" />
          <Title order={2}>2. Understanding Stocks and Returns</Title>
          <Text>
            Investors have various options for placing their money, but stocks
            are a popular choice due to their potential for high returns over
            time. Investors can earn money through two primary ways:
          </Text>
          <List withPadding>
            <ListItem>
              <strong>Dividends:</strong> These are shares of a company&apos;s
              profits paid out to stockholders, typically on a quarterly basis.
              Established companies with stable earnings often provide
              dividends.
            </ListItem>
            <ListItem>
              <strong>Capital Gains:</strong> These occur when a stock is sold
              for more than its purchase price. For example, if you buy a stock
              for $50 and sell it for $70, your capital gain is $20.
            </ListItem>
          </List>
          <Text>
            <strong>Example:</strong> Suppose you buy shares in a technology
            company. If the company pays $2 per share in dividends and you sell
            your shares at a higher price than you paid, you benefit from both
            dividends and capital gains.
          </Text>
          <Divider my="sm" />
          <Title order={2}>3. Diversification and Risk Management</Title>
          <Text>
            To manage the risk associated with stock investments,
            diversification is crucial. Diversification involves spreading
            investments across various financial instruments, such as different
            industries, company sizes, and geographical locations. This approach
            reduces risk because it&apos;s unlikely that all investments will
            react the same way to market events.
          </Text>
          <Text>
            <strong>Example:</strong> Investing solely in stocks from companies
            in the tourism sector might leave your portfolio vulnerable to
            downturns in that sector. In contrast, a diversified portfolio with
            stocks from technology, healthcare, and consumer goods sectors helps
            mitigate this risk.
          </Text>
          <Divider my="sm" />
          <Title order={2}>4. Mutual Funds: A Diversification Tool</Title>
          <Text>
            Mutual funds pool money from many investors to buy a variety of
            stocks or other securities, offering a convenient way to diversify.
            There are different types of mutual funds:
          </Text>
          <List withPadding>
            <ListItem>
              <strong>Active Management Funds:</strong> These funds are managed
              by professionals who actively select stocks with the goal of
              outperforming the market. They make buy and sell decisions based
              on research and forecasts. This approach often involves higher
              fees due to active management.
            </ListItem>
            <ListItem>
              <strong>Passive Management Funds (Index Funds):</strong> These
              funds aim to replicate the performance of a specific market index,
              such as the S&P 500. They generally have lower fees since they
              require less active management.
            </ListItem>
          </List>
          <Text>
            <strong>Example:</strong> An index fund tracking the S&P 500 will
            invest in the same 500 companies included in the index. If a company
            like Chatport Technologies represents 1% of the S&P 500, the fund
            will allocate 1% of its assets to Chatport.
          </Text>
          <Divider my="sm" />
          <Title order={2}>
            5. Efficient Market Hypothesis (EMH) and Investment Strategies
          </Title>
          <Text>
            The Efficient Market Hypothesis (EMH) posits that stock prices
            reflect all available information, making it impossible to
            consistently achieve higher returns than the overall market through
            stock picking. According to EMH:
          </Text>
          <List withPadding>
            <ListItem>
              <strong>Active Management:</strong> The goal is to identify
              undervalued stocks and sell them when they become overvalued.
              However, this approach may not always outperform the market due to
              high transaction costs and competition from other investors.
            </ListItem>
            <ListItem>
              <strong>Passive Management:</strong> Based on EMH, investing in a
              diversified portfolio that replicates a market index is often more
              cost-effective. This strategy avoids the high fees of active
              management and aims to achieve market-average returns.
            </ListItem>
          </List>
          <Text>
            <strong>Example:</strong> Research shows that while some actively
            managed funds outperform the market, most do not. Passive investment
            strategies, like those used in index funds, often have lower costs
            and can save investors substantial amounts over time.
          </Text>
          <Space h="md" />
          <Divider my="sm" />
          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit5/lesson2"
              nextRoute="/learn/personalFinance/unit7/lesson1"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit6Lesson1;
