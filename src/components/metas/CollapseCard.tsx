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
  useDisclosure
} from '@chakra-ui/react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { GiCow, GiFruitBowl, GiShoppingCart, GiSlicedBread, GiShop } from 'react-icons/gi'
import CircularGraf from './CircularGraf'
import SectionData from './SectionData'

export default function CollapseCard(
  {
    shop,
    isLoading,
    grafValue,
    saleValue,
    marginValue,
    ticketValue,
    month,
    year,
    salesGoal = [],
    goals = []
  }
) {
  const meta = (saleValue / goals.reduce((soma, atual) => { return (soma + atual.Value)}, 0) * 100).toFixed(2)
  const acougue = salesGoal.filter(vendas => vendas.SECAO === 'ACOUGUE')
  const padaria = salesGoal.filter(vendas => vendas.SECAO === 'PADARIA')
  const hortifruti = salesGoal.filter(vendas => vendas.SECAO === 'HORTIFRUTI')
  const mercearia = salesGoal.filter(vendas => vendas.SECAO === 'MERCEARIA')
  const { isOpen, onToggle } = useDisclosure()
  return(
    <Box
      p={["0","4"]}
      bg="gray.800"
      borderRadius={8}
    >
      {
        isLoading ? 
          <Stack w={'100%'} display={'flex'} justify='center' align='center' p={10}>
            <Spinner size='lg'/>
          </Stack> : 
          <>
            <HStack>
              <Stack p={3}>
                <Text fontSize="lg" p={3}>{shop}</Text>
                <Flex justify={'flex-start'} >
                  <CircularGraf value={ parseFloat(meta) !== Infinity ? meta : 0 }/>
                </Flex>
              </Stack>
              <Stack w={'100%'} display={'flex'} textAlign='center'>
                <Text>Venda</Text>
                <Text fontSize={22} fontWeight={'bold'}> { saleValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) } </Text> 
                <Text fontSize={14} color='gray.100'> Margem: { marginValue }% Ticket: { ticketValue }</Text>  
              </Stack>
            </HStack> 
            <Collapse in={isOpen} animateOpacity>
            <Box
              color="white"
              mt="4"
              rounded="md"
              shadow="md"
            >
              <SectionData month={month} year={year} sectionIcon={GiCow} sectionName={'Açougue'} salesGoal={acougue} goals={goals}/>
              <SectionData month={month} year={year} sectionIcon={GiFruitBowl} sectionName={'Hortifruti'} salesGoal={hortifruti} goals={goals}/>
              <SectionData month={month} year={year} sectionIcon={GiShoppingCart} sectionName={'Mercearia'} salesGoal={mercearia} goals={goals}/>
              <SectionData month={month} year={year} sectionIcon={GiSlicedBread} sectionName={'Padaria'} salesGoal={padaria} goals={goals}/>
              <SectionData month={month} year={year} sectionIcon={GiShop} sectionName={'Total'} salesGoal={salesGoal}/>
            </Box>
            </Collapse>      
            <Button size='sm' onClick={onToggle} as={isOpen ? RiArrowUpSLine : RiArrowDownSLine} variant={'unstyled'} w='100%'>Click Me</Button>
          </>
        }
    </Box>
  )
} 