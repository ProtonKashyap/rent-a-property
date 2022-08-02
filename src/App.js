import "./App.css";
import {
  ChakraProvider,
  Flex,
  Spacer,
  Box,
  Button,
  Text,
  Image,
  Stack,
  HStack,
} from "@chakra-ui/react";
import Select from "react-select";
import Layout from "./components/Layout";
import sampleProperties from "./sample-houses";
import Property from "./components/Property";
import { useState, useEffect } from "react";
import NotFound from "./notfound.jpg";

function uniqueBy(prop) {
  return sampleProperties.reduce((a, b) => {
    if (!a.includes(b[prop])) {
      a.push(b[prop]);
    }
    return a;
  }, []);
}
function toOptions(option) {
  return {
    value: option,
    label: option.toString(),
  };
}

function valueSort(a, b) {
  return a - b;
}

function App() {
  //set state of properties
  const [properties, setProperties] = useState(sampleProperties);
  let isEmptyProperty = properties.length === 0;

  //using useEffect Hook to create side effect
  useEffect(() => {
    console.log(properties);
  }, [properties]);

  //Get the props from select options
  const [bed, setBed] = useState(0);
  const [price, setPrice] = useState(0);
  const [bath, setBath] = useState(0);
  const [type, setType] = useState("");
  console.log("Beds :", bed, "Price :", price, "Bath :", bath, "Type :", type);

  //Select options
  const prices = uniqueBy("price")
    .sort(valueSort)
    .map((p) => {
      return { value: p, label: `<=${p.toString()}` };
    });
  const beds = uniqueBy("beds").sort(valueSort).map(toOptions);
  const baths = uniqueBy("baths").sort(valueSort).map(toOptions);
  const types = uniqueBy("type").map(toOptions);

  //Filter the properties
  function filterProperies() {
    const filteredProps = sampleProperties
      .filter((prop) => {
        if (!bath) return true;
        else return prop["baths"] === bath;
      })
      .filter((prop) => {
        if (!bed) return true;
        else return prop["beds"] === bed;
      })
      .filter((prop) => {
        if (!price) return true;
        else return prop["price"] <= price;
      })
      .filter((prop) => {
        if (!type) return true;
        else return prop["type"] === type;
      });
    setProperties(filteredProps);
  }

  return (
    <ChakraProvider>
      <Layout>
        <Text fontSize="4xl" fontWeight="bold" p="5">
          Search properties for rent
        </Text>
        <Box>
          <Stack direction={["column", "row"]} spacing="24px">
            <Spacer />
            <Select
            className="basic-single"
            placeholder=" Price of Property "
            options={prices}
            onChange={(e) => setPrice(e.value)}
            />
            <Select
              placeholder="No. of Beds"
              options={beds}
              onChange={(e) => setBed(e.value)}
            />
            <Select
              w="10px"
              options={types}
              placeholder="Type of Property"
              variant="Outline"
              onChange={(e) => setType(e.value)}
            />
            <Select
              options={baths}
              placeholder="No. of Bathroom"
              variant="Outline"
              onChange={(e) => setBath(e.value)}
            />
            <Button colorScheme="blue" onClick={filterProperies}>
              Search
            </Button>
          </Stack>
        </Box>
        <Flex flexWrap="wrap" paddingTop="5">
          {(isEmptyProperty && (
            <Box boxSize="xl">
              <HStack spacing="24px">
                <Image
                  src={NotFound}
                  width={1000}
                  height={500}
                  alt="Not found"
                />
                <Spacer />
                <Text fontSize="8xl">Sorry no properties found</Text>
              </HStack>
            </Box>
          )) ||
            properties.map((property) => (
              <Property key={property.id} details={property} />
            ))}
        </Flex>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
