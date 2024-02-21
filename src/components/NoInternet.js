import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, ICONS, SIZES } from '../constants'
import { useSelector } from 'react-redux'
import { useToast } from 'react-native-toast-notifications'
import AppIcon from './AppIcon'
import { networkSelector } from '../redux/selectors'
const NoInternet = () => {
    const network = useSelector(networkSelector)
    const toast = useToast()
    useEffect(() => {

        if (!network.isConnected) {
            toast.show("Bạn đang offline", {
                icon: <AppIcon type={ICONS.Feather} name="wifi-off" color={COLORS.DEFAULT_GREEN} />,
            })
            return
        }
        // toast.hideAll()

    }, [network.isConnected])

    return (
        <>
            {/* {!network?.isConnected && (
                <View style={[styles.container, { backgroundColor: network?.isConnected ? "green" : "red" }]} >
                    <Text style={{ color: COLORS.DEFAUT_WHITE }} >Bạn đang {network?.isConnected ? "Online" : "Offline"}</Text>
                </View>
            )} */}
        </>
    )
}

export default NoInternet

const styles = StyleSheet.create({
    container: {
        marginHorizontal: SIZES.horizontal,
        padding: SIZES.base,
        backgroundColor: "red",
    }
})