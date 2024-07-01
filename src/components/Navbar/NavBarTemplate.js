"use client";
import { Group, Code, ScrollArea } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconSchool,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { UserButton } from '@/components/buttons/UserButton';
import { LinksGroup } from '@/components/Navbar/NavBarLinksGroup';
import { useUser } from '@/context/UserContext';
import classes from './NavBarTemplate.module.css';

export function NavBarTemplate({ children }) {
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
        {children}
      </div>
    </div>
  );
}