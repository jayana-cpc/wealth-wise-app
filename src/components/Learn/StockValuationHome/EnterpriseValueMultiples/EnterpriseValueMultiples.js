import { Title, Text, Center, Button, Container, List, Space, Paper } from '@mantine/core';
import EVtoEBITDA from "./EVtoEBITDA";
import PricetoCashflow from "./PricetoCashflow";
import EVtoSales from "./EVtoSales";
import { useRouter } from 'next/navigation';

export function EnterpriseValueMultiples() {
    const router = useRouter();
    const continueButton = () => {
        router.push('/learn/stockValuation/equityValueMultiples');
    };
    return (
        <>
            <Container style={{ color: 'white' }}>
                <Paper shadow="sm" p="md">
                    <Title order={2} style={{ color: '#ffffff' }}>Enterprise Valuation Multiples</Title>
                    <Text>To understand and apply the valuation ratios EV/EBITDA, EV/Sales, and Price to Cash Flow for informed investment decision-making.</Text>

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>1. Introduction to Valuation Ratios</Title>
                    <Text>
                        <strong>Valuation Ratios:</strong> Metrics used to evaluate the attractiveness of an investment in a company&#39;s stock relative to other stocks or the market in general.
                    </Text>
                    <Text>
                        <strong>Importance:</strong>
                    </Text>
                    <List spacing="xs" size="sm" center>
                        <List.Item>Provides insights into a company&#39;s financial health and performance.</List.Item>
                        <List.Item>Helps investors compare companies within the same industry.</List.Item>
                    </List>

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>2. Understanding EV/EBITDA</Title>
                    <Text>
                        <strong>Enterprise Value (EV):</strong> A measure of a company&#39;s total value, often seen as a more comprehensive alternative to market capitalization.
                    </Text>
                    <Text>
                        <strong>Formula:</strong> <code>EV = Market Capitalization + Total Debt - Cash and Cash Equivalents</code>
                    </Text>
                    <Text>
                        <strong>EBITDA:</strong> Earnings Before Interest, Taxes, Depreciation, and Amortization.
                    </Text>
                    <Text>
                        <strong>Formula:</strong> <code>EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization</code>
                    </Text>
                    <Text>
                        <strong>EV/EBITDA Ratio:</strong>
                    </Text>
                    <Text>
                        <strong>Formula:</strong> <code>EV/EBITDA = Enterprise Value / EBITDA</code>
                    </Text>
                    <Text>
                        <strong>Interpretation:</strong> Indicates the value of a company, including debt, relative to its earnings before interest, taxes, depreciation, and amortization.
                    </Text>
                    <Text>
                        <strong>Example:</strong> If EV is $500 million and EBITDA is $50 million, EV/EBITDA = <code>500 / 50 = 10</code>.
                    </Text>
                    <Space h="md" />
                    <EVtoEBITDA />
                    <Space h="lg" />
                    <Title order={3} style={{ color: '#ffffff' }}>3. Understanding EV/Sales</Title>
                    <Text>
                        <strong>EV/Sales Ratio:</strong>
                    </Text>
                    <Text>
                        <strong>Formula:</strong> <code>EV/Sales = Enterprise Value / Sales</code>
                    </Text>
                    <Text>
                        <strong>Interpretation:</strong> Measures how much investors are willing to pay per dollar of sales. It&#39;s particularly useful for comparing companies within the same industry.
                    </Text>
                    <Text>
                        <strong>Example:</strong> If EV is $500 million and Sales are $100 million, EV/Sales = <code>500 / 100 = 5</code>.
                    </Text>
                    <Space h="lg" />
                    <EVtoSales />

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>4. Understanding Price to Cash Flow</Title>
                    <Text>
                        <strong>Price to Cash Flow Ratio:</strong>
                    </Text>
                    <Text>
                        <strong>Formula:</strong> <code>Price to Cash Flow = Market Price per Share / Operating Cash Flow per Share</code>
                    </Text>
                    <Text>
                        <strong>Interpretation:</strong> Indicates how much investors are willing to pay per dollar of cash flow from operating activities.
                    </Text>
                    <Text>
                        <strong>Example:</strong> If the market price per share is $50 and operating cash flow per share is $10, Price to Cash Flow = <code>50 / 10 = 5</code>.
                    </Text>
                    <Space h="lg" />
                    <PricetoCashflow />

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>5. Limitations of These Ratios</Title>
                    <List spacing="xs" size="sm" center>
                        <List.Item><strong>Market Conditions:</strong> Economic cycles, interest rates, and investor sentiment can affect ratios.</List.Item>
                        <List.Item><strong>Company Differences:</strong> Comparing companies of different sizes, industries, and stages of growth can be misleading.</List.Item>
                        <List.Item><strong>Non-Cash Factors:</strong> EBITDA excludes non-cash expenses, which might not give a full picture of profitability.</List.Item>
                    </List>

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>6. Conclusion</Title>
                    <Text>
                        Advanced valuation ratios such as EV/EBITDA, EV/Sales, and Price to Cash Flow provide deeper insights into a company&#39;s financial health and valuation. By understanding and applying these ratios, investors can make more informed decisions.
                    </Text>

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>Formulas Recap:</Title>
                    <List spacing="xs" size="sm" center>
                        <List.Item><strong>EV/EBITDA:</strong> <code>EV/EBITDA = Enterprise Value / EBITDA</code></List.Item>
                        <List.Item><strong>EV/Sales:</strong> <code>EV/Sales = Enterprise Value / Sales</code></List.Item>
                        <List.Item><strong>Price to Cash Flow:</strong> <code>Price to Cash Flow = Market Price per Share / Operating Cash Flow per Share</code></List.Item>
                    </List>

                    <Space h="md" />
                    <Title order={3} style={{ color: '#ffffff' }}>Quick Reference:</Title>
                    <List spacing="xs" size="sm" center>
                        <List.Item><strong>EV/EBITDA:</strong> Indicates the value of a company relative to its earnings before interest, taxes, depreciation, and amortization.</List.Item>
                        <List.Item><strong>EV/Sales:</strong> Measures how much investors are willing to pay per dollar of sales.</List.Item>
                        <List.Item><strong>Price to Cash Flow:</strong> Indicates how much investors are willing to pay per dollar of cash flow from operating activities.</List.Item>
                    </List>
                    <Space h="md" />
                    <Center><Button onClick={continueButton}>Continue</Button></Center>
                </Paper>
            </Container>
        </>
    );
}
