import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
// import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';

export function UserButton({ avatar, name, email }) {
  console.log('Rendering UserButton:', { avatar, name, email });
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

        {/* <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} /> */}
      </Group>
    </UnstyledButton>
  );
}
