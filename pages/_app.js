import { useStore } from '../redux/store'
import { Provider as ProviderRedux } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react"

import '../styles/index.scss'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <ProviderRedux store={store}>
      <PersistGate persistor={store.__PERSISTOR} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </ProviderRedux>
  )
}

export default MyApp
