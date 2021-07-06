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
      
      decoded.map(obj => {
        obj.map(data => {
          if(typeof data === 'object') {
            data.map(user => {
              setUserName(user.DES_NOME)
              setMail(user.DES_EMAIL)
            })
          }
          
        })
        if(obj[0] === 'exp'){
          if(new Date(obj[1] * 1000) < new Date){
            router.push('/')
          }
        }
      })
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