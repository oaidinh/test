import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ASSETS, STYLES, FONTS, SIZES } from '../constants'
import LottieView from 'lottie-react-native'
const EmptyList = () => {
    return (
        <View style={styles.container} >
            <LottieView
                source={ASSETS.emptyList}
                autoPlay
                loop
                style={{
                    width: SIZES.width,
                    height: SIZES.width,
                    // backgroundColor: 'red'
                }}
            />
            <Text style={styles.title} >Danh sách trống</Text>
        </View>
    )
}

export default EmptyList

const styles = StyleSheet.create({
    container: {
        ...STYLES.center,
        paddingBottom: SIZES.height / 5,
        flex: 1,
    },
    title: {
        ...FONTS.h2,
        marginTop: -50,
    }
})