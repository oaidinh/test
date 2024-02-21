import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { COLORS, ROUTES } from '../constants'
import { PersonalLibraryScreen } from '../screens'
import { AccountScreen, DeviceScreen } from '../screens/account'

import Ionicons from 'react-native-vector-icons/Ionicons'



const BottomTab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()
const LibStack = createNativeStackNavigator()
const AccountStack = createNativeStackNavigator()

// const HomeStackComponent = () => {
//     return (
//         <HomeStack.Navigator screenOptions={{ headerShown: false }}>
//             <HomeStack.Screen name={ROUTES.home} component={HomeScreen} />
//             <HomeStack.Screen name={ROUTES.bookDetail} component={BookDetailScreen} options={{ headerShown: true, headerTitle: "Book detail" }} />
//             <HomeStack.Screen name={ROUTES.epubDrawer} component={DrawerNavigator} options={{ headerShown: true, headerTitle: "Epub Reader" }} />
//         </HomeStack.Navigator>
//     )
// }
const LibStackComponent = () => {
    return (
        <LibStack.Navigator screenOptions={{ headerShown: false }}>
            <LibStack.Screen name={ROUTES.personalLibrary} component={PersonalLibraryScreen} />
        </LibStack.Navigator>
    )
}
const AccountStackComponent = () => {
    return (
        <AccountStack.Navigator screenOptions={{ headerShown: false }}  >
            <AccountStack.Screen name={ROUTES.account} component={AccountScreen} />
            <AccountStack.Screen name={ROUTES.device} component={DeviceScreen} options={{ headerShown: true, headerTitle: "Danh sách thiết bị" }} />
        </AccountStack.Navigator>
    )
}

const BottomNavigator = () => {
    return (
        <BottomTab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName
                if (route.name === ROUTES.homeStack) {
                    iconName = focused
                        ? 'home'
                        : 'home-outline'
                } else if (route.name === ROUTES.libStack) {
                    iconName = focused ? 'book' : 'book-outline'
                } else if (route.name === ROUTES.accountStack) {
                    iconName = focused ? 'person' : 'person-outline'
                }
                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: COLORS.DEFAULT_PRIMARY,
            tabBarInactiveTintColor: 'gray',
        })} >

            <BottomTab.Screen name={ROUTES.libStack} component={LibStackComponent} options={{ title: "Thư viện" }} />
            <BottomTab.Screen name={ROUTES.accountStack} component={AccountStackComponent} options={{ title: "Cá nhân" }} />
        </BottomTab.Navigator>
    )
}

export default BottomNavigator
