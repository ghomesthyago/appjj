import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function CircularGraf( { value } ) {
  return (
    <CircularProgress value={parseFloat(value)} size='90px' color={'#FF0055'} thickness="12px">
      <CircularProgressLabel fontSize={'sm'}>{parseFloat(value).toFixed(1)} %</CircularProgressLabel>
    </CircularProgress>
  )
}