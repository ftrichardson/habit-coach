import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  HStack,
  VStack,
  useToast,
  Link,
  Heading,
  ListItem,
  Container,
  Button,
  Card,
  CardBody,
  Text,
  Input,
  List,
} from '@chakra-ui/react';

const BASE_URL = 'https://habit-coach.onrender.com';

const Friends = ({ currentRoute }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [userFriendData, setUserFriendData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('.');

  useEffect(() => {
    if (!user) navigate('../', {});
  }, [user, navigate]);

  const getAllFriends = async () => {
    try {
      if (!loading) {
        const response = await axios.get(`${BASE_URL}/api/users/${user.email}/friends`);
        setUserFriendData(response.data.friends_name_email);
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

  const unfollowFriend = async (e) => {
    e.preventDefault();
    const buttonIndex = Number(e.target.id);
    const friendEmailId = userFriendData[buttonIndex][0];

    try {
      await axios.put(`${BASE_URL}/api/users/${user.email}/friends`, {
        friendEmail: friendEmailId,
      });
      setLoaded(false);
      toast({
        title: 'Success!',
        description: `Unfollowed ${userFriendData[buttonIndex][1]}.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error occurred!',
        description: 'Could not unfollow user.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (!loading && !loaded) {
      getAllFriends();
      setLoaded(true);
    }
  }, [loading, loaded]);

  return (
    <Layout user={user} currentRoute='friends'>
      <Container centerContent minH='80vh' justifyContent='center'>
        <VStack fontFamily='Montserrat' spacing={8} maxW='xl'>
          <Heading fontFamily='Montserrat'>Friends</Heading>
          <Text textAlign='center'>
            Here you will find the highest streak maintainers among all your friends.
          </Text>
          <HStack minW='80%'>
            <Input
              variant='filled'
              borderRadius={50}
              placeholder='Search for existing friend'
              id='message'
              onChange={getSearchedFriends}
            />
            {['Add New Friend'].map((routeName) => (
              <Link
                href={'/addnewfriend'}
                key={'Find friends'}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  borderRadius={50}
                  colorScheme='gray'
                  leftIcon={<AiOutlinePlus />}
                  variant={
                    currentRoute === routeName.toLowerCase()
                      ? 'solid'
                      : 'outline'
                  }
                >
                  {routeName}
                </Button>
              </Link>
            ))}
          </HStack>
          <List minW='80%'>
            {userFriendData.length >= 1 &&
              userFriendData
                .filter((elem) => elem[1].match(new RegExp(searchTerm, 'gi')))
                .filter((elem) => elem[0] !== user.email)
                .map((item, index) => (
                  <ListItem mb={3} key={index}>
                    <Card size='sm'>
                      <CardBody>
                        <HStack justify='space-between'>
                          <VStack align='left' spacing={0}>
                            <Text> {item[1]}</Text>
                          </VStack>
                          <Button
                            id={index}
                            colorScheme='red'
                            onClick={unfollowFriend}
                          >
                            {' '}
                            Unfriend{' '}
                          </Button>
                        </HStack>
                      </CardBody>
                    </Card>
                  </ListItem>
                ))}
          </List>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Friends;