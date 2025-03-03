import { AppRouter } from './AppRouter'
import { Provider } from 'react-redux'
import { UIProvider } from '@/app/providers/UIProvider'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/redux'
import { PageLoader } from '@/app/components/common/PageLoader'
import './App.css'

export const App = () => {
  return (
    <UIProvider>
      <Provider store={store}>
        <PersistGate loading={<PageLoader />} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
    </UIProvider>
  )
}
