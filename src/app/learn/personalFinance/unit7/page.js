"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, Center } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';

const Unit7 = () => {
    return (
        <NavBarTemplate>
        <Container>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Welcome to Unit Seven - Insurance!</Title></Center>

            <Divider my="sm" />    
            <Text>
                Insurance is an essential financial tool designed to protect you from unforeseen losses. The core idea behind insurance is risk management—sharing the financial burden of losses among a larger group of people. This concept is vividly illustrated by the story of Hurricane Sandy in 2012, where over 600,000 homes in New York and New Jersey were severely impacted. Those who had insurance coverage were able to replace their homes and belongings without bearing the full financial cost themselves. This was possible because insurance operates on the principle of pooling premiums from many individuals to cover the losses of a few.
            </Text>
            
            </Paper>
        </Container>
        </NavBarTemplate>
    );
};

export default Unit7;
