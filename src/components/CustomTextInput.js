import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLORS, ICONS, SIZES } from '../constants'
import AppIcon from './AppIcon'


const CustomTextInput = ({
    title,
    isPassword,
    showPassword,
    placeholder,
    value,
    handleChange,
    handleShowPassword,
    error,
    icon
}) => {
    return (
        <View
        >
            <View
                style={styles.container}
            >
                <View style={styles.inputContainer} >
                    <AppIcon type={ICONS.Feather} name={icon} size={SIZES.icon} />
                    {
                        !isPassword ?
                            <TextInput
                                placeholder={placeholder}
                                value={value}
                                onChangeText={handleChange}
                                style={styles.inputSection}
                            />
                            : (
                                <>
                                    <TextInput
                                        placeholder={placeholder}
                                        value={value}
                                        onChangeText={handleChange}
                                        secureTextEntry={!showPassword}
                                        style={styles.inputSection}
                                    />
                                    {
                                        showPassword ?
                                            <AppIcon type={ICONS.Feather} name='eye' size={SIZES.icon} style={{ marginRight: 20 }} color={COLORS.DEFAULT_PRIMARY} onPress={handleShowPassword} />
                                            :
                                            <AppIcon type={ICONS.Feather} name='eye-off' size={SIZES.icon} style={{ marginRight: 20 }} onPress={handleShowPassword} />
                                    }
                                </>

                            )
                    }
                </View>
                {error && <Text style={styles.errorText} >{error}</Text>}
            </View>
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        marginTop: SIZES.vertical,
        // backgroundColor: "pink",
        height: 70
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAUT_WHITE,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius,
    },
    inputSection: {
        flex: 1,
        marginLeft: SIZES.base
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: SIZES.base,
        marginTop: 5
    }
})