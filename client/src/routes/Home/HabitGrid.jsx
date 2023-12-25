import React from 'react';
import moment from 'moment/moment';
import { Flex, Grid, HStack, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import HabitRow from './HabitRow';
import { squareSideLen } from './HabitRow';

const HabitGrid = ({ user, habits, habitsChangeHandler }) => {
  const [isXlWidth] = useMediaQuery('(min-width: 1700px)');
  const [isLargeWidth] = useMediaQuery('(min-width: 1250px)');
  const [isMediumWidth] = useMediaQuery('(min-width: 900px)');
  const [isSmallWidth] = useMediaQuery('(min-width: 600px)');

  const getNumDaysToGoBack = () => {
    if (isXlWidth) return 20;
    else if (isLargeWidth) return 15;
    else if (isMediumWidth) return 10;
    else if (isSmallWidth) return 5;
    return 2;
  };

  const gridItems = habits.map((_, i) => (
    <HabitRow
      user={user}
      key={i}
      index={i}
      habits={habits}
      habitsChangeHandler={habitsChangeHandler}
      numDaysToGoBack={getNumDaysToGoBack()}
    />
  ));

  const dateDays = Array.from({ length: getNumDaysToGoBack() + 1 }, (_, i) => {
    const earliestDate = moment().subtract(getNumDaysToGoBack(), 'days');
    return earliestDate.clone().add(i, 'days').toDate();
  });

  const dateRow = dateDays.map((date) => {
    const isToday = moment(date).isSame(new Date(), 'day');
    return (
      <VStack
        spacing={0}
        w={squareSideLen}
        h={75}
        align='center'
        justify='center'
        key={date.toISOString()}
      >
        <Text
          fontFamily='Inconsolata'
          fontSize='xl'
          color={isToday ? 'green.500' : 'black'}
          fontWeight={isToday ? 'bold' : 'normal'}
        >
          {moment(date).format('DD')}
        </Text>
        <Text
          fontFamily='Inconsolata'
          fontSize='md'
          color={isToday ? 'green.500' : 'gray'}
          fontWeight={isToday ? 'bold' : 'normal'}
        >
          {moment(date).format('ddd')}
        </Text>
      </VStack>
    );
  });

  gridItems.unshift(
    <HStack key={'date-row'}>
      <Flex minW='10rem' ml={5}></Flex>
      {dateRow}
      {getNumDaysToGoBack() > 2 && (
        <Text
          textAlign='center'
          as='b'
          pl={2}
          fontFamily='Inconsolata'
          fontSize='lg'
        >
          Streak 🔥
        </Text>
      )}
    </HStack>
  );

  return <Grid gap={2}>{gridItems}</Grid>;
};

export default HabitGrid;