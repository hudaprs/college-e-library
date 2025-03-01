import { createContext } from 'react'

interface UIContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const UIContext = createContext<UIContextType | undefined>(undefined)
