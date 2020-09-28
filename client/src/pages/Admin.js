import React from "react";
import { Tabs, TabList, TabPanels, TabPanel, Tab, Flex } from "@chakra-ui/core";
import { UsersTable, ClassesTable } from "../components";

const data = [
  {
    label: "Users",
    content: <UsersTable></UsersTable>,
  },
  {
    label: "Classes",
    content: <ClassesTable></ClassesTable>,
  },
  {
    label: "Messages",
    content: "This is where we can configure our messages",
  },
];

function Admin() {
  return (
    <Tabs
      gridArea="main"
      isFitted
      variant="enclosed-colored"
      colorScheme={"yellow"}
      h="80%"
      px="5%"
    >
      <Flex direction="column" w="100%">
        <TabList>
          {data.map((tab, index) => (
            <Tab key={index}>{tab.label} </Tab>
          ))}
        </TabList>
        <TabPanels w="100%">
          {data.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Flex>
    </Tabs>
  );
}

export default Admin;
