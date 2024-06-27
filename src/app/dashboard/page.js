"use client";
import { Group, Code, ScrollArea, Text } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { FeatureCardsGrid } from '@/components/Dashboard/FeatureCardsGrid';
import { UserButton } from '@/components/buttons/UserButton';
import { LinksGroup } from '@/components/Navbar/NavBarLinksGroup';
import { useUser } from '@/context/UserContext';
import classes from './page.module.css';

export default function NavbarNested() {
  const mockdata = [
    { label: 'Dashboard', icon: IconGauge },
    {
      label: 'Market news',
      icon: IconNotes,
      initiallyOpened: true,
      links: [
        { label: 'Overview', link: '/' },
        { label: 'Forecasts', link: '/' },
        { label: 'Outlook', link: '/' },
        { label: 'Real time', link: '/' },
      ],
    },
    {
      label: 'Find',
      icon: IconCalendarStats,
      links: [
        { label: 'Upcoming releases', link: '/' },
        { label: 'Previous releases', link: '/' },
        { label: 'Releases schedule', link: '/' },
      ],
    },
    { label: 'Portfolio Advisor', icon: IconPresentationAnalytics },
  ];

  const { user } = useUser(); 

  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <div className={classes.container}>
      
      <nav className={classes.navbar}>
        <div className={classes.header}>
          {user ? (
            <UserButton avatar={user.photoURL} name={user.displayName} email={user.email} />
          ) : (
            <p>No user logged in</p>
          )}
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
      <div className={classes.cardsContainer}>
        <FeatureCardsGrid />
      </div>
    </div>
  );
}
