"use client";
import React from 'react';
import { Container, Title, Text, Divider, Paper, List, ListItem, Center, Button, Space } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson4/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit2/Lesson4/Question2';

const Unit2Lesson4 = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit2/lesson5');
    };

    return (
        <NavBarTemplate>
        <Container>
            <Paper shadow="sm" p="md">
            <Center><Title order={1}>Unit 2.4 - The W-2 Form</Title></Center>

            <Divider my="sm" />

            <Title order={2}>Understanding the W-2 Form: Your Annual Tax Summary</Title>
            
            <Text>
                <strong>What is the W-2 Form?</strong>
            </Text>
            <Text>
                A W-2 is an annual tax form provided by your employer that summarizes your earnings and the
                taxes withheld from your paycheck for the previous year. It&apos;s a crucial document for accurately
                filing your income tax return.
            </Text>

            <Divider my="sm" />

            <Title order={2}>The Importance of the W-2</Title>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>Tax Compliance:</strong> The W-2 provides critical information for completing your tax return.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Income Verification:</strong> It serves as a record of your earnings for the previous year.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Tax Refund or Payment:</strong> The information on the W-2 helps determine whether you&apos;ll receive a tax refund or owe additional taxes.
                </Text>
                </ListItem>
            </List>

            <Divider my="sm" />

            <Title order={2}>Key Components of a W-2</Title>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>Employee Information:</strong> Your name, Social Security number, and address.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Employer Information:</strong> Your employer&apos;s name, address, and Employer Identification Number (EIN).
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Wages and Tips:</strong> Total amount of wages and tips earned during the year.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Federal Income Tax Withheld:</strong> The amount of federal income tax withheld from your paycheck.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Social Security and Medicare Taxes:</strong> Amounts withheld for Social Security and Medicare.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>State and Local Taxes:</strong> If applicable, the amount of state and local taxes withheld.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Other Information:</strong> Box 12 may contain codes for specific types of income or deductions.
                </Text>
                </ListItem>
            </List>

            <Divider my="sm" />

            <Title order={2}>Obtaining Your W-2</Title>
            <Text>
                Your employer is required to provide you with your W-2 by January 31st of the following year.
            </Text>
            <Text>
                <strong>What to do if you don&apos;t receive your W-2:</strong>
            </Text>
            <List withPadding>
                <ListItem>Contact your employer&apos;s payroll or human resources department to inquire about the status of your W-2.</ListItem>
                <ListItem>Use your pay stubs to estimate your income and taxes withheld to file a preliminary tax return.</ListItem>
                <ListItem>File a Form 4852, Substitute for Form W-2, to report your income and taxes if you are unable to obtain your W-2.</ListItem>
                <ListItem>Contact the IRS for assistance if you have exhausted all other options.</ListItem>
            </List>

            <Divider my="sm" />

            <Title order={2}>Information Needed to Complete Form 4852</Title>
            <List withPadding>
                <ListItem>Your Social Security number</ListItem>
                <ListItem>Your employer&apos;s name, address, and Employer Identification Number (EIN)</ListItem>
                <ListItem>Your total wages and tips</ListItem>
                <ListItem>Federal income tax withheld</ListItem>
                <ListItem>Social Security and Medicare taxes withheld</ListItem>
                <ListItem>State and local income taxes withheld (if applicable)</ListItem>
            </List>

            <Divider my="sm" />

            <Title order={2}>Completing Form 4852</Title>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>Basic Information:</strong> Fill in your name, address, Social Security number, and the tax year for which you are filing.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Employer Information:</strong> Enter your employer&apos;s name, address, and Employer Identification Number (if known).
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Wages and Taxes:</strong> Report your wages, tips, and the amount of federal, state, and local income taxes withheld.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>Additional Information:</strong> Complete any additional sections of the form, such as information about retirement plan distributions, if applicable.
                </Text>
                </ListItem>
            </List>
            <Text>
                Note: It&apos;s essential to estimate your income and taxes as accurately as possible. You may need to refer to your pay stubs to gather the necessary information.
            </Text>
            <Text>
                Attach Form 4852 to your tax return. The IRS will use the information on Form 4852 to process your return.
            </Text>

            <Divider my="sm" />

            <Title order={2}>Differences Between the W-4 Form and the W-2 Form</Title>
            <List withPadding>
                <ListItem>
                <Text>
                    <strong>W-4 Form:</strong> Provides instructions to your employer on how much federal income tax to withhold from your paycheck.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>W-2 Form:</strong> Summarizes your earnings and the taxes withheld from your paycheck for the previous year.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>W-4 Form:</strong> Filled out by the employee and completed when starting a new job or when your tax situation changes significantly.
                </Text>
                </ListItem>
                <ListItem>
                <Text>
                    <strong>W-2 Form:</strong> Provided by your employer and received by January 31st of the following year.
                </Text>
                </ListItem>
            </List>
            <Text>
                In essence:
            </Text>
            <List withPadding>
                <ListItem>The W-4 is a forward-looking document that tells your employer how to withhold taxes in the future.</ListItem>
                <ListItem>The W-2 is a backward-looking document that summarizes what happened in the past year.</ListItem>
            </List>

            <Divider my="sm" />
            <Question1 />
            <Question2 />
            <Divider my="sm" />

            <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>Lesson 5</Button></Center>
            </Paper>
        </Container>
        </NavBarTemplate>
    );
};

export default Unit2Lesson4;
