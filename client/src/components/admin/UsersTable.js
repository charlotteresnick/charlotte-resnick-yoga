import React, { useState, useEffect } from "react";
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
  Select,
  Spinner,
} from "@chakra-ui/core";
import produce from "immer";

import { formatDate } from "../../util/dateHelpers";
import { Table } from "../../components";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/users`, {
        method: "GET",
      });
      const res = await result.json();

      setUsers(res);
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
      label: "First Name",
      name: "firstName",
      options: {
        filter: false,
      },
    },
    {
      label: "Last Name",
      name: "lastName",
      options: {
        filter: false,
      },
    },
    {
      label: "Email",
      name: "email",
      options: {
        filter: false,
      },
    },
    {
      label: "Role",
      name: "isAdmin",
      options: {
        customBodyRender: (data) => {
          return data ? "Admin" : "Student";
        },
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

  return (
    <>
      <EditUserModal
        users={users}
        setUsers={setUsers}
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
          title="Users Admin"
          columns={columns}
          data={users}
        ></Table>
      )}
    </>
  );
}

function EditUserModal(props) {
  const { users, setUsers, selectedIndex, isOpen, onClose } = props;
  const toast = useToast();
  const [formData, setFormData] = useState();

  useEffect(() => {
    setFormData(users ? users[selectedIndex] : {});
  }, [users, selectedIndex]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`/api/users/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: formData,
      }),
    });

    if (res.status === 200) {
      const {
        data: { user },
      } = await res.json();
      setUsers((oldUsers) =>
        produce(oldUsers, (draftUsers) => {
          draftUsers.splice(selectedIndex, 1, user);
        })
      );
      onClose();
    } else {
      toast({
        position: "top",
        title: "There was an error editing that user.  ",
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
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  name="firstName"
                  placeholder="First name"
                  value={formData?.firstName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  value={formData?.lastName}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  placeholder="Last name"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Select
                  name="isAdmin"
                  value={formData?.isAdmin}
                  onChange={handleChange}
                >
                  <option value="true">Admin</option>
                  <option value="false">Student</option>={" "}
                </Select>
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

export default UsersTable;
