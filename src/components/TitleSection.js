import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../constants'
const TitleSection = ({ title, onPress }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.title} >{title}</Text>
            <AntDesign name="arrowright" size={20} color={COLORS.DEFAULT_PRIMARY} onPress={onPress} />
        </View>
    )
}

export default TitleSection

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
    }
})