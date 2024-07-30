"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, Center, Space, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/General/Breadcrumbs';
const Unit4Lesson1 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit4/lesson4');
    };

    return (
        <NavBarTemplate>
        <Center><Breadcrumbs prevRoute="/learn/personalFinance/unit4/lesson2" nextRoute="/learn/personalFinance/unit4/lesson4"/></Center>
        <Container>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Unit 4.3 - Fees</Title></Center>
            <Divider my="sm" />
            <Text>
                In managing your budget, meticulous planning ensures every dollar is allocated to specific spending or saving categories. 
                However, even the most well-crafted budget can encounter unexpected expenses like a sudden car repair, appliance breakdown, or other unforeseen costs. 
                These unplanned events can disrupt financial plans, prompting some to dip into savings or utilize a dedicated emergency fund.

            </Text>
            <Space my="md" />
            <Text>
                While unanticipated expenses are unavoidable, fees, on the other hand, are largely preventable. 
                Fees can significantly impact your disposable income, eating into funds that could otherwise be allocated towards essential living expenses or personal goals. 
                These charges include late fees, overdraft fees, over-the-credit-limit fees, and account maintenance fees, often incurred due to mismanagement of bank accounts or credit cards.

            </Text>
            <Space my="md" />
            <Text>
                Using your disposable income to cover fees means those funds are unavailable for other purposes, limiting your financial flexibility and potentially delaying progress towards your financial objectives. 
                Therefore, minimizing fees through responsible financial management not only preserves your disposable income but also ensures it can be effectively utilized towards enhancing your financial well-being and achieving your long-term financial goals.
            </Text>
            <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 4</Button></Center>
            <Space my="md" />

            </Paper>
        </Container>
        </NavBarTemplate>
    );
};

export default Unit4Lesson1;
