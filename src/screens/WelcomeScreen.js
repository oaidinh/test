import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, ROUTES, SIZES, WELCOME_MESSAGE } from '../constants'
import { CustomButton } from '../components'

const WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 18,
                    marginVertical: SIZES.base * 3
                }}
            >
                Chào mừng đến với <Text style={{ color: COLORS.DEFAULT_PRIMARY, fontSize: 22 }} >{WELCOME_MESSAGE.appName}</Text>
            </Text>

            <CustomButton
                primary
                fullWidth
                title="Tiếp tục"
                onPress={() => {
                    navigation.navigate(ROUTES.signin)
                }}
            />
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: SIZES.base
    }
})