import { Flex, Box, SimpleGrid, Text, theme, Spinner, Button, Icon, HStack,
  Stack,
  Stat,
  StatLabel,
  StatNumber
} from '@chakra-ui/react'
import CollapseCard from '../components/compras/CollapseCard'
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
  const [compras, setCompras] = useState([])
  const [vendas, setVendas] = useState([])
  const [metas, setMetas] = useState([])
  const [vendasMetas, setVendasMetas] = useState([])
  const [vendasSetor, setVendasSetor] = useState([])
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
      setCompras(clearData)
      setVendas(clearData)
      setMetas(clearData)
      setVendasSetor(clearData)
      setIsLoading(true)
      try {
        await api.post('/getPurchaseMonth', {'month': month, 'year': year}).then((response) => {
          response.status === 200 ? setCompras(response.data) : setCompras(clearData)
          setIsLoading(false)
        })
        await api.post('/getSalesMonth', {'month': month, 'year': year}).then((response) => {
          response.status === 200 ? setVendas(response.data) : setVendas(clearData)
          setIsLoading(false)
        })
        await api.post('/getPurchase', {'month': month, 'year': year}).then((response) => {
          if( response.status === 200) {
            setVendasMetas(response.data)
          } else {
            setVendasMetas(clearData)
          }
          setIsLoading(false)
        })
        await api.post('/getOrderGoals').then((response) => {
          response.status === 200 ? setMetas(response.data) : setMetas(clearData)
          setIsLoading(false)
        })
        await api.post('/getSalesGoal', {'month': month, 'year': year}).then((response) => {
            response.status === 200 ? setVendasSetor(response.data) : setVendasSetor(clearData)
            setIsLoading(false)
        })
      } catch(err) {
        setCompras(clearData)
        setIsLoading(false)
      }
    }
    getVendas()
    
  }, [month, year])

  let vendal1 = 0
  let vendal2 = 0
  let vendal3 = 0

  let valVendal1 = 0
  let valVendal2 = 0
  let valVendal3 = 0

  compras.map(data => {
    if(data.COD_LOJA === 1) {
      vendal1 = data.TOTAL
    }
    if(data.COD_LOJA === 2) {
      vendal2 = data.TOTAL
    }
    if(data.COD_LOJA === 3) {
      vendal3 = data.TOTAL
    }
  })

  
  vendas.map(data => {
    if(data.COD_LOJA === 1) {
      valVendal1 = data.TOTAL
    }
    if(data.COD_LOJA === 2) {
      valVendal2 = data.TOTAL
    }
    if(data.COD_LOJA === 3) {
      valVendal3 = data.TOTAL
    }
  })

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" p='10px'>
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="355px" align="flex-start">
          <Flex justify={'space-between'}>
            <HStack align={'center'} justify={'space-between'} minW={'170px'}>
              <Button as={RiArrowLeftSLine} size={'sm'} variant='unstyled'  onClick={() => {
                  month > 0 ? setMonth(month - 1) : null
                }} />
              <Text>{monthsName[month - 1]}</Text>
              <Button as={RiArrowRightSLine} size={'sm'} variant='unstyled'onClick={() => {
                  month < 11 ? setMonth(month + 1) : null
                }}/>
            </HStack>
            <HStack align={'center'} justify={'space-between'} minW={'170px'}>
              <Button as={RiArrowLeftSLine} size={'sm'} variant='unstyled'  onClick={() => {
                  year <= new Date().getFullYear() ? setYear(year - 1) : null
                }}/>
              <Text>{year}</Text>
              <Button as={RiArrowRightSLine} size={'sm'} variant='unstyled'onClick={() => {
                  year < new Date().getFullYear() ? setYear(year + 1) : null
                }}/>
            </HStack>
          </Flex>
          <CollapseCard 
            goals={metas.filter(metas => metas.Month === month && metas.Year === year && metas.Shop === 1)}
            salesGoal={vendasMetas.filter(data => data.COD_LOJA === 1)}
            month={month}
            year={year}
            shop={'Anchieta'}
            isLoading={isLoading}
            vendasSetor={vendasSetor.filter(data => data.COD_LOJA === 1)}
            grafValue={ 57.8 }
            saleValue={ vendal1 }
            valVenda={ valVendal1 }
            marginValue={
              compras.map(compras => {
              if(compras.COD_LOJA === 1) { 
                return ((compras.LUCRO_LIQ / compras.TOTAL) * 100).toFixed(1)
              }
            })}
            ticketValue={
              compras.map(compras => {
                if(compras.COD_LOJA === 1) { 
                  return ((compras.TOTAL / compras.TICKET).toFixed(2))
                }
              })
            }
          />
          <CollapseCard 
            goals={metas.filter(metas => metas.Month === month && metas.Year === year && metas.Shop === 2)}
            salesGoal={vendasMetas.filter(data => data.COD_LOJA === 2)}
            month={month}
            year={year}
            shop={'Antunes'}
            vendasSetor={vendasSetor.filter(data => data.COD_LOJA === 2)}
            isLoading={isLoading}
            grafValue={ 32.7 }
            valVenda={ valVendal2 }
            saleValue={ vendal2 }
             marginValue={
              compras.map(compras => {
              if(compras.COD_LOJA === 2) { 
                return ((compras.LUCRO_LIQ / compras.TOTAL) * 100).toFixed(1)
              }
            })}
            ticketValue={
              compras.map(compras => {
                if(compras.COD_LOJA === 2) { 
                  return (compras.TOTAL / compras.TICKET).toFixed(2)
                }
              })
            }
          />
          <CollapseCard 
            goals={metas.filter(metas => metas.Month === month && metas.Year === year && metas.Shop === 3)}
            salesGoal={vendasMetas.filter(data => data.COD_LOJA === 3)}
            month={month}
            year={year}
            shop={'Eldorado'}
            isLoading={isLoading}
            grafValue={ 84.8 }
            valVenda={ valVendal3 }
            vendasSetor={vendasSetor.filter(data => data.COD_LOJA === 3)}
            saleValue={ vendal3 }
            marginValue={
              compras.map(compras => {
              if(compras.COD_LOJA === 3) { 
                return ((compras.LUCRO_LIQ / compras.TOTAL) * 100).toFixed(1)
              }
            })}
            ticketValue={
              compras.map(compras => {
                if(compras.COD_LOJA === 3) { 
                  return (compras.TOTAL / compras.TICKET).toFixed(2)
                }
              })
            }
          />
          <CollapseCard 
            goals={metas.filter(metas => metas.Month === month && metas.Year === year && metas.Shop === 4)}
            salesGoal={vendasMetas}
            month={month}
            year={year}
            shop={'Total'}
            isLoading={isLoading}
            grafValue={ 57.8 }
            valVenda={ valVendal1 + valVendal2 + valVendal3 }
            vendasSetor={vendasSetor.filter(data => data.COD_LOJA === 3)}
            saleValue={compras.reduce((soma, atual) => {
              return (soma + atual.TOTAL)
            }, 0)}
            marginValue={
              ((compras.reduce((soma, atual) => { return (soma + atual.LUCRO_LIQ)}, 0) / compras.reduce((soma, atual) => { return (soma + atual.TOTAL)}, 0)) * 100).toFixed(1)}
            ticketValue={(compras.reduce((soma, atual) => { return (soma + atual.TOTAL)}, 0) / compras.reduce((soma, atual) => { return (soma + atual.TICKET)}, 0)).toFixed(2)}
          />
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}