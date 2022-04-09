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
import { RiArrowDownSLine, RiArrowUpSLine, RiCreativeCommonsSaLine } from 'react-icons/ri'
import { GiCow, GiFruitBowl, GiShoppingCart, GiSlicedBread, GiShop, GiConsoleController } from 'react-icons/gi'
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
  //const meta = (saleValue / goals.reduce((soma, atual) => { return (soma + atual.Value)}, 0) * 100).toFixed(2)
  const acougue = salesGoal.filter(vendas => vendas.SECAO === 'ACOUGUE')
  const padaria = salesGoal.filter(vendas => vendas.SECAO === 'PADARIA')
  const hortifruti = salesGoal.filter(vendas => vendas.SECAO === 'HORTIFRUTI')
  const mercearia = salesGoal.filter(vendas => vendas.SECAO === 'MERCEARIA')
  const metasAcougue = goals.filter(metas => metas.setor === 'acougue')
  const metasPadaria = goals.filter(metas => metas.setor === 'padaria')
  const metasHortifruti = goals.filter(metas => metas.setor === 'hortifruti')
  const metasMercearia = goals.filter(metas => metas.setor === 'mercearia')

  const newMetasAcougue = metasAcougue.map(data => {
    const total = metasAcougue
    .filter(meta => meta.dia === data.dia )
    .reduce((soma, atual) => soma + parseFloat((atual.meta).toString().replace(',','.')),0)
    return {
      dia: data.dia,
      loja: data.loja,
      setor: data.setor,
      meta: total,
      margem: data.margem
    }
  })

  const newMetasHortifruti = metasHortifruti.map(data => {
    const total = metasHortifruti
    .filter(meta => meta.dia === data.dia )
    .reduce((soma, atual) => soma + parseFloat((atual.meta).toString().replace(',','.')),0)
    return {
      dia: data.dia,
      loja: data.loja,
      setor: data.setor,
      meta: total,
      margem: data.margem
    }
  })

  const newMetasPadaria = metasPadaria.map(data => {
    const total = metasPadaria
    .filter(meta => meta.dia === data.dia )
    .reduce((soma, atual) => soma + parseFloat((atual.meta).toString().replace(',','.')),0)
    return {
      dia: data.dia,
      loja: data.loja,
      setor: data.setor,
      meta: total,
      margem: data.margem
    }
  })

  const newMetasMercearia = metasMercearia.map(data => {
    const total = metasMercearia
    .filter(meta => meta.dia === data.dia )
    .reduce((soma, atual) => soma + parseFloat((atual.meta).toString().replace(',','.')),0)
    return {
      dia: data.dia,
      loja: data.loja,
      setor: data.setor,
      meta: total,
      margem: data.margem
    }
  })

  const totalLoja = goals.reduce((soma, atual) => soma + parseFloat((atual.meta).toString().replace(',','.')), 0)
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
                  <CircularGraf value={ (saleValue / totalLoja ) * 100 }/>
                </Flex>
              </Stack>
              <Stack w={'100%'} display={'flex'} textAlign='center'>
                <Text>Venda</Text>
                <Text fontSize={22} fontWeight={'bold'}> { saleValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) } </Text> 
                <Text fontSize={14} color='gray.100'> Margem: {marginValue}% Ticket: 0</Text>  
              </Stack>
            </HStack> 
            <Collapse in={isOpen} animateOpacity>
            <Box
              color="white"
              mt="4"
              rounded="md"
              shadow="md"
            >
              <SectionData shopName={shop} month={month} year={year} sectionIcon={GiCow} sectionName={'Açougue'} salesGoal={acougue} goals={shop === 'Total' ? newMetasAcougue.filter(data => data.loja === 1) : newMetasAcougue}/>
              <SectionData shopName={shop} month={month} year={year} sectionIcon={GiFruitBowl} sectionName={'Hortifruti'} salesGoal={hortifruti} goals={shop === 'Total' ? newMetasHortifruti.filter(data => data.loja === 1) : newMetasHortifruti}/>
              <SectionData shopName={shop} month={month} year={year} sectionIcon={GiSlicedBread} sectionName={'Padaria'} salesGoal={padaria} goals={shop === 'Total' ? newMetasPadaria.filter(data => data.loja === 1) : newMetasPadaria}/>
              <SectionData shopName={shop} month={month} year={year} sectionIcon={GiShoppingCart} sectionName={'Mercearia'} salesGoal={mercearia} goals={shop === 'Total' ? newMetasMercearia.filter(data => data.loja === 1) : newMetasMercearia}/>
            </Box>
            </Collapse>      
            <Button size='sm' onClick={onToggle} as={isOpen ? RiArrowUpSLine : RiArrowDownSLine} variant={'unstyled'} w='100%'>Click Me</Button>
          </>
        }
    </Box>
  )
} 