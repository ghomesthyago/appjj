import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { Profile } from './Profile'
import { NotificationsNav } from './NotificationsNav'
import { SearchBox } from './SearchBox'
import { Logo } from './Logo'
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext'

export function Header() {
  const { onOpen } = useSidebarDrawer()
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px='10px'
      align="center"
    >
      { !isWideVersion && (
        <IconButton 
          aria-label="Open Navigation"
          mr="2"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
        >

        </IconButton>
      )}
    <Logo />
      <Flex align="center" ml="auto">
        {
          //<NotificationsNav />
        }
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  )
}