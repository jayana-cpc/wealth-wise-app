import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { useRouter } from 'next/navigation';

export function HeroImageBackground({path}) {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push(path);
  };
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Unit One: Decision Making
        </Title>

        <Container size={800}>
          <Text size="lg" className={classes.description}>
            Welcome to Unit One: Decision Making! In this unit, we will explore how decision-making plays a crucial role in managing your personal finances effectively. 
            Financial decisions impact your savings, investments, and overall financial health, so it’s essential to approach them thoughtfully.
          </Text>
        </Container>

        <div className={classes.controls}>
        <Button variant="gradient" gradient={{ from: 'violet', to: 'blue', deg: 153 }} size="md" onClick={handleButtonClick}>
          Lesson 1
        </Button>

        </div>
      </div>
    </div>
  );
}