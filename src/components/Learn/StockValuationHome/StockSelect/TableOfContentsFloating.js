import cx from "clsx"
import { useState } from "react"
import { Box, Text, Group, rem } from "@mantine/core"
import { IconListSearch } from "@tabler/icons-react"
import classes from "./TableOfContentsFloating.module.css"

const links = [
  { label: "Stock Selection", link: "#stock-selection", order: 1 },
  { label: "The 11 GICS Sectors", link: "#11-gics-sectors", order: 1 },
  { label: "Energy Sector", link: "#energy-sector", order: 1 },
  {
    label: "Communication Services Sector",
    link: "#communication-services-sector",
    order: 1
  },
  {
    label: "Consumer Discretionary Sector",
    link: "#consumer-discretionary-sector",
    order: 1
  },
  {
    label: "Consumer Staples Sector",
    link: "#consumer-staples-sector",
    order: 1
  },
  { label: "Financials Sector", link: "#financials-sector", order: 1 },
  { label: "Healthcare Sector", link: "#healthcare-sector", order: 1 },
  { label: "Industrials Sector", link: "#industrials-sector", order: 1 },
  { label: "Real Estate Sector", link: "#real-estate-sector", order: 1 },
  { label: "Technology Sector", link: "#technology-sector", order: 1 },
  { label: "Utilities Sector", link: "#utilities-sector", order: 1 },
  {
    label: "Personalization Survey",
    link: "#personalization-survey",
    order: 1
  },
  { label: "Select a Company to Analyze", link: "#select-company", order: 1 }
]

export function TableOfContentsFloating() {
  const [active, setActive] = useState(0)

  const items = links.map((item, index) => (
    <Box
      component="a"
      href={item.link}
      onClick={event => {
        event.preventDefault()
        setActive(index)
      }}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: active === index })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Box>
  ))

  return (
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
        />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`
          }}
        />
        {items}
      </div>
    </div>
  )
}
