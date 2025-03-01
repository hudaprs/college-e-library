import { useContext } from 'react'
import { UIContext } from './context'

export const useTheme = () => {
  const context = useContext(UIContext)
  if (!context) throw new Error('useTheme must be used within UIProvider')
  return context
}
