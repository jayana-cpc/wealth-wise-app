import { Center, Title, Button } from "@mantine/core";
import { PEGrowth } from "./PEtoGrowth";
import { PricetoBook } from "./PricetoBook";
import { PricetoSales } from "./PricetoSales";
import { useRouter } from 'next/navigation';

export function EquityValueMultiples() {
    const router = useRouter();
    const continueButton = () => {
        router.push('/learn/stockValuation/discountedCashflowValuation');
      };
    return(
        <>
            <Center><Title>Equity Value Multiples</Title></Center>
            <Center><PEGrowth /></Center>
            <Center><PricetoBook /></Center>
            <Center><PricetoSales /></Center>
            <Center><Button onClick={continueButton}>Continue</Button></Center>

        </>
    );
    
}