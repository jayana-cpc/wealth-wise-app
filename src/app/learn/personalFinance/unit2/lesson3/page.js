"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, List, ListItem, Center, Button } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';

const Unit2Lesson3 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit2/lesson4');
    };

    return (
        <NavBarTemplate>
        <Container>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Unit 2.3 - The W-4 Form</Title></Center>

            <Divider my="sm" />

            <Title order={2}>Understanding the W-4 Form: Your Guide to Tax Withholding</Title>
            
            <Text>
                <strong>What is the W-4 Form?</strong>
            </Text>
            <Text>
                The W-4 form, officially titled &quot;Employee&apos;s Withholding Certificate,&quot; is a critical document that
                employees complete when starting a new job or when their tax situation changes. It provides
                essential information to your employer, helping them determine how much federal income tax to
                withhold from your paycheck. By accurately completing the W-4, you ensure that your tax
                withholdings align closely with your actual tax liability, minimizing the likelihood of owing
                taxes or receiving a large refund at tax time.
            </Text>

            <Divider my="sm" />

            <Title order={2}>Why is the W-4 Important?</Title>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>Avoiding Underpayment Penalties:</strong> If too little tax is withheld throughout the year, you
                    may owe additional taxes when you file your tax return, potentially incurring penalties.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Receiving a Refund:</strong> If too much tax is withheld, you receive a refund after filing your
                    tax return, which could have been managed better throughout the year, potentially leading
                    to missed investment opportunities.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Optimizing Your Finances:</strong> The W-4 allows you to balance your tax obligations with
                    your cash flow needs, ensuring you have enough take-home pay while meeting your tax
                    responsibilities. This can help you plan for expenses and savings goals more effectively.
                </Text>
                </ListItem>
            </List>

            <Divider my="sm" />

            <Title order={2}>Key Components of the W-4 Form</Title>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>Personal Information:</strong> This includes your name, Social Security number, and filing
                    status (single, married filing jointly, married filing separately, head of household, or
                    qualifying widow(er)).
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Allowances:</strong> While previously used to determine withholding amounts, allowances are
                    no longer the primary method. Instead, the IRS recommends using the tax tables for more
                    accurate withholding.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Multiple Jobs or Spouse Works:</strong> If you or your spouse have multiple jobs, you may
                    need to adjust your withholding to prevent under- or over-withholding. The IRS provides
                    worksheets and an online calculator to help determine the correct withholding amount for
                    each job.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Deductions and Credits:</strong> You can adjust your withholding by claiming deductions (like
                    student loan interest, IRA contributions, or mortgage interest) and credits (like the Child
                    Tax Credit or Earned Income Tax Credit) that you expect to qualify for during the tax
                    year.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Additional Income:</strong> If you have income from sources other than your primary job, such
                    as freelance work, rental property, or self-employment, you may need to adjust your
                    withholding to account for this additional income.
                </Text>
                </ListItem>
            </List>

            <Divider my="sm" />

            <Title order={2}>How to Complete the W-4</Title>
            <Text>
                The W-4 form includes step-by-step instructions and worksheets to guide you through the
                process of completing it accurately. It&apos;s essential to provide precise information to ensure that
                your employer withholds the correct amount of federal income tax from your paychecks.
            </Text>

            <Divider my="sm" />

            <Title order={2}>Adjusting Your W-4 for Specific Scenarios</Title>
            <Text>
                <strong>Scenario 1: Adjusting Your W-4 After Marriage and Dual Income</strong>
            </Text>
            <Text>
                If you recently got married and both you and your spouse work, you should adjust your W-4 to reflect your new marital
                status and combined income. To optimize your tax withholdings:
            </Text>
            <List withPadding>
                <ListItem>Change your filing status to &quot;Married filing jointly&quot; on both of your W-4 forms.</ListItem>
                <ListItem>Use the IRS Multiple Jobs Worksheet to determine the appropriate withholding amount for each job.</ListItem>
                <ListItem>Consider claiming additional allowances if you have significant deductions or credits, but be cautious to avoid underpayment penalties.</ListItem>
            </List>

            <Divider my="sm" />

            <Text>
                <strong>Scenario 2: Completing the W-4 for a Part-Time Job</strong>
            </Text>
            <Text>
                If you have a part-time job in addition to your full-time employment, you should complete a separate W-4 form for each job. To avoid
                over withholding on your part-time job:
            </Text>
            <List withPadding>
                <ListItem>Claim a higher number of allowances on the W-4 for your part-time job.</ListItem>
                <ListItem>Use the IRS Multiple Jobs Worksheet to determine the correct withholding amount for each job.</ListItem>
                <ListItem>Review your withholding periodically to ensure it aligns with your overall tax situation.</ListItem>
            </List>

            <Divider my="sm" />

            <Text>
                <strong>Scenario 3: Adjusting Your W-4 for Expected Child and Medical Expenses</strong>
            </Text>
            <Text>
                If you are expecting a child or anticipate significant medical expenses, you may be able to adjust your W-4 to
                potentially reduce your tax withholdings. However, it&apos;s essential to avoid underpaying your
                taxes.
            </Text>
            <List withPadding>
                <ListItem>Claim additional allowances on your W-4, but be cautious not to claim too many.</ListItem>
                <ListItem>Consider itemizing deductions on your tax return if your medical expenses exceed a certain percentage of your adjusted gross income.</ListItem>
                <ListItem>Use the IRS Withholding Calculator to determine the appropriate number of allowances based on your specific situation.</ListItem>
            </List>

            <Text>
                Remember, the W-4 is an estimate, and life circumstances can change. It&apos;s essential to review
                your W-4 periodically to ensure it accurately reflects your tax situation and avoid potential tax
                problems.
            </Text>
            <Divider my="sm" />

            <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 4</Button></Center>
            </Paper>
        </Container>
        </NavBarTemplate>
    );
};

export default Unit2Lesson3;
