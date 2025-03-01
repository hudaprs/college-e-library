import { AppRouter } from './AppRouter'
import { UIProvider } from '@/app/providers/UIProvider'
import './App.css'

export const App = () => {
  return (
    <UIProvider>
      <AppRouter />
    </UIProvider>
  )
}
