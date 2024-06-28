import {
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Anchor,
    Group,
    useMantineTheme
  } from "@mantine/core"
  import {
    IconCreditCard,
    IconBuildingBank,
    IconRepeat,
    IconReceiptRefund,
    IconReceipt,
    IconReceiptTax,
    IconReport,
    IconCashBanknote,
    IconCoin
  } from "@tabler/icons-react"
  import classes from "./ActionsGrid.module.css"
  
  const understandingBusiness = [
    { title: "Credit cards", icon: IconCreditCard, color: "violet" },
    { title: "Banks nearby", icon: IconBuildingBank, color: "indigo" },
    { title: "Transfers", icon: IconRepeat, color: "blue" },
  ]
  const relativeValuation = [
    { title: "Credit cards", icon: IconCreditCard, color: "violet" },
    { title: "Banks nearby", icon: IconBuildingBank, color: "indigo" },
    { title: "Transfers", icon: IconRepeat, color: "blue" },
  ]
  
  export function ActionsGrid() {
    const theme = useMantineTheme()
  
    const understandingBusinessItems = understandingBusiness.map(item => (
      <UnstyledButton key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size="2rem" />
        <Text size="xs" mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    ))
    const relativeValuationItems = relativeValuation.map(item => (
        <UnstyledButton key={item.title} className={classes.item}>
          <item.icon color={theme.colors[item.color][6]} size="2rem" />
          <Text size="xs" mt={7}>
            {item.title}
          </Text>
        </UnstyledButton>
      ))
  
    return (
        <>
            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                <Text className={classes.title}>Understanding the Business</Text>
                <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                    + 
                </Anchor>
                </Group>
                <SimpleGrid cols={3} mt="md">
                    {understandingBusinessItems}
                </SimpleGrid>
            </Card>
            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                <Text className={classes.title}>Realtive Valuation</Text>
                <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
                    + 
                </Anchor>
                </Group>
                <SimpleGrid cols={3} mt="md">
                    {relativeValuationItems}
                </SimpleGrid>
            </Card>
        </>
    )
  }
  