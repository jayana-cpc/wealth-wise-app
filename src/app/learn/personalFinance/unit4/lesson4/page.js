"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, Center, Space, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { Problem1 } from '@/components/Learn/PersonalFinanceHome/Unit4/Lesson4/Question1';
import { Problem2 } from '@/components/Learn/PersonalFinanceHome/Unit4/Lesson4/Question2';

const Unit4Lesson4 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance');
    };

    return (
        <NavBarTemplate>
            <Container>
                <Paper shadow="sm" p="md">
                    <Center><Title order={1}>Unit 4.4 - Interacting with the Bank</Title></Center>

                    <Divider my="sm" />

                    <Title order={2}>Non-Interest Bearing Accounts</Title>
                    
                    <Text>
                        In the realm of banking and personal finance, understanding the distinction between non-interest-bearing and interest-bearing accounts is fundamental. Non-interest-bearing accounts, such as basic checking accounts, do not accrue interest on deposited funds. These accounts are typically used for everyday transactions, providing easy access to money without any growth in the deposited amount.
                    </Text>

                    <Divider my="sm" />

                    <Title order={2}>Interest-Bearing Accounts</Title>
                    <Text>
                        On the other hand, interest-bearing accounts offer account holders the opportunity to earn interest on their deposits. When individuals deposit money into these accounts, banks use these funds to lend to borrowers or invest, generating income. In return for using deposited funds, banks pay interest to account holders based on factors like the deposited amount, interest rate, and frequency of interest payments.
                    </Text>

                    <Divider my="sm" />

                    <Title order={2}>Compound Interest</Title>
                    <Text>
                        A critical concept associated with interest-bearing accounts is compound interest. This powerful mechanism allows for the accumulation of interest not only on the initial principal but also on any previously earned interest that has been added to the account. For instance, a savings account with compound interest of 5% annually means that interest is calculated on the initial deposit as well as on the accumulated interest over time. The formula for compound interest is:
                    </Text>
                    <Text>
                        <code>A = P(1 + R/n)^(nt)</code>
                    </Text>
                    <Text>
                        where:
                    </Text>
                    <ul>
                        <li><strong>A</strong> is the amount of money accumulated after <strong>n</strong> years, including interest.</li>
                        <li><strong>P</strong> is the principal amount (the initial amount of money).</li>
                        <li><strong>R</strong> is the annual interest rate (decimal).</li>
                        <li><strong>n</strong> is the number of times that interest is compounded per year.</li>
                        <li><strong>t</strong> is the number of years the money is invested or borrowed for.</li>
                    </ul>
                    <Text>
                        This formula illustrates how interest can grow exponentially over time, enhancing the potential for savings growth and wealth accumulation.
                    </Text>

                    <Divider my="sm" />

                    <Title order={2}>The Rule of 72</Title>
                    <Text>
                        When we simply want to estimate how long it will take for an investment to double in value, we can use a much simpler formula than the detailed calculations for compound interest. This is where the Rule of 72 comes in handy—it&apos;s a quick and easy way to approximate the time required for an investment to double, based on a fixed annual rate of return.
                    </Text>

                    <Divider my="sm" />

                    <Title order={2}>Understanding the Rule of 72</Title>
                    <Text>
                        The Rule of 72 provides a straightforward formula:
                    </Text>
                    <Text>
                        <code>Years to double = 72 / annual interest rate</code>
                    </Text>
                    <Text>
                        This formula allows us to estimate how many years it will take for an investment to double in value, given a certain annual interest rate. For instance, if an investment earns an annual return of 8%, it would take approximately 9 years (72 divided by 8) for the investment to double.
                    </Text>
                    <Text>
                        Understanding these principles empowers individuals to make informed decisions regarding their financial accounts, aligning their choices with long-term goals for financial stability and growth.
                    </Text>

                    <Space h="md" />
                    <Divider my="sm" />
                    <Title>Questions</Title>
                    <Problem1 />
                    <Problem2 />

                    <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Unit Page</Button></Center>
                </Paper>
            </Container>
        </NavBarTemplate>
    );
};

export default Unit4Lesson4;
