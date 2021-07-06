import { Flex, Box, SimpleGrid, Text, theme } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import api from '../services/api'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
}) 

export default function Dashboard() {
  
  const [vendas, setVendas] = useState([])
  const [contas, setContas] = useState([])
  
  const datas = []
  const datasContas = []

  vendas.map((data) => {
     datas.push(data.DIA)
  })

  contas.map((data) => {
    datasContas.push(data.DTA_VENCIMENTO)
  })

  function getDataContas() {
    return datasContas
  }

  function getDatas() {
    return datas
  }

  const valor = vendas.map((data) => {
    return data.TOTAL.toFixed(2)
  })

  const ticket = vendas.map((data) => {
    return data.TICKET
  })

  const contasPagar = contas.map((data) => {
    return data.TOTAL.toFixed(2)
  })
  
  const series = [
    {
      name: 'valor', data: valor
    }
  ]

  const seriesBar = [
    {
      name: 'valor', data: contasPagar
    }
  ]

  const tickets = [
    {
      name: 'Ticket', data: ticket
    }
  ]

  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      foreColor: theme.colors.gray[500]
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
       enabled: true,
       theme: 'gray.800',
    },
    xaxis:{
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: getDatas()
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        opacityFrom: 0.7,
        opacityTo: 0.3
      }
    }
  }

  const optionsBar: ApexOptions = {
    xaxis: {
      type: 'datetime',
      axisBorder: {
        color: theme.colors.gray[600]
      },
      axisTicks: {
        color: theme.colors.gray[600]
      },
      categories: getDataContas()
    },
    chart: {
      foreColor: theme.colors.gray[500],
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '90%',
        
        colors: {
          ranges: [{
              from: 0,
              to: 1000000,
              color: '#FF1654'
          }],
          backgroundBarColors: [],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 0,
      },
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      enabled: true,
      theme: 'gray.800',
   },
  }

  useEffect(() => {
    async function getVendas() {
      await api.post('/getSales', {'days': 7}).then((response) => {
        setVendas(response.data)
      })
      await api.post('/getDebits', {'start': 15, 'end': 15}).then((response) => {
        setContas(response.data)
      })
    }
    getVendas()
  }, [])
  
  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="380px" align="flex-start">
          <Box
            p={["2","4"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Vendas da semana</Text>
            <Chart options={options} series={series} type="area" height={160}/>
          </Box>
          <Box
            p={["2","4"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Clientes</Text>
            <Chart options={options} series={tickets} type="area" height={160}/>
          </Box>
          <Box
            p={["2","4"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Compra X Vendas</Text>
            <Chart options={options} series={tickets} type="area" height={160}/>
          </Box>
          <Box
            p={["2","4"]}
            bg="gray.800"
            borderRadius={8}
          >
            <Text fontSize="lg" mb="4">Contas a pagar</Text>
            <Chart options={optionsBar} series={seriesBar} type="bar" height={160}/>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}