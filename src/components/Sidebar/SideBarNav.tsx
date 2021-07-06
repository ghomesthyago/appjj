import { Stack } from '@chakra-ui/react'
import { NavSection } from './NavSection'
import { NavLink } from './NavLink'
import { RiDashboardLine, RiContactsLine, RiFundsLine, RiBarcodeLine, RiShoppingBasketLine, RiLineChartLine } from 'react-icons/ri'

export function SideBarNav() {
  return(
    <Stack spacing="12" align="flex-start">
      <NavSection title="RELATÓRIOS">
        <NavLink href="/vendas" icon={RiFundsLine}>Vendas</NavLink>
        <NavLink href="/compras" icon={RiShoppingBasketLine}>Compras</NavLink>
        <NavLink href="/metas" icon={RiLineChartLine}>Metas</NavLink>
        <NavLink href="/financeiro" icon={RiLineChartLine}>Financeiro</NavLink>
      </NavSection>
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href="/products" icon={RiBarcodeLine}>Produtos</NavLink>
        <NavLink href="/users"icon={RiContactsLine}>Usuários</NavLink>
      </NavSection>
    </Stack>
  )
}