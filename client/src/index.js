import React from 'react';
import { createRoot } from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Root from './routes/Root';
import Login from './routes/Auth/Login';
import Register from './routes/Auth/Register';
import Leaderboard from './routes/Leaderboard/Leaderboard';
import Friends from './routes/Friends/Friends';
import AddNewFriend from './routes/Friends/AddNewFriend';

const routes = [
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
  {
    path: '/addnewfriend',
    element: <AddNewFriend />,
  },
];

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);