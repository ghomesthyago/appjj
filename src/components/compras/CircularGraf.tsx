import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function CircularGraf( { value } ) {
  let color = 'green.400'

  if ( value <= 75 ) {
    color = 'green.400'
  }
  if ( value > 75 && value <= 85 ) {
    color = 'yellow.300'
  }
  if (value > 85 ) {
    color = 'red.500'
  }

  return (
    <CircularProgress value={parseFloat(value)} size='90px' color={color} thickness="12px">
      <CircularProgressLabel fontSize={'sm'}>{parseFloat(value).toFixed(1)} %</CircularProgressLabel>
    </CircularProgress>
  )
}