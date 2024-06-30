"use client";
import { Group, Code, ScrollArea, Text } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconSchool,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { FeatureCardsGrid } from '@/components/Dashboard/FeatureCardsGrid';
import { UserButton } from '@/components/buttons/UserButton';
import { LinksGroup } from '@/components/Navbar/NavBarLinksGroup';
import { useUser } from '@/context/UserContext';
import classes from './page.module.css';

export default function Dashboard() {
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
    { label: 'Portfolio Advisor', icon: IconPresentationAnalytics, link: '/portfolio-advisor' },
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
