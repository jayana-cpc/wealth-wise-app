import { Title, Center, Button } from "@mantine/core"
import EVtoEBITDA from "./EVtoEBITDA";
import PricetoCashflow from "./PricetoCashflow";
import EVtoSales from "./EVtoSales";
import { useRouter } from 'next/navigation';

export function EnterpriseValueMultiples() {
    const router = useRouter();
    const continueButton = () => {
        router.push('/learn/stockValuation/equityValueMultiples');
      };
    return(
        <>
            <Center><Title>Enterprise Value Multiples</Title></Center>
            <Center><EVtoEBITDA /></Center>
            <Center><PricetoCashflow /></Center>
            <Center><EVtoSales /></Center>
            <Center><Button onClick={continueButton}>Continue</Button></Center>

        
        </>

    );
    
}