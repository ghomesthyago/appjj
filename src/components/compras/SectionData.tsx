import { Box, Icon, Text, Flex, Divider, VStack, HStack } from '@chakra-ui/react'

export default function SectionData({ 
  month, 
  year,
  sectionName,
  sectionIcon,
  goals = [],
  salesGoal = [],
  vendas = []
}) {
  let meta = 0
  const compraSemana1 = salesGoal.find(sale => sale.SEMANA === 1) //salesGoal.map(sale => {if(sale.SEMANA === 1) { return parseFloat(sale.TOTAL) }})
  const compraSemana2 = salesGoal.find(sale => sale.SEMANA === 2)
  const compraSemana3 = salesGoal.find(sale => sale.SEMANA === 3)
  const compraSemana4 = salesGoal.find(sale => sale.SEMANA === 4)

  const metaSemana1 = vendas.find(sale => sale.SEMANA === 1)//vendas.map(sale => {if(sale.SEMANA === 1) { return (parseFloat(sale.TOTAL) * ((100 - meta)/100))}})
  const metaSemana2 = vendas.find(sale => sale.SEMANA === 2)
  const metaSemana3 = vendas.find(sale => sale.SEMANA === 3)
  const metaSemana4 = vendas.find(sale => sale.SEMANA === 4)

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

    //console.log(compraSemana1.TOTAL)
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
                  <Text fontSize='12px'>( { compraSemana1 === undefined || metaSemana1 === undefined ? 0 : ((compraSemana1.TOTAL / (metaSemana1.TOTAL * ((100 - meta)/100))) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{metaSemana1 === undefined ? 0 : (metaSemana1.TOTAL * ((100 - meta)/100)).toFixed(2) }</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Compra</Text>
                      <Text>{ compraSemana1 === undefined ? 0 : (compraSemana1.TOTAL).toFixed(2)  }</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' mt='10px' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à 14</Text>
                  <Text fontSize='12px'>( { compraSemana2 === undefined || metaSemana2 === undefined ? 0 : ((compraSemana2.TOTAL / (metaSemana2.TOTAL * ((100 - meta)/100))) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{ metaSemana2 === undefined ? 0 : (metaSemana2.TOTAL * ((100 - meta)/100)).toFixed(2)}</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Compra</Text>
                      <Text>{ compraSemana2 === undefined ? 0 : (compraSemana2.TOTAL).toFixed(2)  }</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' mt='10px' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à 21</Text>
                  <Text fontSize='12px'>( { compraSemana3 === undefined || metaSemana3 === undefined ? 0 : ((compraSemana3.TOTAL / (metaSemana3.TOTAL * ((100 - meta)/100))) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{metaSemana3 === undefined ? 0 : (metaSemana3.TOTAL * ((100 - meta)/100)).toFixed(2)}</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Compra</Text>
                      <Text>{ compraSemana3 === undefined ? 0 : (compraSemana3.TOTAL).toFixed(2)   }</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex align='center' flexDirection='column' borderBottom='1px solid #c1c1c1' mt='10px' >
                <HStack>
                  <Text fontSize='12px' m='0 10px'>01 à {ultimoDia}</Text>
                  <Text fontSize='12px'>( { compraSemana4 === undefined || metaSemana4 === undefined ? 0 : ((compraSemana4.TOTAL / (metaSemana4.TOTAL * ((100 - meta)/100))) * 100).toFixed(2) }% )</Text>
                </HStack>
                <Flex flexDirection='column' w='100%'>
                  <Flex flexDirection='row' justify='space-around' >
                    <Flex flexDirection='column' justify='center' align='flex-start'>
                      <Text fontSize='10px'>Meta</Text>
                      <Text>{metaSemana4 === undefined ? 0 : (metaSemana4.TOTAL * ((100 - meta)/100)).toFixed(2)}</Text>
                    </Flex>
                    <Flex flexDirection='column' justify='center' ml='10px'>
                      <Text fontSize='10px'>Compra</Text>
                      <Text>{ compraSemana4 === undefined ? 0 : (compraSemana4.TOTAL).toFixed(2)  }</Text>
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