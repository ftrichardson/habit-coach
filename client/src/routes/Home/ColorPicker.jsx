import {
    Center,
    Button,
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SimpleGrid,
} from '@chakra-ui/react';
  
const ColorPicker = ({ color, colorChangeHandler, buttonDisabledStateHandler }) => {
const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'pink', 'purple', 'gray'];

return (
    <>
    <Popover variant="outline">
        <PopoverTrigger>
        <Button
            background={`${color}.500`}
            _hover={{ background: `${color}.500` }}
            height="1.5rem"
            width="1.5rem"
            padding={0}
            minWidth="unset"
            borderRadius={3}
        ></Button>
        </PopoverTrigger>
        <PopoverContent width="10rem">
        <PopoverCloseButton color="white" mr={-1} />
        <PopoverHeader
            height="100px"
            backgroundColor={`${color}.500`}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
        >
            <Center height="100%">{`${color.charAt(0).toUpperCase()}${color.slice(1)}`}</Center>
        </PopoverHeader>
        <PopoverBody height="6rem">
            <SimpleGrid columns={5} spacing={1}>
            {colors.map((col) => (
                <Button
                key={col}
                background={`${col}.500`}
                height="1.5rem"
                width="1.5rem"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: `${col}.500` }}
                onClick={() => {
                    colorChangeHandler(col);
                    buttonDisabledStateHandler && buttonDisabledStateHandler(false);
                }}
                ></Button>
            ))}
            </SimpleGrid>
        </PopoverBody>
        </PopoverContent>
    </Popover>
    </>
);
};
  
export default ColorPicker;
  