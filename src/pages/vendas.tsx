import { Flex, Box, SimpleGrid, Text, HStack, Button, useDisclosure } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { CollapseData } from '../components/vendas/CollapseData'
import api from '../services/api'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useState, useEffect } from 'react';
import { RiExchangeCnyFill } from 'react-icons/ri';



export default function Vendas() {

  const clearData = [
    {"COD_LOJA":1,"TOTAL":0,"TICKET":0,"LUCRO_LIQ":0},
    {"COD_LOJA":2,"TOTAL":0,"TICKET":0,"LUCRO_LIQ":0},
    {"COD_LOJA":3,"TOTAL":0,"TICKET":0,"LUCRO_LIQ":0}
  ]
  
  const FORMAT = 'dd/MM/yyyy';
  const [isLoading, setIsLoading] = useState(true)
  const [vendas, setVendas] = useState(clearData)
  const [vendasEmporio, setVendasEmporio] = useState(clearData)
  const [range, setRange] = useState({from: new Date, to: new Date})
  const { from, to } = range
  const modifiers = { start: from, end: to }

  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleDayClick(day: Date) {
    if(day > new Date()) {
      day = new Date()
    }
    setIsLoading(true)
    setRange(DateUtils.addDayToRange(day, range))
  }

  function handleResetClick() {
    setRange({from: undefined, to: undefined})
  }

  useEffect(() => {
    async function getVendas() {
      setIsLoading(true)
      try {
        await api.post('/getSalesRange', {'from': range.from, 'to': range.to}).then((response) => {
          if (response.status === 200) {
            response.data[0].TOTAL === null ? setVendas(clearData) : setVendas(response.data)
          }
        })
        await api.post('/getSalesRangeEmporio', {'from': range.from, 'to': range.to}).then((response) => {
          if (response.status === 200) {
            response.data[0].TOTAL === null ? setVendasEmporio(clearData) : setVendasEmporio(response.data)
          }
        })
        setIsLoading(false)
      } catch(err) {
        setIsLoading(true)
      }
    }
    getVendas()
    
  }, [range])

  return (
    <Flex direction="column" h="100vh">
      <Header />
      
      <Box
        as='button'
        onClick={onOpen}
        p={["4","4"]}
        m={["2","6"]}
        bg="gray.800"
        borderRadius={8}
      >
        <Text textAlign='center'>
          {!from && !to && 'Selecione o período.'}
          {from && !to && 'Selecione o período.'}
          {from &&
            to &&
            `${from.toLocaleDateString()} à ${to.toLocaleDateString()}`}{' '}
        </Text>
      </Box>
      <Flex align='center' justify='center'>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg='gray.900' m='10px' maxW='360px' >
          <ModalBody>
          <DayPicker
            fixedWeeks
            className="Selectable"
            numberOfMonths={1}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={handleDayClick}
            weekdaysShort={['D','S','T','Q','Q','S','S']}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
          />
          </ModalBody>

          <Flex justify='center' m='0 10px 10px 10px'>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              OK
            </Button>
            <Button variant="ghost" onClick={handleResetClick}>Limpar</Button>
          </Flex>
        </ModalContent>
      </Modal>
      </Flex>
      <style>{`
          .DayPicker {
            border-radius: 10px;
          }
        
          .DayPicker-wrapper {
            padding-bottom: 0;
            
            border-radius: 10px;
          }
        
          .DayPicker {
            max-width: 360px;
          },

          .DayPicker-NavButton {
            color: #999591 !important;
          }
        
          .DayPicker-NavButton--prev {
            right: auto;
            left: 15px;
            margin-right: 0;
          }

          .DayPicker-NavButton--next {
            right: auto;
            left: 280px;
            margin-right: 0;
          }

          .DayPicker-Months {
            max-width: 360px;
          }
        
          .DayPicker-Month {
            border-collapse: separate;
            border-spacing: 4px;
            margin: 4px 0 0 0;
            padding: 4px;
            
            border-radius: 0 0 10px 10px;
          }
        
          .DayPicker-Caption {
            text-align: center;
            margin-bottom: 1em;
            padding: 0 2em;
            color: #f4ede8;
            font-size: 12pt;
            margin: 10px 0 0 0;
            > div {
              text-align: center;
            }
          }
        
          .DayPicker-Day {
            width: 12px;
            height: 12px;
            padding: 8px;
            font-size: 16pt;
          }
        
          .DayPicker-Day--available:not(.DayPicker-Day--outside) {
            background: #ECC94B;
            border-radius: 10px;
            color: #232129 !important;
          }
        
          .DayPicker:not(.DayPicker--interactionDisabled)
            .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
            background: shade(0.2, '#3e3b47');
          }
        
          .DayPicker-Day--today {
            font-weight: normal;
            color: #38B2AC;
          }
        
          .DayPicker-Day--disabled {
            color: #666360 !important;
            background: transparent !important;
          }
        
          .DayPicker-Day--selected {
            background: #E53E3E !important;
            border-radius: 5px;
            color: #63171B !important;
          }
          `}</style>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid flex="1" minChildWidth="320px" maxWidth={400} align="center">
        
        <CollapseData shop={'Anchieta'} isLoading={isLoading} 
          sale={ vendas.filter(venda => venda.COD_LOJA === 1) }
        />
        <CollapseData shop={'Antunes'} isLoading={isLoading} 
          sale={ vendas.filter(venda => venda.COD_LOJA === 2) }
        />
        <CollapseData shop={'Eldorado'} isLoading={isLoading} 
          sale={ vendas.filter(venda => venda.COD_LOJA === 3) }
        />
        <CollapseData shop={'TOTAL JJ'} isLoading={isLoading} 
          sale={ vendas.filter(venda => venda.COD_LOJA === 4) }
        />
        <CollapseData shop={'Empório Jota'} isLoading={isLoading} 
          sale={ vendasEmporio.filter(venda => venda.COD_LOJA === 1) }
        />
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}