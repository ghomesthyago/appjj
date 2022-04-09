import { Flex, Box, Text, Avatar } from '@chakra-ui/react'
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react'
import router from 'next/router'

interface ProfileProps {
  showProfileData?: boolean;
}

interface IDecoded {
  data: Array<[]>,
  iat: String,
  exp: String
}

export function Profile({showProfileData = true}: ProfileProps) {
  const [userName, setUserName] = useState('')
  const [mail, setMail] = useState('')
  
  useEffect(() => {
    if (typeof window !== "undefined") {

      if(!localStorage.getItem('@jj-token')){
        router.push('/')
      }

      const decoded = Object.entries(jwt.decode(localStorage.getItem('@jj-token')))
      //console.log(decoded[0][1][0].DES_NOME)
      setUserName(decoded[0][1][0].DES_NOME)
      setMail(decoded[0][1][0].DES_EMAIL)
      //console.log(new Date(decoded[2][1] * 1000))
      new Date(decoded[2][1] * 1000) < new Date ?  router.push('/') : null 
    } else {
      console.log('not window')
    }
  },[])
  
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text> { userName } </Text>
          <Text color="gray.300" fontSize="small"> { mail } </Text>
        </Box>
      )}
      <Avatar size="md" name={ userName } />
    </Flex>
  )
}