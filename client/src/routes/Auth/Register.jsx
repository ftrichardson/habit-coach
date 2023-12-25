import React, { useCallback, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, register } from './firebase';
import {
  Container,
  Heading,
  Link,
  Input,
  Button,
  Text,
  VStack,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react';

import axios from 'axios';

import { AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

const BASE_URL = 'https://habit-coach.onrender.com';

const getFailureToastOptions = (msg) => ({
  title: 'Error occurred.',
  description: msg.replace('Firebase: ', '').replace('auth/', '').replaceAll('-', ' '),
  status: 'error',
  duration: 9000,
  isClosable: true,
});

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const toast = useToast();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('../Home');
  }, [user, loading, navigate]);

  const fetchExistingUsers = useCallback(async () => {
    if (!loading) {
      try {
        const response = await axios.get(`${BASE_URL}/api/users`);
        setUsers(response.data.users.map((user) => user.userName));
      } catch (error) {
        console.log(error);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && !loaded) {
      fetchExistingUsers();
      setLoaded(true);
    }
  }, [loading, loaded, fetchExistingUsers]);

  return (
    <Container
      fontFamily='Montserrat'
      centerContent
      minH='80vh'
      justifyContent='center'
    >
      <VStack p={12} borderRadius={8} boxShadow='lg' align='left' spacing={8}>
        <Heading fontFamily='Montserrat'>Register</Heading>
        <VStack>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlineUser color='gray' />}
            />
            <Input
              type='text'
              variant='filled'
              className='register__textBox'
              value={username}
              minW='xs'
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<AiOutlineMail color='gray' />}
            />
            <Input
              type='text'
              variant='filled'
              className='register__textBox'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<RiLockPasswordLine color='gray' />}
            />
            <Input
              type='password'
              variant='filled'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
          </InputGroup>
        </VStack>
        <Button
          colorScheme='teal'
          onClick={async () => {
            if (!username) {
              toast(getFailureToastOptions('Username is required!'));
            } else if (!email) {
              toast(getFailureToastOptions('Email is required!'));
            } else if (!password) {
              toast(getFailureToastOptions('Password is required!'));
            } else if (users.includes(username)) {
              toast(
                getFailureToastOptions(
                  'User with the same username already exists!'
                )
              );
            } else {
              const [status, statusMessage] = await register(
                username,
                email,
                password
              );
              if (!status) {
                toast(getFailureToastOptions(statusMessage));
              }
            }
          }}
        >
          Register
        </Button>
        <Text>
          Already have an account?{' '}
          <Link color='teal.500' href='../login'>
            Login
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Register;