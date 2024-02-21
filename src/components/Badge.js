import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BADGES, COLORS, SIZES, FONTS } from '../constants'
import { LabelUtil } from '../utils'

function renderPallet(outlined, type) {
    if (outlined) {
        return {
            borderWidth: 1,
            borderColor: LabelUtil.getColorBadge(type),
            backgroundColor: COLORS.DEFAUT_WHITE
        }
    } else {
        return {
            backgroundColor: LabelUtil.getColorBadge(type),
        }
    }
}

const Badge = ({ type, title, outlined }) => {
    return (
        <View
            style={[
                styles.container,
                { ...renderPallet(outlined, type) }
            ]}>
            <Text
                style={[
                    styles.label,
                    { color: outlined ? LabelUtil.getColorBadge(type) : COLORS.DEFAUT_WHITE }
                ]}
            >
                {title}
            </Text>
        </View>
    )
}

Badge.defaultProps = {
    type: BADGES.default,
    title: "Badge"
}

export default Badge

const styles = StyleSheet.create({
    container: {
        paddingVertical: SIZES.base / 2,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius / 2,
        alignSelf: 'baseline',
        elevation: 3
    },
    label: {
        color: COLORS.default,
        ...FONTS.body5
    }
})