import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Spinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={COLORS.DEFAULT_PRIMARY} />
        </View>
    )
}

export default Spinner

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})