import { 
  Box,
  HStack,
  Stack,
  Text,
  Flex,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  Collapse,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { GiCow, GiFruitBowl, GiShoppingCart, GiSlicedBread, GiShop } from 'react-icons/gi'
import { useState, useEffect } from 'react'

export function CollapseData(
  {
    shop,
    isLoading,
    sale,
  }
) {
  const [venda, setVenda] = useState(0)
  const [ticket, setTicket] = useState(0)
  const [lucro, setLucro] = useState(0)

  useEffect(() => {
    sale.map(sale => {
      if(sale !== undefined){
        setVenda(sale.TOTAL)
        setTicket(sale.TICKET)
        setLucro(sale.LUCRO_LIQ)
      } 
    })
  }, [sale])

  const { isOpen, onToggle } = useDisclosure()
  return(
    <Box
      p={["0","4"]}
      mb='8px'
      bg="gray.800"
      borderRadius={8}
    >
      {
        isLoading ? 
          <Stack w={'100%'} display={'flex'} justify='center' align='center' p={10}>
            <Spinner size='lg'/>
          </Stack> : 
          <>
            <HStack justify='center'>
              <Stack p={3}>
                <Text fontSize="16px" lineHeight='1'>{shop}</Text>
                <Stack w={'100%'} display={'flex'} extAlign='center'>
                  <Text fontSize='36px' lineHeight='1'>{venda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                  <HStack spacing='12' p='0 15px 0 15px'>
                    <VStack>
                      <Text fontSize='12px' lineHeight='1'>Ticket</Text>
                      <Text>{(venda / ticket).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                    </VStack>
                    <VStack>
                      <Text fontSize='12px' lineHeight='1'>Lucro</Text>
                      <Text>{lucro.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</Text>
                    </VStack>
                    <VStack>
                      <Text fontSize='12px' lineHeight='1'>Margem</Text>
                      <Text>{((lucro / venda)  * 100).toFixed(2)}%</Text>
                    </VStack>
                  </HStack>
                </Stack>
              </Stack>
              
            </HStack> 
            <Collapse in={isOpen} animateOpacity>
            </Collapse>      
            {//<Button size='sm' onClick={onToggle} as={isOpen ? RiArrowUpSLine : RiArrowDownSLine} variant={'unstyled'} w='100%'>Click Me</Button>
            }
          </>
        }
    </Box>
  )
} 