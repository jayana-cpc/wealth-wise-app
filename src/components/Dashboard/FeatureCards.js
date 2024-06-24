import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  Button,
  rem
} from "@mantine/core"
import {
  IconGauge,
  IconCookie,
  IconUser,
  IconMessage2,
  IconLock
} from "@tabler/icons-react"
import classes from "./FeatureCards.module.css"

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: "Stock Valuation Course",
    buttonLabel: "Learn More"
  },
  {
    icon: IconUser,
    title: "Stock Recommendation Survey",
    buttonLabel: "Learn More"
  },
  {
    icon: IconCookie,
    title: "Catch Up on NEws",
    buttonLabel: "Learn More"
  },
  {
    icon: IconLock,
    title: "Portfolio Customization",
    buttonLabel: "Learn More"
  },
  {
    icon: IconMessage2,
    title: "Wealth Wise Portfolio Advisor",
    buttonLabel: "Learn More"
  }
]

export function Feature({ icon: Icon, title, buttonLabel }) {
  return (
    <div className={classes.feature}>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7} className={classes.featureTitle}>
        {title}
      </Text>
      <Button variant="outline" className={classes.featureButton}>
        {buttonLabel}
      </Button>
    </div>
  )
}

export function FeatureCards() {
  const features = MOCKDATA.map((feature, index) => (
    <Feature {...feature} key={index} />
  ))

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>
        Learn Features
      </Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          Build Financial Literacy
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 2, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 100 }}
        verticalSpacing={{ base: "xl", md: 200 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  )
}