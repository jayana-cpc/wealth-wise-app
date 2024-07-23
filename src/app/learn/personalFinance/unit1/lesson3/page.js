"use client";
import { NavBarTemplate } from '@/components/Navbar/NavBarTemplate';
import { Title, Center, Text, Button } from '@mantine/core';
import { Question1 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson3/Question1';
import { Question2 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson3/Question2';
import { Question3 } from '@/components/Learn/PersonalFinanceHome/Unit1/Lesson3/Question3';
import { useRouter } from 'next/navigation';

export default function Unit1Lesson3() {
  const router = useRouter();
  const handleButtonClick = () => {
      router.push('/learn/personalFinance/unit1/lesson4');
  };
  return (
    <div>
      <NavBarTemplate>
        <Center><Title order={1}>Unit 1.3 - Opportunity Cost</Title></Center>
        <Text>
          When you make a decision, you always give up something else. This is known as the opportunity cost.
        </Text>
        <Text>
          Let&rsquo;s use Aaron&rsquo;s Saturday dilemma as an example. Aaron used the PACED decision-making model and chose to work on his assignment instead of going ice skating with Hannah. Why did he choose the assignment? Because it was his best option compared to ice skating, which was his second-best choice.
        </Text>
        <Text>
          The opportunity cost here is the ice skating with Hannah. It&rsquo;s not every other option he didn&rsquo;t choose, but specifically the second-best option he gave up. Aaron only had time for one activity, so he had to pick which one to do.
        </Text>
        <Text>
          Every decision involves an opportunity cost. Sometimes it&rsquo;s minor, like choosing between a blue or green shirt. If you choose the green shirt, the opportunity cost is the blue one. It&rsquo;s a small, low-impact choice.
        </Text>
        <Text>
          But for bigger decisions, the opportunity cost can be significant. For example, if you decide which car to buy, the opportunity cost of choosing Car A is Car B. If you pick Car A for its looks but give up Car B for its reliability, you might face more maintenance issues later. Similarly, choosing a college for its sports team over one with better academics might affect your future career opportunities.
        </Text>
        <Text>
          Understanding opportunity cost helps you weigh your options and make better decisions.
        </Text>
        <Question1 />
        <Question2 />
        <Question3 />
        <Center><Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="compact-md" onClick={handleButtonClick}>Lesson 4</Button></Center>

      </NavBarTemplate>
    </div>
  );
}
