import React from 'react'
import MainNavigator from './navigation/MainNavigator'
import { Provider } from 'react-redux'
import { persistor, store } from './redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastProvider } from 'react-native-toast-notifications'
import { SIZES } from './constants'
const App = () => {

    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor} >
                <ToastProvider
                    offsetBottom={SIZES.width * .12}
                    style={{ width: "100%" }}
                >
                    <MainNavigator />
                </ToastProvider>
            </PersistGate>
        </Provider>
    )
}

export default App
