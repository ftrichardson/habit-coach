import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, useToast, VStack } from '@chakra-ui/react';
import { auth } from '../Auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCallback } from 'react';
import axios from 'axios';
import HabitGrid from './HabitGrid';
import Layout from '../../components/Layout';
import AddNewHabitButton from './AddNewHabitButton';
import moment from 'moment';

const BASE_URL = 'https://habit-coach.onrender.com';

const Home = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [habits, setHabits] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false);

  const getAllHabits = useCallback(() => {
    if (!loading) {
      axios
        .get(`${BASE_URL}/api/users/${user.email}/habits`)
        .then(function (response) {
          setHabits(response.data.habits);
        })
        .catch(function () {
          toast({
            title: 'Error occurred.',
            description: 'Could not get habits of the user.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        });
    }
  }, [loading, toast, user]);

  useEffect(() => {
    if (!user) navigate('../', {});
  }, [user, navigate]);

  useEffect(() => {
    if (!loading && !loaded) {
      getAllHabits();
      setLoaded(true);
    }
  }, [loading, loaded, getAllHabits]);

  return (
    <Layout user={user} currentRoute='home'>
      <VStack justifyContent='center' height='100%' spacing={50}>
        <VStack>
          <Heading fontFamily='Montserrat' size='lg'>
            Welcome! It is {moment().format('MMM Do, YYYY')}
          </Heading>
          <Heading fontFamily='Montserrat' size='md' color='gray'>
            Track your habits for today.
          </Heading>
        </VStack>
        {habits && habits.length > 0 ? (
          <HabitGrid user={user} habits={habits} habitsChangeHandler={setHabits} />
        ) : (
          <Heading fontFamily='Montserrat' fontSize='xl' textAlign='center'>
            You currently have no tracked habits. Click on the button below to
            get started.
          </Heading>
        )}
        <AddNewHabitButton
          user={user}
          habits={habits || []}
          habitsChangeHandler={setHabits}
        />
      </VStack>
    </Layout>
  );
};

export default Home;