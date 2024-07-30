"use client";
import React, { useState, useEffect } from 'react';
import { Container, Title, Text, Divider, Paper, List, ListItem, Center, Button, Space } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { MultipleChoiceQuestions } from '@/components/Learn/PersonalFinanceHome/Unit3/Lesson1/Lesson1MCQ';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit3/Lesson1/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit3/Lesson1/Question2';
import Breadcrumbs from '@/components/General/Breadcrumbs';
const Unit3Lesson1 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit3/lesson2');
    };

    return (
        <NavBarTemplate>
        <Container>
            <Center><Breadcrumbs prevRoute="/learn/personalFinance/unit3" nextRoute="/learn/personalFinance/unit1/lesson2"/></Center>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Unit 3.1 - Demand</Title></Center>

            <Divider my="sm" />

            <Title order={2}>Understanding Demand</Title>
            
            <Text>
                Economists define demand as the quantity of a good or service that buyers are willing
                and able to buy at all possible prices during a certain time period. So, there are two components
                of demand:
            </Text>
            <List withPadding>
                <ListItem>
                <Text>1. A buyer&apos;s willingness to buy</Text>
                </ListItem>
                <ListItem>
                <Text>2. A buyer&apos;s ability to pay</Text>
                </ListItem>
            </List>

            <Title order={3}>Example</Title>
            <Text>
                Everyone has likes and dislikes! Freddy loves the look of Ferraris, but dislikes the look of Kias.
            </Text>
            <Text>
                Freddy has a willingness to buy Ferraris, yet does not have the ability to pay for Ferraris. He is,
                therefore, not included in the demand for Ferraris.
            </Text>
            <Text>
                Freddy has the ability to pay for a Kia, but does not have the willingness to buy a Kia. He is,
                therefore, not included in the demand for Kias.
            </Text>

            <Divider my="sm" />

            <Title order={2}>Law of Demand</Title>
            <Text>
                The Law of Demand is a simple concept: as the price of a good or service increases, the quantity
                demanded decreases, all other things being equal. Think of it like a game of tug-of-war between
                price and desire. When prices climb higher, people generally buy less.
            </Text>
            <Text>
                A price schedule is a table that shows the relationship between the price of a good and the
                quantity demanded at that price. It&apos;s like a menu for consumers, outlining their options based on
                cost.
            </Text>
            <Text>
                The Law of Demand reflects the relationship between price and quantity demand. The graph
                demonstrates how quantity demanded changes as price changes.
            </Text>

            <Divider my="sm" />

            <Title order={2}>Shifts in the Demand Curve</Title>
            <Text>
                The demand curve shows the relationship between the price of a good and the quantity
                demanded. However, it&apos;s important to remember that this relationship is based on the assumption
                that all other factors remain constant. When these other factors change, the entire demand curve
                shifts.
            </Text>
            <Text>
                <strong>What can shift the demand curve?</strong>
            </Text>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>Consumer income:</strong> An increase in income typically leads to an increase in demand for
                    normal goods, shifting the demand curve to the right. Conversely, a decrease in income
                    can lead to a decrease in demand, shifting the curve to the left.
                </Text>
                <Text>
                    Example: If people get raises, they might buy more expensive smartphones.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Consumer preferences:</strong> Changes in tastes or preferences can affect demand. If a product
                    becomes more popular, demand increases, shifting the curve to the right.
                </Text>
                <Text>
                    Example: If there&apos;s a sudden trend for veganism, demand for plant-based products
                    will rise.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Prices of related goods:</strong> The demand for a good can be influenced by the prices of
                    related goods.
                </Text>
                <List>
                    <ListItem>
                    <Text>
                        <strong>Complements:</strong> Goods used together (like peanut butter and jelly). If the price of
                        jelly rises, demand for peanut butter might decrease, shifting the curve to the left.
                    </Text>
                    </ListItem>
                    <ListItem>
                    <Text>
                        <strong>Substitutes:</strong> Goods that can be used in place of each other (like Coke and Pepsi).
                        If the price of Coke increases, demand for Pepsi might increase, shifting the
                        demand curve to the right.
                    </Text>
                    </ListItem>
                </List>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Expectations about future prices:</strong> If consumers expect the price of a good to increase in
                    the future, they might buy more of it now, shifting the demand curve to the right.
                </Text>
                <Text>
                    Example: If people anticipate a gas shortage, they might fill up their tanks now,
                    increasing demand for gasoline.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Population:</strong> An increase in population generally leads to an increase in demand for most
                    goods, shifting the demand curve to the right.
                </Text>
                </ListItem>
            </List>
            <Text>
                Remember, a shift in the demand curve represents a change in the quantity demanded at every
                price level. This is different from a movement along the demand curve, which occurs when the
                price of the good itself changes.
            </Text>

            <Divider my="sm" />

            <Text>
                This graph provides an example of when the demand curve shifts right. This could happen
                because:
            </Text>
            <List withPadding>
                <ListItem>
                <Text>
                    Consumer income has increased, leading to higher demand for the product.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    The price of a complementary good has decreased, making the product more desirable.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    Consumer preferences have shifted in favor of the product, perhaps due to a successful
                    advertising campaign.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    The population has grown, increasing the overall number of potential consumers.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    Consumers expect the price of the product to increase in the future.
                </Text>
                </ListItem>
            </List>

            <Divider my="sm" />
            <MultipleChoiceQuestions />
            <Space h="md" />
            <Title>Application Questions</Title>
            <Question1 />
            <Question2 /> 
            <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 2</Button></Center>
            </Paper>
        </Container>

        </NavBarTemplate>
    );
};

export default Unit3Lesson1;
