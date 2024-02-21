import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { EpubReaderScreen } from '../screens'
import { ROUTES } from '../constants'
import { CustomDrawerContent } from '../components/drawer'


const Drawer = createDrawerNavigator()


const DrawerNavigator = ({ route, navigation }) => {

    const { bookBase64, bookId, bookLocation } = route.params


    return (
        <Drawer.Navigator
            screenOptions={{
                drawerPosition: "right",
                headerShown: false
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name={ROUTES.epubReader} options={{ headerShown: false }} >
                {props => <EpubReaderScreen bookId={bookId} bookBase64={bookBase64} bookLocation={bookLocation}  {...props} navStack={navigation} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default DrawerNavigator
