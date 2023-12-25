import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import axios from 'axios';

import { auth } from '../Auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  Container,
  VStack,
  useToast,
  Heading,
  Button,
  Card,
  CardBody,
  Text,
  Input,
  List,
  ListItem,
  HStack,
} from '@chakra-ui/react';

const BASE_URL = 'https://habit-coach.onrender.com';

const Friendfind = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [userNotFriendData, setUserNotFriendData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('.');

  useEffect(() => {
    if (!user) navigate('../', {});
  }, [user, navigate]);

  const getAllNotFriends = async () => {
    try {
      if (!loading) {
        const response = await axios.get(`${BASE_URL}/api/users/${user.email}/notfriends`);
        setUserNotFriendData(response.data.not_friends_name_email);
      }
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error occurred.',
        description: 'Could not get details of users.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const getSearchedFriends = (event) => {
    setSearchTerm(event.target.value);
  };

  const followFriend = async (e) => {
    e.preventDefault();
    const buttonIndex = Number(e.target.id);
    const friendEmailId = userNotFriendData[buttonIndex][0];

    try {
      await axios.put(`${BASE_URL}/api/users/${user.email}/notfriends`, {
        friendEmail: friendEmailId,
      });
      setLoaded(false);
      toast({
        title: 'Success!',
        description: `Added ${userNotFriendData[buttonIndex][1]} as a new friend.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error occurred.',
        description: 'Could not follow the user.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!loading && !loaded) {
      getAllNotFriends();
      setLoaded(true);
    }
  }, [loading, loaded]);

  return (
    <Layout user={user} currentRoute='friendfind'>
      <Container
        fontFamily='Montserrat'
        centerContent
        minH='80vh'
        justifyContent='center'
      >
        <VStack spacing={5} maxW='xl'>
          <Heading fontFamily='Montserrat' as='h1' size='lg'>
            Add New Friend
          </Heading>
          <Input
            variant='filled'
            htmlSize={50}
            width='auto'
            placeholder='Search for friend'
            id='message'
            onChange={getSearchedFriends}
          />
          <List minW='100%'>
            {userNotFriendData.length >= 1 &&
              userNotFriendData
                .filter((elem) => elem[1].match(new RegExp(searchTerm, 'gi')))
                .map((item, index) => {
                  if (item[0] !== user.email) {
                    return (
                      <ListItem mb={3} key={index}>
                        <Card size='sm'>
                          <CardBody>
                            <HStack justifyContent='space-between'>
                              <Text>{item[1]}</Text>
                              <Button
                                id={index}
                                colorScheme='green'
                                onClick={followFriend}
                              >
                                Add
                              </Button>
                            </HStack>
                          </CardBody>
                        </Card>
                      </ListItem>
                    );
                  }
                  return null;
                })}
          </List>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Friendfind;