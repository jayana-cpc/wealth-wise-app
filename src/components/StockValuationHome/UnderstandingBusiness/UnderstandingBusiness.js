import React from 'react';
import { Title, Center, Text, Button } from '@mantine/core';
import { StockDescription } from './StockDescription';
import { ValProposition } from './ValProposition';
import { IndustryIdentify } from './IndustryIdentify';
import { ForceDropdown } from './ForceDropdown';
import '@/components/StockValuationHome/UnderstandingBusiness/NewsDisplay.module.css'
import { NewsDisplay } from './NewsDisplay';
import { useRouter } from 'next/navigation';


export function UnderstandingBusiness() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/portfolioAdvisor/portfolioCustomization');
      };

    return(
        <div>
            <Center><Title>Understanding the Business</Title></Center>
            <Center><Text>Stock Description</Text></Center>
            <Center><StockDescription /></Center>
            <Center><Text>Value Proposition</Text></Center>
            <Center><ValProposition /></Center>
            <Center><Text>Industry Identify</Text></Center>
            <Center><IndustryIdentify /></Center>
            <Center><Text>Force Dropdown</Text></Center>
            <Center><ForceDropdown /></Center>
            <Center><Text>News Display</Text></Center>
            <Center><NewsDisplay /></Center>
            <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={handleButtonClick}>Continue</Button></Center>

        </div>
    );
    
}