import { Flex, Input as ChakraInput, Button, Stack, FormLabel, FormControl, FormErrorMessage, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error, ...rest}, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      { !!label && <FormLabel htmlFor={name} color='#fff'>{label}</FormLabel>}
      <ChakraInput name={name} id={name} focusBorderColor="red.500" color='gray.900' bgColor="#FFF" variant="filled" _hover={{bgColor: 'white.900'}} size="lg" ref={ref} {...rest}/>
      { !!error && (
        <FormErrorMessage>{error.message}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)