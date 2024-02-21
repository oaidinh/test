import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, SIZES } from '../constants'
const RowSection = ({ children, activeButton, onPress, customContainerStyle, leftIcon, rightIcon, title, subTitle }) => {
    return (
        <TouchableOpacity
            style={[styles.container, { ...customContainerStyle }]}
            disabled={activeButton ? false : true}
            onPress={onPress}
        >
            {children ? children : (
                <>
                    <View style={styles.left} >
                        {leftIcon}
                        <Text style={{
                            ...FONTS.h3,
                            fontWeight: "800",
                            marginLeft: SIZES.horizontal
                        }}  >
                            {title}
                        </Text>
                    </View>
                    <View style={styles.right} >
                        <Text style={{
                            ...FONTS.h3,
                            fontWeight: "600",
                            marginRight: SIZES.horizontal * 2,
                        }}>
                            {subTitle}
                        </Text>
                        {rightIcon}
                    </View>
                </>
            )}
        </TouchableOpacity>
    )
}

export default RowSection

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: SIZES.horizontal / 2,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 2,
    },
    right: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    }
})