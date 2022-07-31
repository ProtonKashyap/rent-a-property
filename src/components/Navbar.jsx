import { Flex, Box, Spacer } from '@chakra-ui/react';
import {TbSmartHome} from 'react-icons/tb';
import { Text } from '@chakra-ui/react';


const Navbar = () => (
  <Flex p='2' borderBottom='2px' borderColor='gray.100'>
    <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
        <Flex>
        <TbSmartHome /><Text paddingLeft="2">Rent A Property </Text>
        </Flex>
    </Box>
    <Spacer />
  </Flex>
);

export default Navbar;