import { Flex, Box, SimpleGrid, Text, theme, Spinner, Button, Icon, HStack,
  Stack,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import CollapseCard from '../components/metas/CollapseCard'
import { RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from 'next/dynamic'

export default function Metas() {

  const monthsName = [
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
  ]
  const [vendas, setVendas] = useState([])
  const [metas, setMetas] = useState([])
  const [vendasMetas, setVendasMetas] = useState([])
  const [vendasMetasTotal, setVendasMetasTotal] = useState([])
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [isLoading, setIsLoading] = useState(true)

  const clearData = [
    {"COD_LOJA":1,"TOTAL":0,"TICKET":0,"LUCRO_LIQ":0},
    {"COD_LOJA":2,"TOTAL":0,"TICKET":0,"LUCRO_LIQ":0},
    {"COD_LOJA":3,"TOTAL":0,"TICKET":0,"LUCRO_LIQ":0}
  ]
  
  useEffect(() => {
    async function getVendas() {
      setIsLoading(true)
      try {

        await api.post('/getSalesDay', {'month': month, 'year': year}).then((response) => {
          response.status === 200 ? setVendas(response.data) : setVendas(clearData)
        })
        await api.post('/getGoalsDay', {'month': month, 'year': year}).then((response) => {
          response.status === 200 ? setMetas(response.data) : setMetas(clearData)
        })

        setIsLoading(false)
      } catch(err) {
        setVendas(clearData)
        setIsLoading(false)
      }
    }
    getVendas()
  }, [month, year])

  const vendal1 = vendas.reduce((acc, vendas) => {
    if (vendas.COD_LOJA === 1) {
      return acc + vendas.VENDA
    } else {
      return acc
    }
  }, 0)

  const lucrol1 = vendas.reduce((acc, vendas) => {
    if (vendas.COD_LOJA === 1) {
      return acc + vendas.LUCRO_LIQ
    } else {
      return acc
    }
  }, 0)

  const vendal2 = vendas.reduce((acc, vendas) => {
    if (vendas.COD_LOJA === 2) {
      return acc + vendas.VENDA
    } else {
      return acc
    }
  }, 0)

  const lucrol2 = vendas.reduce((acc, vendas) => {
    if (vendas.COD_LOJA === 2) {
      return acc + vendas.LUCRO_LIQ
    } else {
      return acc
    }
  }, 0)

  const vendal3 = vendas.reduce((acc, vendas) => {
    if (vendas.COD_LOJA === 3) {
      return acc + vendas.VENDA
    } else {
      return acc
    }
  }, 0)

  const lucrol3 = vendas.reduce((acc, vendas) => {
    if (vendas.COD_LOJA === 3) {
      return acc + vendas.LUCRO_LIQ
    } else {
      return acc
    }
  }, 0)

  const vendaGeral = vendas.reduce((acc, vendas) => {
      return acc + vendas.VENDA
  }, 0)

  const lucroGeral = vendas.reduce((acc, vendas) => {
      return acc + vendas.LUCRO_LIQ
  }, 0)

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" p='10px'>
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="355px" align="flex-start">
          <Flex justify={'space-between'}>
            <HStack align={'center'} justify={'space-between'} minW={'170px'}>
              <Button as={RiArrowLeftSLine} size={'sm'} variant='unstyled'  onClick={() => {
                  if (month > 4 && year === 2022) {
                    setMonth(month - 1)
                  }
                  if (month > 0 && year > 2022) {
                    setMonth(month - 1)
                  }
                }} />
              <Text>{monthsName[month - 1]}</Text>
              <Button
              as={RiArrowRightSLine}
              size={'sm'}
              variant='unstyled'
              onClick={() => {
                 if (month > 2 && year === 2022 && month < new Date().getMonth()) {
                  setMonth(month + 1)
                 }
                 if (month < 11 && year > 2022 && year < new Date().getFullYear()) {
                  setMonth(month + 1)
                 }
              }}/>
            </HStack>
            <HStack align={'center'} justify={'space-between'} minW={'170px'}>
              <Button disabled={year <= 2022 ? true : false} as={RiArrowLeftSLine} size={'sm'} variant='unstyled' onClick={() => {
                  year > 2022 ? setYear(year - 1) : null
                }}/>
              <Text>{year}</Text>
              <Button disabled={year === new Date().getFullYear() ? true : false} as={RiArrowRightSLine} size={'sm'} variant='unstyled'onClick={() => {
                  year < new Date().getFullYear() ? setYear(year + 1) : null
                }}/>
            </HStack>
          </Flex>
          <CollapseCard 
            goals={metas.filter(data => data.loja === 1)}
            salesGoal={vendas.filter(data => data.COD_LOJA === 1)}
            month={month}
            year={year}
            shop={'Anchieta'}
            isLoading={isLoading}
            grafValue={ 57.8 }
            saleValue={ vendal1 }
            
            marginValue={ ((lucrol1 / vendal1 ) * 100).toFixed(2) }
            ticketValue={
              vendas.map(vendas => {
                if(vendas.COD_LOJA === 1) { 
                  return ((vendas.TOTAL / vendas.TICKET).toFixed(2))
                }
              })
            }
          />
          <CollapseCard 
            goals={metas.filter(data => data.loja === 2)}
            salesGoal={vendas.filter(data => data.COD_LOJA === 2)}
            month={month}
            year={year}
            shop={'Antunes'}
            isLoading={isLoading}
            grafValue={ 32.7 }
            saleValue={ vendal2 }
            marginValue={ ((lucrol2 / vendal2 ) * 100).toFixed(2) }
            ticketValue={
              vendas.map(vendas => {
                if(vendas.COD_LOJA === 2) { 
                  return (vendas.TOTAL / vendas.TICKET).toFixed(2)
                }
              })
            }
          />
          <CollapseCard 
            goals={metas.filter(data => data.loja === 3)}
            salesGoal={vendas.filter(data => data.COD_LOJA === 3)}
            month={month}
            year={year}
            shop={'Eldorado'}
            isLoading={isLoading}
            grafValue={ 84.8 }
            saleValue={ vendal3 }
            marginValue={ (( lucrol3 / vendal3 ) * 100).toFixed(2) }
            ticketValue={
              vendas.map(vendas => {
                if(vendas.COD_LOJA === 3) { 
                  return (vendas.TOTAL / vendas.TICKET).toFixed(2)
                }
              })
            }
          />
          <CollapseCard 
            goals={metas}
            salesGoal={vendas}
            month={month}
            year={year}
            shop={'Total'}
            isLoading={isLoading}
            grafValue={ 57.8 }
            saleValue={vendaGeral}
            marginValue={((lucroGeral / vendaGeral) * 100).toFixed(2)}
            ticketValue={(vendas.reduce((soma, atual) => { return (soma + atual.TOTAL)}, 0) / vendas.reduce((soma, atual) => { return (soma + atual.TICKET)}, 0)).toFixed(2)}
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}