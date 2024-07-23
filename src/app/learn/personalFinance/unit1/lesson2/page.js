"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Title, Center, Text, List, ListItem, Button } from '@mantine/core';
import { PACEDModel } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/PACEDTut';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson2/Question3';
import { useRouter } from 'next/navigation';

export default function Unit1Lesson2() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/learn/personalFinance/unit1/lesson3');
    };
    return (
        <div>
        <NavBarTemplate>
            <Center><Title order={2}>Unit 1.2 - PACED Model</Title></Center>
            <Text>
            <b>The PACED Decision-Making Model</b>
            </Text>
            <Text>
            <b>Objective:</b> Learn the PACED model and apply it to financial decisions.
            </Text>
            <Text>
            <b>Content:</b>
            </Text>
            <Text>
            There is decisionmaking, and then there is informed decisionmaking. Informed decisionmaking involves careful analysis. Anyone can make a knee-jerk decision—impulsively buying a used car, aghrily quitting a job after a difficult shift, or carelessly chasing a ball into the street. If the outcome of such a decision is good, it’s only because the person got lucky.
            </Text>
            <Text>
            Informed decisionmaking involves weighing the costs and benefits of alternatives. There are several models you can follow to arrive at a logical decision. Some people weigh the pros and cons of each alternative. Some place a dollar value on each alternative (what the alternative is worth to them) and then compare these prices with the actual prices of the alternatives. Some weigh their options according to criteria that are important in the decision. The latter option can be used to weigh the benefits of choices that don’t necessarily involve a purchase, such as choosing an activity after school, so we will concentrate on that option.
            </Text>
            <Text>
            Before moving on to an example, review the PACED decisionmaking model below. Roll over each step in the process to learn more.
            </Text>
            <Text>
            The PACED model is a structured approach to decisionmaking that helps you make informed and rational choices. Here's how it works:
            </Text>
            <List>
            <ListItem>
                <b>Problem:</b> Clearly define the problem or decision you need to make.
            </ListItem>
            <ListItem>
                <b>Alternatives:</b> Identify the possible options available.
            </ListItem>
            <ListItem>
                <b>Criteria:</b> Establish criteria to evaluate the alternatives.
            </ListItem>
            <ListItem>
                <b>Evaluate:</b> Assess each alternative based on the criteria.
            </ListItem>
            <ListItem>
                <b>Decide:</b> Make the final decision based on the evaluation.
            </ListItem>
            </List>
            <Text>
            <b>Interactive Element:</b>
            </Text>
            <List>
            <ListItem>
                <b>Interactive Tutorial:</b> Follow a step-by-step tutorial where you apply the PACED model to a financial decision. For example, choosing between different credit card offers. Input your problem, alternatives, and criteria into interactive fields. The tutorial will guide you through evaluating each alternative and making your decision, with feedback provided at each step.
            </ListItem>
            </List>
            <PACEDModel />
            <Question1 />
            <Question2 />
            <Question3 />
            <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={handleButtonClick}>Lesson 3</Button></Center>

        </NavBarTemplate>
        </div>
    );
}
