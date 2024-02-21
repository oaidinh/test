import React from 'react'
import {
    StyleSheet,
    Text,
    Alert,
    FlatList,
    useWindowDimensions,
    TouchableOpacity,
    View
} from 'react-native'
import { AppIcon, Badge, EmptyList, RowSection } from '../../components'
import { BADGES, COLORS, ICONS, SIZES, STYLES, FONTS } from '../../constants'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { devicesSelector, offlineSelector, authSelector } from '../../redux/selectors'
import { deleteDevice } from '../../redux/device/deviceSlice'
import { getUniqueIdSync } from 'react-native-device-info'
import { DeviceService } from '../../services'
import { getBooks } from '../../redux/book/action'
import { ToastUtil } from '../../utils'



const DeviceScreen = () => {
    const { height } = useWindowDimensions()
    const dispatch = useDispatch()
    const devices = useSelector(devicesSelector)
    const { user, accessToken, expiresIn } = useSelector(authSelector)
    const offlines = useSelector(offlineSelector)
    let rowRefs = new Map()

    const handleDeleteDevice = (userDeviceId) => {
        Alert.alert("Xác nhận", "Bạn có chắc là muốn xóa thiết bị này?", [
            {
                text: "Hủy",
                style: "cancel"
            },
            {
                text: "Xóa",
                onPress: async () => {
                    try {
                        const delConfigs = { userDeviceId, accessToken, expiresIn, dispatch }
                        const res = await DeviceService.deleteDevice(delConfigs)
                        if (res?.success) {
                            dispatch(deleteDevice(res.data))
                            const { userId } = user
                            dispatch(getBooks({ userId, offlines, accessToken, expiresIn, dispatch }))
                        } else {
                            console.log("không thể xóa")
                            console.log({ res })
                            ToastUtil.showToast("Không thể thực hiện thao tác")
                        }
                    } catch (error) {
                        console.log(error)
                    }

                }
            },

        ])

    }
    const onSwipeRight = (userDeviceId) => {
        return (
            <TouchableOpacity
                style={styles.deleteContainer}
                onPress={() => handleDeleteDevice(userDeviceId)}
            >
                <AppIcon type={ICONS.FontAwesome} name="trash" color={COLORS.DEFAUT_WHITE} />
                <Text style={{ color: COLORS.DEFAUT_WHITE }} >Xóa</Text>
            </TouchableOpacity>
        )
    }

    return (
        <GestureHandlerRootView style={styles.container} >
            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: SIZES.horizontal,
                    // paddingVertical: SIZES.vertical
                }}
                showsVerticalScrollIndicator={false}
                data={devices}
                keyExtractor={item => item.userDeviceId}
                ListEmptyComponent={EmptyList}
                renderItem={({ item }) => {
                    const isEqual = item.deviceId === getUniqueIdSync()
                    return (
                        <Swipeable
                            ref={ref => {
                                if (ref && !rowRefs.get(item.userDeviceId)) {
                                    rowRefs.set(item.userDeviceId, ref)
                                }
                            }}
                            onSwipeableWillOpen={() => {
                                [...rowRefs.entries()].forEach(([userDeviceId, ref]) => {
                                    if (userDeviceId !== item.userDeviceId && ref) ref.close()
                                })
                            }}
                            friction={2}
                            renderRightActions={!isEqual && (() => onSwipeRight(item.userDeviceId))}
                            containerStyle={{
                                paddingHorizontal: SIZES.base,
                                paddingVertical: SIZES.base * 1.5,
                                borderBottomColor: COLORS.DEFAUT_WHITE2,
                                borderBottomWidth: 2,
                            }} >

                            <RowSection customContainerStyle={{ padding: 0, }} >
                                <Text style={{ ...FONTS.body4, marginRight: 5 }} >{item.name}&nbsp;</Text>
                                {isEqual && <Badge type={BADGES.success} title="Thiết bị này" />}
                            </RowSection>
                            <RowSection customContainerStyle={{ padding: 0 }} >
                                <Text style={{ ...FONTS.body4 }} >{item.modelType} </Text>
                            </RowSection>

                        </Swipeable >
                    )
                }}
            />
        </GestureHandlerRootView >
    )
}

export default DeviceScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.DEFAUT_WHITE
    },
    deleteContainer: {
        ...STYLES.center,
        backgroundColor: "red",
        paddingVertical: SIZES.vertical * 2,
        paddingHorizontal: SIZES.horizontal * 2.5
    }
})