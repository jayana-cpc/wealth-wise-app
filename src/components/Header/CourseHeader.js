import { Title, Text, Container, Overlay } from "@mantine/core";
import classes from "./HeroImageBackground.module.css";
export function HeroImageBackground({ title, description }) {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>{title}</Title>

        <Container size={800}>
          <Text size="lg" className={classes.description}>
            {description}
          </Text>
        </Container>
      </div>
    </div>
  );
}
