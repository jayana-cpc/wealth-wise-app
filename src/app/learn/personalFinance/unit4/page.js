"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, Center } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';

const Unit4 = () => {
    return (
        <NavBarTemplate>
        <Container>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Welcome to Unit Four - Saving!</Title></Center>

            <Divider my="sm" />    
            <Text>
                In this unit, we&apos;ll explore how to maximize the use of disposable income through effective budgeting strategies and understand the impact of different financial choices on your overall financial health. 
                Let&apos;s dive into how you can manage and allocate your income wisely to meet your financial goals.

            </Text>
            
            </Paper>
        </Container>
        </NavBarTemplate>
    );
};

export default Unit4;
