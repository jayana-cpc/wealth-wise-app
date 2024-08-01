// app/components/Card.js
import {
  Card as MantineCard,
  Text,
  Menu,
  ActionIcon,
  rem,
} from "@mantine/core";
import styles from "./DefinitionCard.module.css";
import { IconDots, IconChalkboard, IconCopy } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export function DefinitionCard({ word, definition }) {
  const clipboard = useClipboard();
  const router = useRouter();

  const handleLearnMore = () => {
    router.push("https://example.com/learn-more");
  };

  const handleCopyDefinition = () => {
    clipboard.copy(definition);
  };

  return (
    <MantineCard className={styles.card}>
      <div className={styles.cardHead}>
        <Text size="lg" className={styles.cardTitle}>
          <strong>DEFINITION: </strong> {word}
        </Text>
        <Menu withinPortal position="bottom-start" shadow="sm">
          <Menu.Target>
            <ActionIcon variant="subtle" color="gray">
              <IconDots style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconChalkboard style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleLearnMore}
            >
              Learn More
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconCopy style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleCopyDefinition}
            >
              Copy Definition
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className={styles.cardBody}>
        <Text size="md">{definition}</Text>
      </div>
    </MantineCard>
  );
}