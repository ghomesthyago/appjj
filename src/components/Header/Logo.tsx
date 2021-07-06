import { Image } from '@chakra-ui/image'
import { useBreakpointValue, Text } from '@chakra-ui/react'

export function Logo() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (

    <>
    <Image src='/logo.png' alt="Logo JJ" width='50px' height='40px' />
    {
      isWideVersion && (
        <Text ml='20px' fontWeight='bold' fontSize='24px'>JJ Supermercados</Text>
      )
    }
    </>
  )
}