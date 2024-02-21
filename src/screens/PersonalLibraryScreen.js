import React, { useContext, useEffect, useState } from 'react'
import {
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import {
    booksRemainingSelector,
    limitDeviceSelector,
    bookLoadingSelector,
    offlineSelector,
    userSelector,
    accessTokenSelector,
    expiresInSelector
} from '../redux/selectors'
import { AUTHS, COLORS, ROUTES, SIZES, FONTS } from '../constants'
import { EmptyList, NoInternet, RowSection, Spinner } from '../components'
import { useNavigation } from '@react-navigation/native'
import { LoggerUtil } from '../utils'
import { BookCard } from '../components/card'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../redux/book/action'
import { getDeviceNameSync, getModel, getUniqueIdSync } from 'react-native-device-info'
import { addAndGetDevices } from '../redux/device/action'


const logger = LoggerUtil("PersonalLibrary")

const PersonalLibraryScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const user = useSelector(userSelector)
    const offlines = useSelector(offlineSelector)
    const isLoading = useSelector(bookLoadingSelector)
    const limitDevice = useSelector(limitDeviceSelector)
    const accessToken = useSelector(accessTokenSelector)
    const expiresIn = useSelector(expiresInSelector)
    const books = useSelector(booksRemainingSelector)

    const [isRefreshing, setIsRefreshing] = useState(false)
    async function onLoadData() {
        const userId = user.userId
        const uniqueId = getUniqueIdSync()
        logger("uniqueId " + uniqueId)
        await onLoadSetDevice(userId)
        dispatch(getBooks({ userId, offlines, accessToken, expiresIn, dispatch }))
    }



    async function handleOnRefresh() {
        if (user) {
            setIsRefreshing(true)
            await onLoadData(user.userId)
            setIsRefreshing(false)
        }
    }
    async function onLoadSetDevice(ownerId) {
        if (limitDevice) Alert.alert("Cảnh báo", "Danh sách thiết bị vượt quá giới hạn. Vui lòng xóa một thiết bị và tải lại ứng dụng", [
            {
                style: "cancel",
                text: "Bỏ qua",
            },
            {
                text: "Quản lý thiết bị",
                onPress: () => { navigation.navigate(ROUTES.accountStack) }
            }
        ])
        const name = getDeviceNameSync()
        const modelType = getModel()
        const deviceId = getUniqueIdSync()
        const jsonBody = { ownerId, deviceId, name, modelType }
        const addConfigs = { jsonBody, accessToken, expiresIn, dispatch }
        dispatch(addAndGetDevices(addConfigs))
    }

    // load my books and add device
    useEffect(() => {
        if (user) onLoadData()
    }, [user])

    return (
        <View style={styles.container} >
            <RowSection customContainerStyle={styles.customStyle}  >
                <Text style={{
                    ...FONTS.h3,
                    fontWeight: 'bold'
                }}>
                    Sách của tôi
                </Text>
                <NoInternet />
            </RowSection>
            <View style={{ flex: 1 }} >
                {(isLoading || isRefreshing) ?
                    <Spinner />
                    :
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                onRefresh={handleOnRefresh}
                                refreshing={isRefreshing}
                                colors={[COLORS.DEFAULT_PRIMARY]}
                            />}

                        ListEmptyComponent={EmptyList}
                        contentContainerStyle={{ paddingTop: 5, paddingHorizontal: SIZES.base, flex: 1 }}
                        data={books}
                        keyExtractor={item => item.bookId.toString()}
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: "2%" }}
                        renderItem={({ item }) => <BookCard horizontal book={item} navigation={navigation} />}
                    />
                }
            </View>
        </View>
    )
}

export default PersonalLibraryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.DEFAUT_WHITE
    },
    customStyle: {
        paddingHorizontal: SIZES.base,
    }
})