"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, Center, Space, List, ListItem, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { InsuranceGrid } from '@/components/Learn/PersonalFinanceHome/Unit7/Lesson1/InsuranceGrid'; // Ensure the path is correct

const Unit7Lesson1 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit7/lesson2');
    };

    return (
        <NavBarTemplate>
            <Container>
                <Paper shadow="sm" p="md">
                    <Center><Title order={1}>Unit 7.1 - Renter & Homeowners Insurance</Title></Center>
                    <Divider my="sm" />
                    <Title order={2}>Property and Casualty Insurance</Title>
                    <Text>
                        Property Insurance covers physical assets like homes and cars, while Casualty Insurance deals with liability risks, protecting against legal claims. Property insurance can include homeowners and renters policies, which cover losses to buildings and personal property. Casualty insurance, on the other hand, provides protection against legal claims and liability issues.
                    </Text>
                    <Text>
                        For instance, if a visitor slips on ice on your front steps and sustains an injury, your homeowners insurance can cover the medical expenses and legal costs if the visitor sues. Similarly, if a baseball thrown by children playing in your yard shatters a neighbor&rsquo;s window, your homeowners insurance liability coverage can help pay for the repair costs.
                    </Text>
                    <Divider my="sm" />
                    <Title order={2}>Homeowners Insurance</Title>
                    <Text>
                        Homeowners insurance is a crucial protection for anyone who owns a home. It typically covers various aspects, including:
                    </Text>
                    <List withPadding>
                        <ListItem>Dwelling Coverage: Protects the structure of your home.</ListItem>
                        <ListItem>Personal Property Coverage: Covers the contents of your home, like furniture and electronics.</ListItem>
                        <ListItem>Liability Coverage: Provides financial protection if someone is injured on your property or if you are found legally responsible for damage to someone else&apos;s property.</ListItem>
                        <ListItem>Medical Payments Coverage: Covers minor medical expenses for guests injured on your property.</ListItem>
                    </List>
                    <Text>
                        For example, if a fire damages your home, homeowners insurance will help cover the costs of repairs or rebuilding. Additionally, if a visitor falls and injures themselves, medical payments coverage can help cover their medical bills up to a specified limit, often around $5,000. Should these expenses exceed that limit, your liability coverage may cover the remaining costs.
                    </Text>
                    <Text>
                        Homeowners policies can also include optional riders for high-value items, such as jewelry or art collections, and coverage for events like sewer backups. It is important to review your policy to understand what is covered and to consider additional protection for valuable assets.
                    </Text>
                    <Divider my="sm" />
                    <Title order={2}>Renters Insurance</Title>
                    <Text>
                        Unlike homeowners insurance, renters insurance does not cover the building itself&mdash;since the tenant does not own it&mdash;but it does protect personal property and provides liability coverage for renters. For example, if a fire or theft damages or destroys your belongings in a rented apartment, renters insurance can help cover the cost of replacing those items.
                    </Text>
                    <Text>
                        Renters insurance is particularly valuable for students living in dorms or off-campus housing. Often, a student&apos;s personal property may be covered under their parents&apos; homeowners policy, but this coverage can vary. Therefore, it is crucial to verify with the insurance provider to ensure adequate protection.
                    </Text>
                    <Text>
                        Renters insurance also covers personal belongings anywhere in the world if they are lost or stolen, though it typically does not cover certain perils like floods or earthquakes. It provides a safety net, offering financial protection and covering liability claims, similar to homeowners insurance.
                    </Text>
                    <Divider my="sm" />
                    <Title order={2}>Insurance Companies and Risk Management</Title>
                    <Text>
                        Insurance companies play a key role in risk management by assessing risks and setting premiums accordingly. Actuaries calculate the likelihood of different risks occurring, such as damage from natural disasters or accidents. Based on these calculations, underwriters evaluate the risk profiles of individual applicants and properties to determine appropriate premiums.
                    </Text>
                    <Text>
                        When assessing a property, underwriters consider factors like its location, construction type, and proximity to emergency services like fire hydrants. For personal insurance applicants, factors such as past claims, previous insurance coverage, and credit history are evaluated.
                    </Text>
                    <Text>
                        Insurance companies often provide discounts for bundling multiple policies, such as combining renters or homeowners insurance with auto insurance. It is beneficial to shop around and compare different options to find the best coverage and rates.
                    </Text>
                    <Divider my="sm" />
                    <Space h="md" />
                    <Title>Insurance Activity</Title>
                    <InsuranceGrid />

                    <Divider my="sm" />
                    <Space h="md" />
                    <Title order={2}>Policyholder Information</Title>
                    <List withPadding>
                        <ListItem><strong>Who&apos;s Covered:</strong> This section tells you whose property is insured. It includes your name and address.</ListItem>
                        <ListItem><strong>Policy Number:</strong> This is a unique identifier for your policy. Keep it handy for contacting your insurance company.</ListItem>
                    </List>
                    <Divider my="sm" />
                    <Title order={2}>Policy Period</Title>
                    <Text>
                        This section outlines the dates your policy is in effect. It has a start date (when the policy begins) and an expiration date (when it ends).
                    </Text>
                    <Divider my="sm" />
                    <Title order={2}>Coverages, Limits, and Premiums</Title>
                    <Text>
                        This is the heart of the declaration page. It lists the different types of coverage you have and how much the insurance company will pay out for each type of loss.
                    </Text>
                    <List withPadding>
                        <ListItem><strong>Coverage A: Dwelling:</strong> This covers the structure of your home (walls, roof, etc.) up to a specific amount, called the limit.</ListItem>
                        <ListItem><strong>Coverage B: Other Structures:</strong> This covers structures on your property that aren&apos;t attached to your home, like a detached garage or shed.</ListItem>
                        <ListItem><strong>Coverage C: Personal Property:</strong> This covers your belongings inside your home, such as furniture, electronics, and clothing.</ListItem>
                        <ListItem><strong>Coverage D: Loss of Use:</strong> If your home becomes uninhabitable due to a covered loss (like a fire), this coverage helps pay for additional living expenses.</ListItem>
                        <ListItem><strong>Coverage E: Personal Liability:</strong> This protects you financially if someone is injured on your property or you damage someone else&apos;s property.</ListItem>
                        <ListItem><strong>Coverage F: Medical Payments to Others:</strong> This covers medical expenses for people injured on your property, regardless of who is at fault.</ListItem>
                    </List>
                    <Text>
                        <strong>Limits:</strong> This is the maximum amount the insurance company will pay for a loss under each coverage.
                    </Text>
                    <Text>
                        <strong>Premiums:</strong> This is the amount you pay for your insurance coverage. Think of it as the cost of your policy.
                    </Text>
                    <Divider my="sm" />
                    <Title order={2}>Additional Coverages and Discounts</Title>
                    <Text>
                        This section lists any additional coverage you&apos;ve purchased, like coverage for jewelry or specific types of equipment.
                    </Text>
                    <Text>
                        If you qualify for discounts (like having a security system or bundling your home and auto insurance), they&apos;ll be listed here.
                    </Text>
                    <Divider my="sm" />
                    <Title order={2}>Total Policy Premium</Title>
                    <Text>
                        This is the total amount you&apos;ll pay for your insurance policy for the entire year.
                    </Text>
                    <Space h="md" />
                    <Divider my="sm" />

                    <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 2</Button></Center>
                </Paper>
            </Container>
        </NavBarTemplate>
    );
};

export default Unit7Lesson1;
