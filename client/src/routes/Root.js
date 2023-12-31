import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { auth } from './Auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  Container,
  Heading,
  HStack,
  Text,
  Button,
  VStack,
  Image,
} from '@chakra-ui/react';

export default function Root() {
  const [user] = useAuthState(auth);
  return (
    <Layout currentRoute='root' user={user}>
      <Container maxW='100%'>
        <VStack spacing={125}>
          <HStack mt={75} minW='100%' justifyContent='space-between'>
            <VStack spacing={5}>
              <Heading as='h1' fontSize='4xl' textAlign='center'>
                Building new habits{' '}
                <Text as={'span'} color={'teal.400'}>
                  made fun
                </Text>
              </Heading>
              <Text textAlign='center' color={'gray.400'}>
                Track your progress, befriend people, and start working toward a better you today!
              </Text>
              <Link to='../register'>
                <Button
                  rounded={'full'}
                  colorScheme={'teal'}
                  bg={'teal.400'}
                  _hover={{ bg: 'teal.500' }}
                >
                  Get started
                </Button>
              </Link>
            </VStack>
            <Image boxSize='15rem' src='calendar.png' alt='Calendar' />
          </HStack>
          <Image src='habit.png' alt='habit' />
        </VStack>
      </Container>
    </Layout>
  );
}