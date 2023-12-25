import React, { useRef } from 'react';
import axios from 'axios';
import { useDisclosure } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

const BASE_URL = 'https://habit-coach.onrender.com';

const DeleteHabitButton = ({ user, habits, habitsChangeHandler, index, parentModelOnClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async () => {
    const habitsCopy = [...habits];
    habitsCopy.splice(index, 1);
    habitsChangeHandler(habitsCopy);

    await axios.delete(`${BASE_URL}/api/users/${user.email}/habits/${habits[index].name}`, {});

    onClose();
    parentModelOnClose();
  };

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>
        Delete
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Habit
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteHabitButton;