import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SIZES } from '../constants'

const WrappedComponent = Component => function HOC() {
    return (
        <View style={styles.container} >
            <Component />
        </View>
    )
}

export default WrappedComponent

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZES.horizontal,
    }
})