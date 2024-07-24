"use client"
import React from 'react';
import { Container, Title, Text, List, ListItem, Divider, Group, Paper, Center, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson2/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson2/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson2/Question3';
const IncomeExplanation = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit2/lesson3');
    };

    return (
        <NavBarTemplate>
            <Container>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Unit 2.2 - Income &amp; Taxes</Title></Center>
            <Text>
                When you provide something of value to others, you typically receive something in return.
                This is the fundamental concept of economics. In the world of work, your valuable resource
                is your labor – the time and effort you contribute. In exchange for your labor, you receive
                income.
                </Text>

                <Divider my="sm" />

                <Text>
                There are primarily two ways people earn income from their labor: wages and salaries.
                </Text>

                <List withPadding>
                <ListItem>
                    <Text>
                    <strong>Wages</strong> are the most common form of payment for hourly work. You get paid based on the number
                    of hours you work multiplied by your hourly rate. For example, if you work at a fast-food
                    restaurant and earn $12 per hour, and you work 20 hours a week, you&apos;ll earn $240 that week.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                    <strong>Salaries</strong> are typically paid on a fixed schedule, such as weekly, bi-weekly, or monthly. Unlike
                    wages, salaries are usually a set amount per year, regardless of the number of hours worked. For
                    instance, a teacher might earn a salary of $50,000 per year, paid in equal installments over twelve months.
                    </Text>
                </ListItem>
                </List>

                <Divider my="sm" />

                <Title order={3}>From Gross to Net: Understanding Your Paycheck</Title>
                <Text>
                Your paycheck is more than just a number; it&apos;s a summary of your earnings and deductions. Let&apos;s break it down.
                </Text>
                <Text>
                <strong>Gross pay</strong> is your total earnings before any taxes or other deductions are taken out. It&apos;s the
                amount you&apos;ve earned for your work.
                </Text>
                <Text>
                However, the number that really matters is your <strong>net pay</strong> – the amount you actually take home. This is
                your gross pay minus taxes, insurance premiums, and other deductions.
                </Text>

                <Divider my="sm" />

                <Title order={4}>Taxes: Funding Our Society</Title>
                <Text>
                Taxes are a necessary part of life. They fund essential government services like roads, schools, and public safety.
                There are two primary types of taxes deducted from your paycheck:
                </Text>
                <List withPadding>
                <ListItem>
                    <Text>
                    <strong>Federal income tax:</strong> This tax supports the federal government and its programs. The amount you pay
                    depends on your income level.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                    <strong>FICA (Federal Insurance Contributions Act) taxes:</strong> These taxes fund Social Security and Medicare,
                    programs that provide benefits for retirees, disabled workers, and people with specific healthcare needs.
                    </Text>
                </ListItem>
                </List>

                <Text>
                Beyond these required deductions, you might also have other amounts subtracted from your paycheck. This could include:
                </Text>
                <List withPadding>
                <ListItem>State income tax: Some states have their own income taxes.</ListItem>
                <ListItem>Local taxes: Certain cities or counties might impose additional taxes.</ListItem>
                <ListItem>Health insurance premiums: If your employer offers health insurance, a portion of the cost is usually deducted from your paycheck.</ListItem>
                <ListItem>Retirement contributions: Many employers offer retirement plans like 401(k)s. You can choose to contribute a portion of your earnings to these plans.</ListItem>
                </List>

                <Divider my="sm" />

                <Title order={4}>Understanding 401(k) Plans</Title>
                <Text>
                A 401(k) is a retirement savings plan sponsored by an employer. It allows employees to contribute a portion of their paycheck to an individual account. Many employers offer to match employee contributions up to a certain percentage.
                </Text>
                <Group>
                <List>
                    <ListItem>
                    <Text><strong>Benefits of 401(k) plans:</strong></Text>
                    <List withPadding>
                        <ListItem>Tax advantages: Contributions are often made on a pre-tax basis, reducing your taxable income.</ListItem>
                        <ListItem>Employer matches: Many employers offer matching contributions, essentially free money for your retirement savings.</ListItem>
                        <ListItem>Compound growth: Your investments have time to grow over many years.</ListItem>
                    </List>
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                    <Text><strong>Drawbacks of 401(k) plans:</strong></Text>
                    <List withPadding>
                        <ListItem>Limited investment options: The investment choices available in a 401(k) plan may be restricted.</ListItem>
                        <ListItem>Early withdrawal penalties: Withdrawing money from a 401(k) before age 59 ½ typically incurs a 10% penalty.</ListItem>
                        <ListItem>Potential job loss: If you leave your job, you&apos;ll need to decide how to handle your 401(k) account.</ListItem>
                    </List>
                    </ListItem>
                </List>
                </Group>

                <Divider my="sm" />

                <Title order={4}>What&apos;s Taken Out of Your Paycheck?</Title>
                <Text>
                When you get paid, your employer withholds money from your earnings to pay for taxes. These taxes typically include:
                </Text>
                <List withPadding>
                <ListItem>Federal income tax: A tax paid to the federal government.</ListItem>
                <ListItem>State income tax: A tax paid to the state where you work (if applicable).</ListItem>
                <ListItem>Social Security and Medicare taxes: These fund retirement and healthcare programs.</ListItem>
                </List>

                <Text>
                <strong>How Much is Withheld?</strong> Your employer determines how much to withhold based on information you provide on forms like the W-4. This form tells your employer about your personal situation, such as your marital status, number of dependents, and other factors that influence your tax bracket.
                </Text>
                <Divider my="sm" />
                <Question1 />
                <Question2 />
                <Question3 />
                <Divider my="sm" />

                <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 3</Button></Center>
            </Paper>
            </Container>
        </NavBarTemplate>
    );
};

export default IncomeExplanation;
