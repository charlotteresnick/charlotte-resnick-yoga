import React from "react";

import { Image, Flex, Stack, Text, Heading, Box } from "@chakra-ui/core";
import PageTitle from "../components/PageTitle";

const Section = ({ isReversed, text, image }) => {
  const direction = isReversed
    ? ["column-reverse", "column-reverse", "column-reverse", "row"]
    : ["column-reverse", "column-reverse", "column-reverse", "row-reverse"];

  return (
    <Stack align="center" justify="space-between" direction={direction}>
      <Flex direction="column" p="10" align="center" justify="center">
        <Text as="p" pb="1em" size="md" m="auto">
          {text}
        </Text>
      </Flex>
      {image}
    </Stack>
  );
};

const section1 = (
  <Section
    text={`California born and Colorado raised, I earned my Bachelor's degree in Philosophy at the University of Miami. Yoga had been a source of order and serenity for me amidst the stresses of undergraduate education and continues to be through my day-to-day life. Trained in Kerala, India, I completed my 200-hour Hatha Yoga Teacher certification in accordance with Yoga Alliance International standards. During my time in Kerala, I had the privilege of learning one-on-one under yoga masters from the Sivananda Yoga Ashram, the oldest ashram in Southern India.`}
    image={
      <Image
        w={["400px"]}
        src="/images/charlotte_and_anoop.jpg"
        alt="Charlotte with her instructor Das"
      />
    }
  />
);
const section2 = (
  <Section
    isReversed
    text={`Hatha Yoga is the yoga of union, translating in two parts; 'ha', meaning "sun," and 'tha', meaning "moon." Hatha Yoga represents unions between the
left body with the right body, the physical body with the astral and casual bodies, and the physical with the spiritual facets of our being. In most Hatha Yoga classes, 
asanas are typically held for a longer period of time than in a Vinyasa or Power Yoga class, thus building strength in and control over the
physical body--skills that allow for a more effective spiritual practice.`}
    image={
      <Image
        w={["400px"]}
        src="/images/charlotte_and_das.jpg"
        alt="Charlotte and her instructor Anoop"
      />
    }
  />
);
const section3 = (
  <Section
    text={`
A Sivananda Hatha Yoga practice typically averaging 90 minutes, beginning with rest in Savasana, followed by Pranayama, Surya Namaskara, 
and ending with the performance of the 12 basic asanas; Sirsasana, Sarvagasana, Halasana, Matsyasana, Paschimottasana, Bhujangasana, Salabhasana, Dhanurasana, Ardha Matsyendrasana, Kakasana, Uttasana, 
and Trikonasana respectively. The sequence allows for variation in the later part.`}
    image={
      <Image
        w={["400px"]}
        src="/images/puja.jpg"
        alt="A black and white photo of an artistic view of trees"
      />
    }
  />
);

function About(props) {
  return (
    <Box gridArea="main" px="10%" overflow="scroll">
      <PageTitle title="About" />
      <Stack spacing={["0.5em", "0.5em", "0.5em", "-3em"]}>
        {section1}
        {section2}
        {section3}
      </Stack>
    </Box>
  );
}

export default About;
