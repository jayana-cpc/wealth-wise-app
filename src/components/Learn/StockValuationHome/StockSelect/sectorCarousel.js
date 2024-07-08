import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import { useMediaQuery } from "@mantine/hooks";
import { Paper, useMantineTheme, Button } from "@mantine/core";
import classes from "./sectorCarousel.module.css";

// Import local images
import Image1 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/1.png';
import Image2 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/2.png';
import Image3 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/3.png';

import Image4 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/4.png';
import Image5 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/consumerStaples.png';
import Image6 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/healthCare.png';
import Image7 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/7.png';
import Image8 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/8.png';
import Image9 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/9.png';
import Image10 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/10.png';
import Image11 from '@/components/Learn/StockValuationHome/StockSelect/SectorCarouselProps/11.png';


function Card({ image, url }) {
  return (
    <>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        style={{ backgroundImage: `url(${image.src})` }}
        className={classes.card}
      />
      <Button 
        variant="white" 
        color="dark" 
        className={classes.cardButton}
        style={{ marginRight: '40px' }} 
        component="a"
        href={url}
      >
        Learn More
      </Button>
    </>
  );
}

export function SectorCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Carousel
      slideSize={mobile ? "100%" : "100%"}
      slideGap="md"
      align="start"
      slidesToScroll={1}
    >
      <Carousel.Slide><Card image={Image1} url="https://www.investopedia.com/terms/b/basic_materials.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image2} url="https://www.investopedia.com/terms/e/energy_sector.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image3} url="https://www.investopedia.com/terms/i/industrial-goods-sector.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image4} url="https://www.investopedia.com/articles/markets/050416/consumer-discretionary-sector-industries-snapshot.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image5} url="https://www.investopedia.com/terms/c/consumerstaples.asp#:~:text=What%20Are%20Consumer%20Staples%3F,well%20as%20alcohol%20and%20tobacco." /></Carousel.Slide>
      <Carousel.Slide><Card image={Image6} url="https://www.investopedia.com/terms/h/health_care_sector.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image7} url="https://www.investopedia.com/terms/f/financial_sector.asp#:~:text=What%20Is%20the%20Financial%20Sector,companies%2C%20and%20real%20estate%20firms." /></Carousel.Slide>
      <Carousel.Slide><Card image={Image8} url="https://www.investopedia.com/terms/t/technology_sector.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image9} url="https://www.investopedia.com/ask/answers/070815/what-telecommunications-sector.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image10} url="https://www.investopedia.com/terms/u/utilities_sector.asp" /></Carousel.Slide>
      <Carousel.Slide><Card image={Image11} url="https://www.investopedia.com/terms/r/realestate.asp" /></Carousel.Slide>
    </Carousel>
  );
}