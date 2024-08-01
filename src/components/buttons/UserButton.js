import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import classes from "./UserButton.module.css";

export function UserButton({ avatar, name, email }) {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={avatar} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
