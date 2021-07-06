import { Flex, Box, SimpleGrid, Text, HStack, Table, Thead, Tr, Th, Tbody, Td,} from '@chakra-ui/react'
import { SearchInput } from '../components/Products/SearchInput'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
 
export default function products() {
  return(
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box direction="column" flex="1" justify="center" align="center">
          <SearchInput />
          <Box
            p={["6","8"]}
            bg="gray.800"
            borderRadius={8}
            flex="1"
            justify="center"
            align="center"
            mt="4"
            maxWidth="600"
          >
          
            <Text fontSize={["md","xl"]} m="2">BANANA NANICA KG</Text>
            <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={["4","4","6"]} color="gray.300" width="8">
                  Loja
                </Th>
                <Th>Custo</Th>
                <Th>Venda</Th>
                <Th>Oferta</Th>
                <Th>Margem</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={["4","4","6"]}>
                  <Text fontWeight="bold">1</Text>
                </Td>
                <Td>
                  <Text>2.99</Text>
                </Td>
                <Td>
                  <Text>1.63</Text>
                </Td>
                <Td>
                  <Text></Text>
                </Td>
                <Td>
                  <Text>25.49%</Text>
                </Td>
              </Tr>
              <Tr>
                <Td px={["4","4","6"]}>
                  <Text fontWeight="bold">2</Text>
                </Td>
                <Td>
                  <Text>2.99</Text>
                </Td>
                <Td>
                  <Text>1.63</Text>
                </Td>
                <Td>
                  <Text></Text>
                </Td>
                <Td>
                  <Text>25.49%</Text>
                </Td>
                <Td>
                  <Text>243.5</Text>
                </Td>
              </Tr>
              <Tr>
                <Td px={["4","4","6"]}>
                  <Text fontWeight="bold">3</Text>
                </Td>
                <Td>
                  <Text>2.99</Text>
                </Td>
                <Td>
                  <Text>1.63</Text>
                </Td>
                <Td>
                  <Text></Text>
                </Td>
                <Td>
                  <Text>25.49%</Text>
                </Td>
                <Td>
                  <Text>243.5</Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}