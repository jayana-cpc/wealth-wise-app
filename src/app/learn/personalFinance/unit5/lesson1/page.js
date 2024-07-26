"use client";
import React, { useState } from 'react';
import { Container, Title, Text, Divider, Paper, Center, Space, Button, Modal, List, ListItem } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import CreditCostCalculator from '@/components/Learn/PersonalFinanceHome/Unit5/CreditCalc';
import { CreditVsStoreCard } from '@/components/Learn/PersonalFinanceHome/Unit5/Lesson1/Question1';
import { AutoLoanVsDealership } from '@/components/Learn/PersonalFinanceHome/Unit5/Lesson1/Question2';

const creditTypes = [
    {
        type: "Credit Cards",
        description: "Credit cards represent an agreement between the person using the card and the company or bank that issued the card. Each time a person makes a purchase with a credit card, that person is taking out a loan from the card issuer. The cost of the loan—the interest charged—and all of the repayment details are part of the agreement the card user signs when the credit card account is opened."
    },
    {
        type: "Store Cards",
        description: "Store cards are like credit cards but only work at one particular store. Many department stores, clothing stores, and gas stations issue store cards. Store cards often have much higher interest rates than regular credit cards, so you should be very careful when using this type of credit."
    },
    {
        type: "Auto Loans",
        description: "Auto loans are a type of credit issued by a bank or other financial company for the purpose of buying a car. You&apos;ll usually find better interest rates on auto loans from your bank or credit union than from the car dealerships."
    },
    {
        type: "Mortgages",
        description: "Mortgages are loans made by banks or mortgage companies for the purchase of property. The property could be, for example, a house to live in, rental property used to generate income, recreational land in the country, or a lot on which you plan to develop a business. There are many types of mortgages, and figuring out which one is right for the type of property you&apos;re going to buy could be a whole course on its own!"
    }
];

const CreditType = ({ type, description }) => {
    const [opened, setOpened] = useState(false);

    return (
        <ListItem>
            <Text><strong>{type}</strong></Text>
            <Button variant="subtle" onClick={() => setOpened(true)} ml="md">Learn More</Button>
            <Modal opened={opened} onClose={() => setOpened(false)} title={type}>
                <Text>{description}</Text>
            </Modal>
        </ListItem>
    );
};

const Unit5Lesson1 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit5/lesson2');
    };

    return (
        <NavBarTemplate>
            <Container>
                <Paper shadow="sm" p="md">
                    <Center><Title order={1}>Unit 5.1 - What is Credit</Title></Center>
                    <Divider my="sm" />
                    <Text>
                        Credit is defined as the ability to obtain goods or services before payment, based on the trust that full payment will be made in the future, usually with interest. When you owe money as a result of using credit, you are in debt.
                    </Text>
                    <Space h="md" />
                    <Text>
                        Credit cards are convenient to use and many offer special perks, such as free airline tickets, hotel stays, or even cash back. In addition, many cards offer special protections for users, such as travel insurance and assistance in filing a dispute should something purchased with the card work poorly.
                    </Text>
                    <Space h="md" />
                    <Text>
                        Credit in the form of a mortgage or auto loan makes purchasing big-ticket items much more convenient and practical because it would take such a long time to save enough money to pay the full amount up front. Credit allows you to live in a house or drive a car while you are still paying for it.
                    </Text>
                    <Space h="md" />
                    <Text>
                        Student loans can make attending college or technical school more attainable, as taking a pay-as-you-go approach would put a college education or advanced training out of reach for a lot of people. With a college education or skilled technical training, you are likely to earn a higher income over your lifetime, so making an investment in education is a great use of credit.
                    </Text>
                    <Space h="md" />
                    <Text>
                        There are also times when you may need to use credit out of necessity. For anyone hospitalized, payment is usually in the form of credit. Hospitals will treat patients immediately, with the understanding that insurance payments and billing will be worked out later. If your car breaks down or your computer goes on the fritz and you don&apos;t have money saved for emergencies, you might find yourself using credit out of necessity.
                    </Text>
                    <Space h="md" />
                    <Text>
                        Interest is the price of using someone else&apos;s money. When using credit, you agree to pay the original amount of money (the principal) and an additional percentage of the amount borrowed, which is called interest. An interest rate is the amount of interest charged, expressed as an annual percentage rate (APR) of the amount borrowed. When you borrow money, you need to consider the interest rate in order to calculate the total amount you&apos;ll owe.
                    </Text>
                    <Space h="md" />

                    <Divider my="sm" />

                    <Text>
                        If a credit loan on a new Ferrari has a high interest rate, would it be ideal to buy the Ferrari?
                    </Text>
                    <Space h="md" />

                    <Text>
                        Now, we know that high interest rate loans are generally bad, while low interest rate loans are generally good. This thinking, however, has a caveat — time. The longer the term of a loan—the time it takes to pay off the loan—the greater the total interest you will pay. For example, consider a $2,000 loan with two different loan lengths:
                    </Text>
                    <Space h="md" />

                    <Text>
                        With the one-year loan, you would pay $200 in interest (in addition to the principal of the loan), for a total of $2,200 owed at the end of the year.
                    </Text>
                    <Space h="md" />

                    <Text>
                        With the two-year loan, you would pay $400 in interest (in addition to the principal of the loan), for a total of $2,400 owed at the end of the second year.
                    </Text>
                    <Space h="md" />

                    <Text>
                        So, in this example, taking a two-year loan instead of a one-year loan would double the interest you would pay.
                    </Text>
                    <Space h="md" />

                    <Text>
                        Note that the previous example offered a simple example of the cost of borrowing $2,000. The full loan was repaid at the end of the loan term at the given interest rate. This is rarely how loans are calculated, however. With most loan terms, you make monthly payments on the loan, with some of the principal paid back with each payment. When you lower the principal owed, you lower the amount of interest paid over the life of the loan. So, the faster you pay back a loan, the less total interest you will pay over the life of the loan.
                    </Text>

                    <Space h="md" />
                    <Divider my="sm" />
                    <Title order={2}>Types of Credit</Title>
                    <List withPadding>
                        {creditTypes.map((credit, index) => (
                            <CreditType key={index} type={credit.type} description={credit.description} />
                        ))}
                    </List>
                    <Space h="md" />
                    <Divider my="sm" />
                    <Title>Credit: Calculating the Cost</Title>
                    <CreditCostCalculator />
                    <Space h="md" />
                    <Divider my="sm" />
                    <CreditVsStoreCard />
                    <AutoLoanVsDealership />
                    <Space h="md" />
                    <Divider my="sm" />
                    <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 2</Button></Center>
                </Paper>
            </Container>
        </NavBarTemplate>
    );
};

export default Unit5Lesson1;
