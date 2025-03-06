export type SidebarContentProps = {
  isCollapsed: boolean
  isMobile: boolean
}

export type SidebarItem = {
  key: string
  label: string
  icon?: React.ReactNode
  children?: SidebarItem[]
  onClick?: () => void
}
