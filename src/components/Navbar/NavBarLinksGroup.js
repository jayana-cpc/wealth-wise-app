
// src/components/Navbar/NavBarLinksGroup.js
import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import Link from 'next/link';
import classes from "./NavbarLinksGroup.module.css";

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((subLink) => (
    <Text
      component="a"
      className={classes.link}
      href={subLink.link}
      key={subLink.label}
    >
      {subLink.label}
    </Text>
  ));

  const content = (
    <UnstyledButton
      className={classes.control}
      onClick={(e) => {
        if (hasLinks) {
          e.preventDefault();
          setOpened((o) => !o);
        }
      }}
    >
      <Group justify="space-between" gap={0}>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <ThemeIcon variant="light" size={24}>
            <Icon style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
          <Box ml="sm" className={classes.label}>
            {label}
          </Box>
        </Box>
        {hasLinks && (
          <IconChevronRight
            className={classes.chevron}
            stroke={1.5}
            style={{
              width: rem(14),
              height: rem(14),
              transform: opened ? "rotate(-90deg)" : "none",
            }}
          />
        )}
      </Group>
    </UnstyledButton>
  );

  return (
    <>
      {link ? (
        <Link href={link} passHref legacyBehavior>
          <a className={classes.controlLink}>{content}</a>
        </Link>
      ) : (
        content
      )}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
