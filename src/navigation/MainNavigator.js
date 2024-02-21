
import React, { useLayoutEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ROUTES } from '../constants'
import { BookDetailScreen, SigninScreen, SignupScreen, WelcomeScreen } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, networkSelector } from '../redux/selectors'
import BottomNavigator from './BottomNavigator'
import DrawerNavigator from './DrawerNavigator'
import NetInfo from '@react-native-community/netinfo'
import { updateNetWork } from '../redux/book/bookSlice'

const Stack = createNativeStackNavigator()
const MainNavigator2 = () => {
    const dispath = useDispatch()
    const authState = useSelector(authSelector)
    const network = useSelector(networkSelector)

    // check network
    useLayoutEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            dispath(updateNetWork({ network: state }))
        })
        return () => unsubscribe()
    }, [])

    if (!authState || authState.isLoading) return null
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {
                    authState.userToken ?
                        //main concept
                        <Stack.Group>
                            <Stack.Screen name={ROUTES.app} component={BottomNavigator} />
                            <Stack.Screen name={ROUTES.bookDetail} component={BookDetailScreen} options={{ headerShown: true, headerTitle: "Thông tin sách" }} />
                            <Stack.Screen name={ROUTES.epubDrawer} component={DrawerNavigator} options={{ headerShown: true, headerTitle: `Trình đọc sách ${!network?.isConnected ? "(Offline)" : ""}` }} />
                        </Stack.Group>
                        :
                        <Stack.Group>
                            {
                                //check first logged
                                !authState.firstLogged && <Stack.Screen name={ROUTES.welcome} component={WelcomeScreen} />
                            }
                            <Stack.Screen name={ROUTES.signin} component={SigninScreen} />
                            <Stack.Screen name={ROUTES.signup} component={SignupScreen} />
                        </Stack.Group>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator2
