import { Box, Icon, Text, Flex, Divider, VStack, HStack } from '@chakra-ui/react'

export default function SectionData({ 
  month, 
  year,
  sectionName,
  sectionIcon,
  goals = [],
  salesGoal = []
}) {
  let meta = 0
  const metaSemana1 = salesGoal.map(sale => {if(sale.SEMANA === 1) { return parseFloat(sale.TOTAL) }})
  const metaSemana2 = salesGoal.map(sale => {if(sale.SEMANA === 2) { return parseFloat(sale.TOTAL) }})
  const metaSemana3 = salesGoal.map(sale => {if(sale.SEMANA === 3) { return parseFloat(sale.TOTAL) }})
  const metaSemana4 = salesGoal.map(sale => {if(sale.SEMANA === 4) { return parseFloat(sale.TOTAL) }})
  const loja1 = salesGoal.filter(data => data.SEMANA === 1)
    goals.map(data => {
      if(sectionName === 'Açougue' && data.Department === 'Acougue') {
        meta = data.Value
      }
      if(sectionName === 'Padaria' && data.Department === 'Frios') {
        meta = data.Value
      }
      if(sectionName === 'Hortifruti' && data.Department === 'Hortifruti') {
        meta = data.Value
      }
      if(sectionName === 'Mercearia' && data.Department === 'Mercearia') {
        meta = data.Value
      }
      if(sectionName === 'Total') {
        meta = data.reduce((soma, atual) => { return (soma + atual.Value)}, 0)
      }
    })
  const date = new Date(`${year}.${month}.01`)
  const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  
  return (
    <>
      <Box
        color="white"
        backgroundColor='whiteAlpha.100'
        p='10px 0'
        mt="4"
        rounded="md"
        shadow="md"
        flexDirection='column'
        justify='flex-start'
      >
        <Flex justify='space-between' align='flex-start' flexDirection='column'>
          <Flex flex-direction='row' align='center' justify='space-between' w='100%' >
          <Flex justify={'center'} align='center' flexDirection='column' minWidth='65px' borderRight='1px solid #FFF' pr='10px'>
            <Icon as={ sectionIcon } w='40px' h='40px'/>
            <Text fontSize='12px'>{ sectionName }</Text>
          </Flex>
            <Flex flexDirection='column' m='0 10px' w='100%'>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à 07</Text>
                  <Text fontSize='12px'>({ ((metaSemana1[0] / (meta * 0.24)) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{ (meta * 0.24).toFixed(2) }</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Venda</Text>
                      <Text>{salesGoal.map(sale => {if(sale.SEMANA === 1) { return parseFloat(sale.TOTAL).toLocaleString('pt-br', {minimumFractionDigits: 2}) }})}</Text>
                    </Flex>
                    <Flex flexDirection='column' align='center'>
                      <Text fontSize='10px'>Margem</Text>
                      <Text ml='10px'>{salesGoal.map(sale => {if(sale.SEMANA === 1) { return (parseFloat(sale.LUCRO_LIQ) / parseFloat(sale.TOTAL) * 100).toFixed(1)}})}%</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' mt='10px' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à 14</Text>
                  <Text fontSize='12px'>({ ((metaSemana2[1] / (meta * 0.47)) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{ (meta * 0.47).toFixed(2) }</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Venda</Text>
                      <Text>{salesGoal.map(sale => {if(sale.SEMANA === 2) { return parseFloat(sale.TOTAL).toLocaleString('pt-br', {minimumFractionDigits: 2}) }})}</Text>
                    </Flex>
                    <Flex flexDirection='column' align='center'>
                      <Text fontSize='10px'>Margem</Text>
                      <Text ml='10px'>{salesGoal.map(sale => {if(sale.SEMANA === 2) { return (parseFloat(sale.LUCRO_LIQ) / parseFloat(sale.TOTAL) * 100).toFixed(1)}})}%</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' mt='10px' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à 21</Text>
                  <Text fontSize='12px'>( { (( metaSemana3[2] / (meta * 0.69)) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{ (meta * 0.69).toFixed(2) }</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Venda</Text>
                      <Text>{salesGoal.map(sale => {if(sale.SEMANA === 3) { return parseFloat(sale.TOTAL).toLocaleString('pt-br', {minimumFractionDigits: 2}) }})}</Text>
                    </Flex>
                    <Flex flexDirection='column' align='center'>
                      <Text fontSize='10px'>Margem</Text>
                      <Text ml='10px'>{salesGoal.map(sale => {if(sale.SEMANA === 3) { return (parseFloat(sale.LUCRO_LIQ) / parseFloat(sale.TOTAL) * 100).toFixed(1)}})}%</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' mt='10px' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à {ultimoDia}</Text>
                  <Text fontSize='12px'>( { (( metaSemana4[3] / meta) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{ meta.toFixed(2) }</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Venda</Text>
                      <Text>{salesGoal.map(sale => {if(sale.SEMANA === 4) { return parseFloat(sale.TOTAL).toLocaleString('pt-br', {minimumFractionDigits: 2}) }})}</Text>
                    </Flex>
                    <Flex flexDirection='column' align='center'>
                      <Text fontSize='10px'>Margem</Text>
                      <Text ml='10px'>{salesGoal.map(sale => {if(sale.SEMANA === 4) { return (parseFloat(sale.LUCRO_LIQ) / parseFloat(sale.TOTAL) * 100).toFixed(1)}})}%</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex >
      </Box>
    </>
  )
}