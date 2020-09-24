import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/core";

function ClassRegisterModal({ isOpen, onOpen, onClose }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        value="inside"
      >
        <ModalOverlay zIndex={3}>
          <ModalContent bgPos="center">
            <ModalHeader>Class Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mt={1}>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="John"></Input>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Doe"></Input>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Credit Card Number</FormLabel>
                <Input placeholder="****-****"></Input>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Security Code</FormLabel>
                <Input placeholder="***"></Input>
              </FormControl>
              <FormControl mt={1}>
                <FormLabel>Exp. Date</FormLabel>
                <Input placeholder="e.g. 6/22"></Input>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="yellow" mr={3} onClick={onClose}>
                Sign Up
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}

export default ClassRegisterModal;
