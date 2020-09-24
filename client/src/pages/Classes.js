import React from "react";

import { GrFormAdd, GrFormSubtract } from "react-icons/gr";
import {
  useDisclosure,
  Stack,
  Box,
  Text,
  Heading,
  Link,
  IconButton,
  Flex,
} from "@chakra-ui/core";
import PageTitle from "../components/PageTitle";
import ClassRegisterModal from "../components/ClassRegisterModal";

function Classes(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      gridArea="main"
      overflow="scroll"
      direction="column"
      px="10%"
      justify="center"
      align="center"
    >
      <ClassRegisterModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <PageTitle title="Classes" />
      <Stack
        direction={["column", "column", "row", "row"]}
        spacing={8}
        align="center"
        justify="space-evenly"
      >
        <Box
          direction="column"
          p="10"
          align="center"
          justify="center"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          maxWidth="500px"
          maxHeight="400px"
          overflow="scroll"
        >
          <Box>
            <Heading fontSize="2xl">This Week</Heading>
          </Box>
          <Box
            p={4}
            my={4}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            maxWidth="450px"
            textAlign="left"
          >
            <Flex direction="row" justifyContent="space-between">
              <Heading fontSize="md">
                Large Group - noon-1:00 a.m. - $15
              </Heading>
              <IconButton
                colorScheme="black"
                variant="ghost"
                aria-label="Enroll"
                size="sm"
                icon={<GrFormAdd />}
                onClick={onOpen}
              ></IconButton>
            </Flex>
            <Text>
              Location:{" "}
              <Link color="yellow.500">Alamo Square Park, San Francisco</Link>
            </Text>
            <Text direction="row">
              Description: Meet by the tennis courts for a relaxing, hour long
              flow. Bring your own matt and props.
            </Text>
          </Box>
          <Box
            p={4}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            maxWidth="450px"
            textAlign="left"
          >
            <Flex direction="row" justifyContent="space-between">
              <Heading fontSize="md">
                Small Group - 9:30-10:30 a.m. - $30
              </Heading>
              <IconButton
                colorScheme="black"
                variant="ghost"
                aria-label="Enroll"
                size="sm"
                icon={<GrFormAdd />}
              ></IconButton>
            </Flex>
            <Text>
              Location:{" "}
              <Link color="yellow.500">Alamo Square Park, San Francisco</Link>
            </Text>
            <Text direction="row">
              Description: Meet by the tennis courts for a relaxing, hour long
              flow. Bring your own matt and props.
            </Text>
          </Box>
        </Box>
        <Box
          direction="column"
          p="10"
          align="center"
          justify="center"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          maxWidth="500px"
          maxHeight="400px"
          overflow="scroll"
        >
          <Box>
            <Heading fontSize="2xl">My Schedule</Heading>
          </Box>
          <Box
            p={4}
            my={4}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            maxWidth="450px"
            textAlign="left"
          >
            <Flex direction="row" justifyContent="space-between">
              <Heading fontSize="md">
                Large Group - noon-1:00 a.m. - $15
              </Heading>
              <IconButton
                colorScheme="black"
                variant="ghost"
                aria-label="Remove class"
                size="sm"
                icon={<GrFormSubtract />}
              ></IconButton>
            </Flex>
            <Text>
              Location:{" "}
              <Link color="yellow.500">Alamo Square Park, San Francisco</Link>
            </Text>
            <Text direction="row">
              Description: Meet by the tennis courts for a relaxing, hour long
              flow. Bring your own matt and props.
            </Text>
          </Box>
          <Box
            p={4}
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
            maxWidth="450px"
            textAlign="left"
          >
            <Flex direction="row" justifyContent="space-between">
              <Heading fontSize="md">
                Small Group - 9:00-10:00 a.m. - $15
              </Heading>
              <IconButton
                colorScheme="black"
                variant="ghost"
                aria-label="Remove class"
                size="sm"
                icon={<GrFormSubtract />}
              ></IconButton>
            </Flex>{" "}
            <Text>
              Location:{" "}
              <Link color="yellow.500">Alamo Square Park, San Francisco</Link>
            </Text>
            <Text direction="row">
              Description: Meet by the tennis courts for a relaxing, hour long
              flow. Bring your own matt and props.
            </Text>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Classes;
