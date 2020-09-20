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
    text={`Originally from California, I've been living in Miami for almost two years while finishing my Bachelor's degree in Philosophy at the University of Miami. Yoga has been a source of order and serenity for me amidst the stresses of undergraduate education and day-to-day life.`}
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
    text={`Trained in Kerala, India, I've successfully completed my 200-hour Hatha Yoga Teacher certification in accordance with Yoga Alliance International standards. During my time in Kerala, I had the privilege of learning one-on-one under yoga masters from the Sivananda Yoga Ashram, the oldest ashram in Southern India. ​ I have an advanced asana, pranayama, and meditation practice.`}
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
    text={`I have an advanced asana, pranayama, and meditation practice.`}
    image={
      <Image
        w={["400px"]}
        src="/images/trees.jpg"
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
