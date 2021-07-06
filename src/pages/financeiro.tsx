import { Flex, Box, SimpleGrid, HStack, Text, theme, VStack } from '@chakra-ui/react'
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { useState, useEffect } from 'react';
import api from '../services/api'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
}) 

const optionsBar = {
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [10,20,30,40,50,60,70,80,90,90,90,90,90,90,90,90,90]
  },
  chart: {
    foreColor: theme.colors.gray[500],
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '90%',
      endingShape: 'rounded',
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
    theme: true,
 },
}

const seriesBar = [
  {
    name: 'valor', data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
  }
]

const modifiers = {
  alert: { daysOfWeek: [6] },
  warning: new Date(2021, 5, 19),
  monday: { daysOfWeek: [1] },
};

export default function Financeiro() {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('pt-br'));
  const [debits, setDebits] = useState([]);
  const [lockedDays, setLockedDays] = useState([]);

  useEffect(() => {
    async function getData() {
      await api.post('/getDebits', {"start": 180, "end": 180}).then((response) => {
        setDebits(response.data)
      })
    }

    const debitPush = [];

    debits.map((debit) => {
      if (debit.TOTAL > 50000) {
        debitPush.push(new Date(new Date(debit.DTA_VENCIMENTO).getFullYear(), new Date(debit.DTA_VENCIMENTO).getMonth(), new Date(debit.DTA_VENCIMENTO).getDate()))
      }
    })
    setLockedDays(debitPush)
    getData()
  }, [selectedDate])

  return (
    <Flex direction="column" h="100vh">
      <style>{`
          .DayPicker {
            border-radius: 10px;
          }
        
          .DayPicker-wrapper {
            padding-bottom: 0;
            
            border-radius: 10px;
          }
        
          .DayPicker {
            max-width: 225px;
          },

          .DayPicker-NavButton {
            color: #999591 !important;
          }
        
          .DayPicker-NavButton--prev {
            right: auto;
            left: 12px;
            margin-right: 0;
          }

          .DayPicker-NavButton--next {
            right: auto;
            left: 195px;
            margin-right: 0;
          }

          .DayPicker-Months {
            max-width: 225px;
          }
        
          .DayPicker-Month {
            border-collapse: separate;
            border-spacing: 4px;
            margin: 4px 0 0 0;
            padding: 4px;
            
            border-radius: 0 0 10px 10px;
          }
        
          .DayPicker-Caption {
            margin-bottom: 1em;
            padding: 0 2em;
            color: #f4ede8;
            font-size: 10pt;
            margin: 10px 0 0 0;
            > div {
              text-align: center;
            }
          }
        
          .DayPicker-Day {
            width: 8px;
            height: 8px;
            padding: 1px;
            font-size: 8pt;
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
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
          <Box
            p={["6","8"]}
            bg="gray.800"
            borderRadius={8}
          >
            <HStack>
              <DayPicker
                fixedWeeks 
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
                numberOfMonths={2}
                
                selectedDays={lockedDays}
                modifiers={{
                  
                }}

                onDayClick={(selected) => {setSelectedDate(selected.toLocaleDateString('pt-br'))}}
              />
              <Box
                width={'lg'}
                alignItems={'flex-start'}
                justifyContent={'flex-start'}
              >
                <SimpleGrid flex="1" gap="4" minChildWidth="380px" align="flex-start">
                  {/*<Chart options={optionsBar} series={seriesBar} type="bar" height={160} w={'100%'}/>*/}
                </SimpleGrid>
              </Box>
            </HStack>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}