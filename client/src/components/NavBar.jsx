import React from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { logout } from '../routes/Auth/firebase';

/**
 * Logo component for displaying the application logo.
 *
 * @returns {ReactNode} - JSX element representing the logo.
 */
const Logo = () => (
  <Box boxSize='3rem'>
    <Link href='/'>
      <Image src='logo.png' alt='Logo' />
    </Link>
  </Box>
);

/**
 * NavBar component for rendering the navigation bar.
 *
 * @param {Object} props - Component props.
 * @param {string} props.currentRoute - Current route for navigation.
 * @param {Object} props.user - User information.
 * @returns {ReactNode} - JSX element representing the navigation bar.
 */
const NavBar = ({ currentRoute, user }) => {
  const navigate = useNavigate();
  const [isSmallWidth] = useMediaQuery('(max-width: 800px)');

  return (
    <HStack justifyContent='space-between' p={5}>
      <HStack>
        <Logo />
        {currentRoute !== 'root' && !isSmallWidth && (
          <Link href='/' style={{ textDecoration: 'none' }}>
            <Heading size='md' fontFamily={'Unbounded'}>
              Habit Tracker
            </Heading>
          </Link>
        )}
      </HStack>

      <HStack spacing={5}>
        {user &&
          ['Home', 'Leaderboard', 'Friends'].map((routeName) => (
            <Link
              href={`/${routeName.replace(/\s/g, '').toLowerCase()}`}
              key={routeName}
              style={{ textDecoration: 'none' }}
            >
              <Button
                borderRadius={50}
                fontFamily='Montserrat'
                colorScheme='teal'
                size={isSmallWidth ? 'sm' : 'md'}
                variant={
                  currentRoute === routeName.toLowerCase() ? 'solid' : 'ghost'
                }
              >
                {routeName}
              </Button>
            </Link>
          ))}
        {user && (
          <Menu>
            <MenuButton
              as={Button}
              fontFamily='Montserrat'
              variant='link'
              colorScheme='teal'
              size={isSmallWidth ? 'sm' : 'md'}
              borderRadius={50}
              rightIcon={<ChevronDownIcon />}
            >
              {user.email.split('@')[0]}
            </MenuButton>
            <MenuList>
              <Link
                onClick={() => {
                  logout();
                  return navigate('/', {});
                }}
              >
                <MenuItem fontFamily='Montserrat'>Logout</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        )}
        {!user &&
          ['Login', 'Register'].map((routeName) => (
            <Link
              href={`/${routeName.replace(/\s/g, '').toLowerCase()}`}
              key={routeName}
              fontFamily='Montserrat'
              style={{ textDecoration: 'none' }}
            >
              <Button
                borderRadius={50}
                colorScheme='teal'
                variant={
                  currentRoute === routeName.toLowerCase() ? 'solid' : 'ghost'
                }
              >
                {routeName}
              </Button>
            </Link>
          ))}
      </HStack>
    </HStack>
  );
};

export default NavBar;