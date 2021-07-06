import { Flex, Input, Icon, Button } from '@chakra-ui/react'
import { RiSearchLine } from 'react-icons/ri'

export function SearchInput() {
  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Código do produto"
        _placeholder={{color: 'gray.400'}}
        px="4"
        mr="4"
      />
      <Button as="a" colorScheme="blackAlpha" borderRadius="50">
        <Icon as={RiSearchLine} fontSize="20"/>
      </Button>
    </Flex>
      
  )
}