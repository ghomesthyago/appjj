import { 
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Icon,
  Text,
  Flex,
  Divider,
  VStack,
  HStack,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure } from '@chakra-ui/react'

import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri'

export default function SectionData({ 
  month, 
  year,
  sectionName,
  shopName,
  sectionIcon,
  goals = [],
  salesGoal = []
}) {

  const venda = salesGoal.reduce((soma, atual) => soma + atual.VENDA, 0)
  const lucro = salesGoal.reduce((soma, atual) => soma + atual.LUCRO_LIQ, 0)
  const date = new Date(`${year}.${month}.01`)
  const meta = goals.reduce((soma, atual) => soma + parseFloat(atual.meta), 0)
  let margemMeta = goals.reduce((soma, atual) => soma + parseFloat((atual.margem).toString().replace(',','.')), 0)
  margemMeta = (margemMeta / goals.length) * 100
  let somaTotal = []
  const ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  const dias = salesGoal.map(data => data.DIA)
  const diasResumido = []
  dias.map(dia => {
    if(!diasResumido.includes(dia)) {
      diasResumido.push(dia)
    }
  })
  diasResumido.map(data => {
    const venda = salesGoal.filter(dia => data === dia.DIA )
    const somaVenda = venda.reduce((soma, atual) => soma + atual.VENDA, 0)
    const somaLucro = venda.reduce((soma, atual) => soma + atual.LUCRO_LIQ, 0)
    somaTotal.push({
      DIA: data,
      VENDA: somaVenda,
      LUCRO_LIQ: somaLucro,
      SECAO: sectionName,
      MARGEM: (somaLucro / somaVenda)
    })
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const dados = shopName === 'Total' ? somaTotal : salesGoal
  return (
    <>
      <Box
        color="white"
        backgroundColor='whiteAlpha.100'
        p='10px'
        m="16px 10px 0 10px"
        rounded="md"
        shadow="md"
        flexDirection='column'
        justify='flex-start'
      >
        <Text mb='8px'><Icon as={sectionIcon} w='40px' h='40px' mr='8px' />{sectionName} - {((venda / meta)*100).toFixed(2)}% Concluído</Text>
        <Divider />
        <Text textAlign={'justify'} width='100%' fontSize={12} m='12px 0 8px 0'>Meta: {meta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} ({margemMeta.toFixed(2)}%) - Venda: {venda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} ({((lucro / venda) * 100).toFixed(2)}%)</Text>
        <Progress value={(venda / meta )*100}  size='sm' colorScheme='cyan' />
        <Flex justifyContent='center' alignItems='center' m='12px 0 4px 0'>
          <Button onClick={onOpen} variant='link' color='gray.50' fontWeight='normal'>Ver detalhes</Button>
        </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg='purple.50' m='8px'>
          <ModalHeader color='gray.900'>{sectionName} - {shopName}</ModalHeader>
          <ModalCloseButton color={'gray.900'}/>
          <ModalBody color='gray.900' p='12px'>
            <TableContainer>
              <Table variant='striped' colorScheme='gray' size='sm'>
                <Thead>
                  <Tr>
                    <Th textAlign={'center'}>Dia</Th>
                    <Th textAlign={'center'}>Meta</Th>
                    <Th textAlign={'center'}>Venda</Th>
                    <Th isNumeric textAlign={'center'}>Margem</Th>
                  </Tr>
                </Thead>
                <Tbody >
                  {
                    dados.map(data => {
                      //console.log(shopName)
                      const day = new Date(data.DIA).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
                      const margem = ((data.LUCRO_LIQ / data.VENDA) * 100)
                      const meta = goals.find(data => data.dia === day.substring(0,10))
                      const margemMeta = meta.margem
                      return (
                        <Tr>
                          <Td pl='8px' pt='4px' pb='4px' textAlign={'center'}>{day.substring(1,2)}</Td>
                          <Td pt='4px' pb='4px' textAlign={'center'}>{meta.meta.toFixed(2)}</Td>
                          <Td pt='4px' pb='4px' textAlign={'center'}>{data.VENDA.toFixed(2)}</Td>
                          <Td pr='8px' pb='4px' pt='4px' display='flex' justifyContent='space-between' alignItems={'center'}>{margem.toFixed(2)}% {margem > (parseFloat(margemMeta.replace(",",".")) * 100) ? <RiArrowUpSFill color='green' size={'20px'}/> : <RiArrowDownSFill size={'20px'} color='red'/>}</Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' colorScheme='gray' color='gray.900' mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  )
}