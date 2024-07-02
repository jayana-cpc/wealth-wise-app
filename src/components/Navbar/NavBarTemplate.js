"use client";

import { Center, Tooltip, UnstyledButton, Stack, rem, Avatar, ScrollArea, Group, Code } from '@mantine/core';
import {
  IconMenu2,
  IconSwitchHorizontal,
  IconLogout,
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconSchool,
  IconPresentationAnalytics
} from '@tabler/icons-react';
import { UserButton } from '@/components/buttons/UserButton';
import { LinksGroup } from '@/components/Navbar/NavBarLinksGroup';
import { useUser } from '@/context/UserContext';
import { useNavbar } from '@/context/NavBarContext';
import classes from './NavBarTemplate.module.css';

export function NavBarTemplate({ children }) {
  const { collapsed, toggleCollapsed } = useNavbar();
  const { user } = useUser();

  const mockdata = [
    { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
    { 
      label: 'Learn', 
      icon: IconSchool, 
      link: '/learn',
      links: [
        { label: 'Stock Valuation Course', link: '/learn/stockValuation'},
        { label: 'Fund Valuation Course', link: '/learn/fundValuation'}
      ]
    },
    { label: 'Market news', icon: IconNotes, link: '/market-news' },
    { label: 'Find', icon: IconCalendarStats, link: '/find' },
    { label: 'Portfolio Advisor', icon: IconPresentationAnalytics, link: '/portfolioAdvisor' },
  ];

  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  const minimalLinks = mockdata.map((item, index) => (
    <NavbarLink
      icon={item.icon}
      label={item.label}
      key={item.label}
      link={item.link}
    />
  ));

  return (
    <div className={classes.container}>
      {collapsed ? (
        <nav className={classes.minimalNavbar}>
          <Center>
            <UnstyledButton onClick={toggleCollapsed}>
              <IconMenu2 />
            </UnstyledButton>
          </Center>
          <Center mt="md">
            {user && <Avatar src={user.photoURL} radius="xl" size="md" />}
          </Center>
          <div className={classes.navbarMain}>
            <Stack justify="center" gap={0}>
              {minimalLinks}
            </Stack>
          </div>
          <Stack justify="center" gap={0}>
            <NavbarLink icon={IconSwitchHorizontal} label="Change account" link="#" />
            <NavbarLink icon={IconLogout} label="Logout" link="#" />
          </Stack>
        </nav>
      ) : (
        <nav className={classes.navbar}>
          <div className={classes.header}>
            {user ? (
              <UserButton avatar={user.photoURL} name={user.displayName} email={user.email} uid={user.uid} />
            ) : (
              <p>No user logged in</p>
            )}
            <UnstyledButton onClick={toggleCollapsed} className={classes.burgerButton}>
              <IconMenu2 />
            </UnstyledButton>
          </div>
          <ScrollArea className={classes.links}>
            <div className={classes.linksInner}>{links}</div>
          </ScrollArea>
          <div className={classes.footer}>
            <Group justify="space-between">
              <Code fw={700}>v3.1.2</Code>
            </Group>
          </div>  
        </nav>
      )}
      <div className={classes.cardsContainer}>
        {children}
      </div>
    </div>
  );
}

function NavbarLink({ icon: Icon, label, link }) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton component="a" href={link} className={classes.link}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}