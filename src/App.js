import "./App.css";
import {
  ChakraProvider,
  Flex,
  Spacer,
  Box,
  Button,
  Text,
  SimpleGrid,
  Image,
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

  //using useEffect Hook to create side effect
  useEffect(() => {}, [properties]);

  //Get the props from select options
  const [bed, setBed] = useState(0);
  const [price, setPrice] = useState(0);
  const [bath, setBath] = useState(0);
  const [type, setType] = useState("");

  //Select options
  const prices = uniqueBy("price").sort(valueSort).map(toOptions);
  const beds = uniqueBy("beds").sort(valueSort).map(toOptions);
  const baths = uniqueBy("baths").sort(valueSort).map(toOptions);
  const types = uniqueBy("type").map(toOptions);

  //filter the properties
  function filterProperies() {
    console.log("bed",bed,"price", price,"bath", bath,"type",type);
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
          <SimpleGrid minChildWidth="150px" spacing="10px">
            <Select
              options={prices}
              placeholder="Price"
              onChange={(e) => setPrice(e.value)}
            />
            <Spacer />
            <Select
              placeholder="No. of Beds"
              options={beds}
              onChange={(e) => setBed(e.value)}
            />
            <Spacer />
            <Select
              options={types}
              placeholder="Type"
              variant="Outline"
              onChange={(e) => setType(e.value)}
            />
            <Spacer />
            <Select
              options={baths}
              placeholder="No. of Bathroom"
              variant="Outline"
              onChange={(e) => setBath(e.value)}
            />
            <Spacer />
            <Button colorScheme="blue" onClick={filterProperies}>
              Search
            </Button>
          </SimpleGrid>
        </Box>
        <Flex flexWrap="wrap" p="2">
          {properties.map((property) => (
            <Property key={property.id} details={property} />
          )) || (
            <Box>
              <Image src={NotFound} width={400} height={240} alt="property" />
            </Box>
          )}
        </Flex>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
