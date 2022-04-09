import { Flex, Button, Stack, FormLabel, FormControl, SlideFade, Image } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'
import api from '../services/api'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import router from 'next/router'

async function getUser (user: string, password: string) {
  const hashPassword = password
  await api.post('/users', { user, hashPassword}).then((response) => {
    if (response.status !== 200) {
      return 'Status failed'
    } else {
      return response.data
    }
  })
}

const signInFormSchema = yup.object().shape({
  user: yup.string().required('Usuário obrigatório.'),
  password: yup.string().required('Senha obrigatória.')
})

type SignInFormData = {
  user: string;
  password: string;
}

export default function SignIn() {
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })
  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    const hashPassword = values.password
    const user = values.user.toLowerCase()
    await api.post('/users', { user, hashPassword}).then((response) => {
      if (response.status !== 200) {
        return 'Status failed'
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem('@jj-token',response.data)
          router.push('/vendas')
        }
      }
    })
  }
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" bg='#ef342c'>
      <Flex as="form" width="100%" maxWidth="360px" bg='#ef342c' p="4" borderRadius="8" flexDir="column" onSubmit={handleSubmit(handleSignIn)}>
        <Flex justify='center' mb='60px'>
          <SlideFade in={true} offsetY="120px">
            <Image src='logoFull.png' w='300px' h='250px'/>
          </SlideFade>
        </Flex>
        <Stack spacing={4}>
          <Input
            type="string"
            name="user"
            label="Usuário" 
            error={errors.user}
            {...register('user')}/>
          <Input
            type="password"
            name="password"
            label="Senha"
            error={errors.password}
            {...register('password')}/>
        </Stack>
        <Button type="submit" h='48px' mt="12" bg='#FFF' color='#ef342c'>ENTRAR</Button>
      </Flex>
    </Flex>
  )
}
