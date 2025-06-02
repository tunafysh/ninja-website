export interface NavigationItem {
  name: string
  href: string
  category?: string
  order?: number
}

export interface DocsLayoutProps {
  children: React.ReactNode
}

export interface SidebarProps {
  navigation?: NavigationItem[]
}

export interface MDXComponents {
  [key: string]: React.ComponentType<any>
}