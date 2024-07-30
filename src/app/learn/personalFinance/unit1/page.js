"use client";
import { useState } from 'react';
import { Stepper, Grid, Center, Space } from '@mantine/core';
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { useRouter } from 'next/navigation';
import { HeroImageBackground } from '@/components/Header/HeaderAurora';
import ModulesProgressCard from '@/components/General/ModulesProgressCard';
const Unit1 = () => {
  const router = useRouter();
  const [hoveredStep, setHoveredStep] = useState(-1);

  const navigateToStep = (step) => {
    switch(step) {
      case 1:
        router.push('/learn/personalFinance/unit1/lesson2');
        break;
      case 2:
        router.push('/learn/personalFinance/unit1/lesson3');
        break;
      default:
        router.push('/learn/personalFinance/unit1/lesson1');
    }
  };

  const handleMouseEnter = (step) => {
    setHoveredStep(step);
  };

  const handleMouseLeave = () => {
    setHoveredStep(-1);
  };

  return (
    <NavBarTemplate>
      <HeroImageBackground path={'/learn/personalFinance/unit1/lesson1'}/>
      <Space h="lg" />
        <Grid>
            <Grid.Col span={6}>
              <ModulesProgressCard />
            </Grid.Col>
            <Grid.Col span={6}>
              <Center>
                <Stepper 
                orientation="vertical" 
                iconSize={32} 
                active={hoveredStep}
                onStepClick={navigateToStep}
              >
                  <Stepper.Step 
                    label="Lesson 1" 
                    description="First step description"
                    onMouseEnter={() => handleMouseEnter(0)}
                    onMouseLeave={handleMouseLeave}
                  >
                  </Stepper.Step>
                  <Stepper.Step 
                    label="Lesson 2" 
                    description="Second step description"
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                  >
                  </Stepper.Step>
                  <Stepper.Step 
                    label="Lesson 3" 
                    description="Third step description"
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                  >
                  </Stepper.Step>
                </Stepper>
              </Center>
              
            </Grid.Col>
          

        </Grid>
        
    </NavBarTemplate>
  );
};

export default Unit1;
