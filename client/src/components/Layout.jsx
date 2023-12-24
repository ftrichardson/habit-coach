import React from 'react';
import { Container } from '@chakra-ui/react';
import NavBar from './NavBar';

/**
 * Layout component to provide a consistent layout for pages.
 *
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - The content to be rendered within the layout.
 * @param {Object} props.user - User information.
 * @param {string} props.currentRoute - Current route for navigation.
 * @returns {ReactNode} - JSX element representing the layout.
 */
const Layout = ({ children, user, currentRoute }) => {
  return (
    <>
      {/* Render the navigation bar with user information and current route */}
      <NavBar currentRoute={currentRoute} user={user} />

      {/* Container to center content vertically, with a maximum width */}
      <Container justifyContent="center" height="calc(90vh)" maxWidth="6xl">
        {children}
      </Container>
    </>
  );
};

export default Layout;