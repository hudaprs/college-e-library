import { useEffect, useState } from 'react'
import { ConfigProvider, theme } from 'antd'
import type { UIProviderProps } from './types'
import { StyleProvider } from '@ant-design/cssinjs'
import { UIContext } from './context'

export const UIProvider = ({ children }: UIProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(prev => !prev)

  return (
    <UIContext.Provider value={{ isDarkMode, toggleTheme }}>
      <StyleProvider layer>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
            cssVar: true
          }}
        >
          {children}
        </ConfigProvider>
      </StyleProvider>
    </UIContext.Provider>
  )
}
