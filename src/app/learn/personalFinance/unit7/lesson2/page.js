"use client";
import React from "react";
import {
  Container,
  Title,
  Text,
  Divider,
  Paper,
  Center,
  Space,
  List,
  ListItem,
} from "@mantine/core";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { HomeownersInsurance } from "@/components/Learn/PersonalFinanceHome/Unit7/Lesson2/Question1";
import { RentersInsurance } from "@/components/Learn/PersonalFinanceHome/Unit7/Lesson2/Question2";
import { ExtendedWarranties } from "@/components/Learn/PersonalFinanceHome/Unit7/Lesson2/Question3";
import Breadcrumbs from "@/components/General/Breadcrumbs";
const Unit7Lesson2 = () => {
  return (
    <NavBarTemplate>
      <Center>
        <Breadcrumbs
          prevRoute="/learn/personalFinance/unit7/lesson1"
          nextRoute="/learn/personalFinance"
        />
      </Center>

      <Container>
        <Paper shadow="sm" p="md">
          <Center>
            <Title order={1}>Unit 7.2 - Warranty</Title>
          </Center>
          <Divider my="sm" />
          <Title order={2}>
            Insurance: Safeguarding Against Unpredictable Events
          </Title>
          <Text>
            Insurance is designed to protect individuals from financial losses
            that can arise from unforeseen events such as accidents, natural
            disasters, or other significant disruptions. Most consumers secure
            home and car insurance policies to safeguard their property and
            vehicle. For instance, if a severe storm damages your home, your
            homeowners insurance will cover repairs or rebuilding costs.
            Similarly, if you are involved in a car accident, your auto
            insurance can help pay for damages and medical expenses.
          </Text>
          <Text>
            Homeowners Insurance, as we discussed in the previous section,
            typically covers the structure of your home, your personal
            belongings, and liability for accidents that occur on your property.
            For example, if a fire destroys part of your home, your homeowners
            insurance will help pay for repairs. Additionally, if a guest is
            injured on your property, liability coverage can help cover their
            medical expenses and legal costs.
          </Text>
          <Text>
            Auto Insurance provides coverage for damage to your vehicle and
            liability for injuries or damages caused to others. If your car is
            stolen or involved in a collision, auto insurance will help cover
            repair costs or replacement. Liability coverage can also help pay
            for medical expenses and property damage if you are at fault in an
            accident.
          </Text>
          <Divider my="sm" />
          <Title order={2}>Insurance Deductibles</Title>
          <Text>
            A deductible is the amount you pay out-of-pocket for covered
            expenses before your insurance policy starts to cover the remaining
            costs. For example, if you have a $1,000 deductible on your car
            insurance, you must pay the first $1,000 of repair costs yourself
            before your insurance covers the rest.
          </Text>
          <List withPadding>
            <ListItem>
              <strong>Understand What a Deductible Is:</strong> A deductible is
              the amount you pay out-of-pocket for covered expenses before your
              insurance policy starts to cover the remaining costs.
            </ListItem>
            <ListItem>
              <strong>Determine Your Insurance Needs:</strong> Evaluate your
              risks and assess your financial situation to decide whether a
              higher or lower deductible is more appropriate for your financial
              situation.
            </ListItem>
            <ListItem>
              <strong>Compare Deductible Options:</strong> Shop around and
              balance premiums and deductibles to find a balance that aligns
              with your financial comfort level and risk tolerance.
            </ListItem>
          </List>
          <Divider my="sm" />
          <Title order={2}>
            Extended Warranties: Protecting Against Wear and Tear
          </Title>
          <Text>
            In addition to insurance, extended warranties (or service contracts)
            offer protection against the wear and tear of everyday items such as
            cars and home appliances. Extended warranties cover repairs or
            replacements that are not typically included in standard insurance
            policies. For instance, if your dishwasher breaks down after the
            manufacturer&rsquo;s warranty has expired, an extended warranty
            might cover the repair costs.
          </Text>
          <Text>
            Extended Warranties are offered by various providers and can be
            purchased for a range of items, from vehicles to household
            appliances. These warranties often come with a set of conditions and
            exclusions. For example, a service contract might cover the cost of
            replacing a car&apos;s brakes, but if the brakes wear out due to
            neglect or improper maintenance, the warranty might not cover the
            repair.
          </Text>
          <Text>
            When considering an extended warranty, it is essential to evaluate
            the provider&rsquo;s reputation and the specific terms of the
            contract. Some contracts might have hidden fees or conditions that
            could affect their value. For instance, a provider might require a
            deductible each time service is rendered, reducing the overall
            benefit of the warranty.
          </Text>
          <Divider my="sm" />
          <Title order={2}>Self-Insurance: An Alternative Approach</Title>
          <Text>
            An alternative to purchasing an extended warranty is self-insuring,
            which involves setting aside money in an emergency fund instead of
            paying for a service contract. By building a savings buffer, you can
            cover potential repair costs without the added expense of a
            warranty. For example, if you set aside $1,200 annually for car
            maintenance and repairs, you could use this fund to address issues
            as they arise rather than paying for an extended warranty.
          </Text>
          <Text>
            Self-insurance can be more cost-effective if you maintain your
            appliances and vehicles well, resulting in fewer repairs.
            Additionally, any unused funds can contribute to future purchases or
            investments. However, this approach requires discipline in saving
            and a willingness to handle repair costs out of pocket when they
            arise.
          </Text>
          <Divider my="sm" />
          <Title order={2}>Evaluating Extended Warranties</Title>
          <Text>
            When deciding whether to purchase an extended warranty, consider
            both the potential benefits and drawbacks:
          </Text>
          <Text>
            <strong>Benefits:</strong>
          </Text>
          <List withPadding>
            <ListItem>
              <strong>Peace of Mind:</strong> An extended warranty provides
              reassurance by transferring some of the risk associated with
              repairs to the provider.
            </ListItem>
            <ListItem>
              <strong>Convenience:</strong> The warranty provider typically
              handles finding and paying for repair services, saving you time
              and effort.
            </ListItem>
            <ListItem>
              <strong>Potential Savings:</strong> If you encounter a major
              repair covered by the warranty, you could save money compared to
              paying for the repair out of pocket.
            </ListItem>
          </List>
          <Text>
            <strong>Costs:</strong>
          </Text>
          <List withPadding>
            <ListItem>
              <strong>Maintenance Standards:</strong> Warranty providers often
              have strict maintenance requirements. If these are not met, the
              provider might deny coverage.
            </ListItem>
            <ListItem>
              <strong>Double Coverage:</strong> Many new cars and appliances
              come with manufacturer warranties or credit card benefits that
              already cover repairs. Purchasing an extended warranty in addition
              to these may result in paying for redundant coverage.
            </ListItem>
            <ListItem>
              <strong>Limited Choice of Service Providers:</strong> Extended
              warranties usually require you to use specific repair services.
            </ListItem>
            <ListItem>
              <strong>Waiting Periods:</strong> Service contracts can sometimes
              involve lengthy repair processes, with some users experiencing
              delays or repeated attempts to complete repairs correctly.
            </ListItem>
          </List>
          <Text>
            The general rule is: For inexpensive items or those with a low
            likelihood of failure, such as basic household tools, an extended
            warranty may not be cost-effective. For instance, a $50 blender
            might not justify the cost of a warranty if its repair or
            replacement cost is minimal compared to the warranty price.
          </Text>
          <Divider my="sm" />
          <Title order={2}>Understanding Costs and Value</Title>
          <Text>
            It is important to be aware that some extended warranties may
            involve additional costs such as deductibles or fees. Additionally,
            if the warranty provider goes out of business, you might lose the
            protection you paid for. For example, a 2014 Consumer Reports survey
            found that 55% of extended warranty users did not use their
            contracts for repairs, potentially indicating a lack of value for
            the cost.
          </Text>
          <Text>
            Consider the cost of an extended warranty versus self-insuring. For
            instance, if the average cost of an extended car warranty is $1,214
            and the median amount received in repairs is $837, you might end up
            paying more for the warranty than you would have spent on repairs.
          </Text>
          <Space h="md" />
          <Divider my="sm" />
          <HomeownersInsurance />
          <RentersInsurance />
          <ExtendedWarranties />
          <Center>
            <Breadcrumbs
              prevRoute="/learn/personalFinance/unit7/lesson1"
              nextRoute="/learn/personalFinance"
            />
          </Center>
        </Paper>
      </Container>
    </NavBarTemplate>
  );
};

export default Unit7Lesson2;
