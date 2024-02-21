import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, SIZES, STYLES } from '../constants'

const CustomButton = ({ primary, fullWidth, title, disabled, onPress, customStyle, isSubmiting }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isSubmiting}
            style={{
                // width: fullWidth && "100%",
                padding: SIZES.base,
                backgroundColor: (disabled || isSubmiting) ? (primary ? COLORS.LIGHT_PRIMARY : COLORS.DEFAUT_WHITE2) : (primary ? COLORS.DEFAULT_PRIMARY : COLORS.DEFAUT_WHITE),
                borderRadius: SIZES.radius,
                elevation: disabled ? 0 : SIZES.elevation,
                ...STYLES.center,
                ...customStyle
            }}
        >
            {
                isSubmiting ?
                    <ActivityIndicator size='small' color={COLORS.DEFAUT_WHITE} />
                    :
                    <Text
                        style={{
                            textAlign: "center",
                            textTransform: "uppercase",
                            color: (disabled) ? (primary ? COLORS.DEFAUT_WHITE : COLORS.DEFAULT_GRAY) : (primary ? COLORS.DEFAUT_WHITE : COLORS.DEFAULT_PRIMARY)
                        }}
                    >
                        {title}
                    </Text>
            }

        </TouchableOpacity>
    )
}

CustomButton.defaultProps = {
    title: "Custom Button"
}

export default CustomButton

const styles = StyleSheet.create({
    container: {

    }
})