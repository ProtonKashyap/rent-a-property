import { Box, Flex, Text } from "@chakra-ui/layout";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { Image } from "@chakra-ui/react";
import { TbSmartHome } from "react-icons/tb";

const Property = ({ details: { image, price, beds, baths, area, type } }) => {
  /*if(!price)
  {
    return(
      <Box>
        <img src={NotFound} width={400} height={260} alt="property" />
      </Box>
    );
  }*/
  return (
    <Flex
      flexWrap="wrap"
      w="420px"
      p="5"
      paddingTop="0px"
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box>
        <Image src={image} width={400} height={260} alt="property" />
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Text fontWeight="bold" fontSize="lg">
              ₹{price}/month
            </Text>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {beds} <FaBed /> | {baths} <FaBath /> | {area} sqft <BsGridFill /> |
          {type} <TbSmartHome />
        </Flex>
      </Box>
    </Flex>
  );
};
export default Property;
