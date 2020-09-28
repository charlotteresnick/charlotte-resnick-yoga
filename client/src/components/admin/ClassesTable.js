import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  useToast,
  Flex,
  Spinner,
  Textarea,
} from "@chakra-ui/core";
import { AddIcon } from "@chakra-ui/icons";
import produce from "immer";
import { TextField } from "@material-ui/core";
import moment from "moment";

import { formatDate, formatDateToPG } from "../../util/dateHelpers";
import { Table } from "..";

function ClassesTable() {
  const [classes, setClasses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/classes`, {
        method: "GET",
      });
      const res = await result.json();

      setClasses(res);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const columns = [
    {
      label: "Id",
      name: "id",
      options: {
        filter: false,
        display: "excluded",
      },
    },
    {
      label: "Class Name",
      name: "name",
      options: {
        filter: false,
      },
    },
    {
      label: "Description",
      name: "description",
      options: {
        filter: false,
      },
    },
    {
      label: "Start Time",
      name: "timeStart",
      options: {
        customBodyRender: formatDate,
        filter: false,
      },
    },
    {
      label: "End Time",
      name: "timeEnd",
      options: {
        customBodyRender: formatDate,
        filter: false,
      },
    },
    {
      label: "Price",
      name: "price",
      options: {
        filter: false,
      },
    },
    {
      label: "Location",
      name: "location",
      options: {
        filter: false,
      },
    },
    {
      label: "Max. # Students",
      name: "maxStudents",
      options: {
        filter: false,
      },
    },
    {
      label: "Created At",
      name: "createdAt",
      options: {
        customBodyRender: formatDate,
        filter: false,
      },
    },
    {
      label: "Updated At",
      name: "updatedAt",
      options: {
        customBodyRender: formatDate,
        filter: false,
      },
    },
    {
      label: "Actions",
      name: "Edit",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_, tableMeta, updateValue) => {
          const index = tableMeta.rowIndex;
          return (
            <Button
              onClick={() => {
                setSelectedIndex(index);
                onOpen();
              }}
            >
              Edit
            </Button>
          );
        },
      },
    },
  ];

  const handleAddClass = () => {
    setSelectedIndex(-1);
    onOpen();
  };

  const customToolbar = () => {
    return (
      <Button
        leftIcon={<AddIcon />}
        colorScheme="yellow"
        variant="solid"
        onClick={handleAddClass}
      >
        Add Class
      </Button>
    );
  };

  return (
    <>
      <EditClassModal
        classes={classes}
        setClasses={setClasses}
        selectedIndex={selectedIndex}
        isOpen={isOpen}
        onClose={onClose}
      />
      {isLoading ? (
        <Flex justify="center">
          <Spinner
            mt="20%"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="yellow.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Table
          stickyHeader
          title="Classes Admin"
          columns={columns}
          data={classes}
          customToolbar={customToolbar}
        ></Table>
      )}
    </>
  );
}

window.moment = moment();

function EditClassModal(props) {
  const { classes, setClasses, selectedIndex, isOpen, onClose } = props;
  const now = formatDateToPG(moment().startOf("hour"));
  const hourFromNow = formatDateToPG(moment().startOf("hour").add(1, "hour"));

  const initialState = {
    name: "",
    timeStart: now,
    timeEnd: hourFromNow,
    price: "",
    description: "",
    location: "",
    maxStudents: "",
  };

  const toast = useToast();

  const [formData, setFormData] = useState(initialState);
  useEffect(() => {
    setFormData((oldFormData) => {
      const currentClass = classes[selectedIndex];
      if (selectedIndex === -1 || !currentClass) {
        return initialState;
      } else {
        return {
          ...currentClass,
          timeStart: formatDateToPG(currentClass.timeStart),
          timeEnd: formatDateToPG(currentClass.timeEnd),
        };
      }
    });
  }, [classes, selectedIndex]);

  const [isNewClass, setIsNewClass] = useState();
  useEffect(() => {
    setIsNewClass(selectedIndex === -1);
  }, [selectedIndex]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log({ name }, { value });
    setFormData((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const url = isNewClass ? "/api/classes" : `/api/classes/${formData.id}`;
    const method = isNewClass ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clazz: formData,
      }),
    });

    if (res.status === 200) {
      const {
        data: { clazz },
      } = await res.json();
      setClasses((oldClasses) =>
        produce(oldClasses, (draftClasses) => {
          draftClasses.splice(selectedIndex, 1, clazz);
        })
      );
      onClose();
    } else if (res.status === 201) {
      const {
        data: { clazz },
      } = await res.json();
      setClasses((oldClasses) =>
        produce(oldClasses, (draftClasses) => {
          draftClasses.push(clazz);
        })
      );
      onClose();
    } else {
      toast({
        position: "top",
        title: "There was an error",
        description: "Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay zIndex={101}>
          <ModalContent maxHeight="600px" overflow="scroll">
            <ModalHeader>
              {isNewClass ? "Create A Class" : "Edit Class"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Class name</FormLabel>
                <Input
                  name="name"
                  placeholder="Class name"
                  value={formData?.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Class Start</FormLabel>
                <TextField
                  name="timeStart"
                  id="datetime-local"
                  type="datetime-local"
                  fullWidth
                  className={"chakra-input"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={moment(
                    formData?.timeStart,
                    "YYYY-MM-DDTHH:mm:ss:SSS"
                  ).format("YYYY-MM-DDTHH:mm")}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Class End</FormLabel>
                <TextField
                  name="timeEnd"
                  id="datetime-local"
                  type="datetime-local"
                  fullWidth
                  className={"chakra-input"}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={moment(
                    formData?.timeEnd,
                    "YYYY-MM-DDTHH:mm:ss:SSS"
                  ).format("YYYY-MM-DDTHH:mm")}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Class Price</FormLabel>
                <Input
                  name="price"
                  placeholder="$20"
                  value={formData?.price}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Class Location</FormLabel>
                <Input
                  name="location"
                  placeholder="Address/Location"
                  value={formData?.location}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Class Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Description"
                  value={formData?.description}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Max. Students</FormLabel>
                <Input
                  name="maxStudents"
                  placeholder="Max. # Students"
                  value={formData?.maxStudents}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="yellow" mr={3} onClick={handleSubmit}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default ClassesTable;
