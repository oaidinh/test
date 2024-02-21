import { StyleSheet, Text, View, Image, Dimensions, NativeModules } from 'react-native'
import React, { useEffect } from 'react'
import { ROUTES, SIZES, LICENSES, FONTS, COLORS } from '../constants'
import { FileSystemUtil, LabelUtil, ToastUtil } from '../utils'
import { getUniqueIdSync } from 'react-native-device-info'
import { Badge, CustomButton } from '../components'
import moment from 'moment'


const { MyNativeModule, PermissionFileModule } = NativeModules

const BookDetailScreen = ({ route, navigation }) => {
    const {
        bookId,
        bookType,
        bookName,
        status,
        license,
        bookPath,
        thumbPath,
        thumbnail,
        userId
    } = route.params.book
    const { isExist, path } = FileSystemUtil.getViewPath(thumbPath)

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerTitle: bookName,
    //     })
    // }, [navigation])

    const handleOfflineExpireTime = (rightsEnd) => {
        let isExpire = false
        const currentDate = moment(new Date()).valueOf()
        const expireDate = moment(rightsEnd, "DD/MM/YYYY HH:mm:ss").valueOf()
        // console.log(currentDate, expireDate)
        if (currentDate > expireDate) {
            isExpire = true
            ToastUtil.showToast("Hết thời hạn đọc quyển sách")
        }
        return isExpire
    }

    const handleOpenEbook = async () => {
        const isExistFile = await FileSystemUtil.getExistFile(FileSystemUtil.BOOKDIR, bookId)
        console.log({ isExist, bookPath })
        // ktra file đã tồn tại
        if (isExistFile) {
            MyNativeModule.nativeDecryptFile(JSON.stringify(license), bookPath)
                .then(bookBase64 => {
                    navigation.navigate(ROUTES.epubDrawer, { bookBase64, bookId })
                })
                .catch(error => {
                    console.log("Native error")
                    console.log(error)
                    return ToastUtil.showToast("Không thể mở sách")
                })
            return
        }
        ToastUtil.showToast("Không thể mở sách")
    }

    const handleOnPress = () => {
        PermissionFileModule.checkAndGrantPermission(
            err => {
                console.log(err)
            },
            async permission => {
                //no permission magage all file
                if (!permission)
                    return ToastUtil.showToast("Không có quyền truy cập file")
                //type equal epub
                if (bookType != "epub")
                    return ToastUtil.showToast("Sách không đúng định dạng EPUB")

                //expire read book
                const expireValidation = handleOfflineExpireTime(license?.rights?.end)
                if (expireValidation) return ToastUtil.showToast("Hết hạn đọc sách")

                //allow device
                const deviceId = getUniqueIdSync()
                const isValidDevice = license?.devices?.some(d => d.deviceId === deviceId)
                if (!isValidDevice) return ToastUtil.showToast("Thiết bị chưa được đăng ký")

                //openbook
                handleOpenEbook(license?.encryption?.content_key?.encrypted_value)
            },
        )
    }




    return (
        <View style={styles.container} >
            {/* Info */}
            <View style={styles.infoContainer} >
                <View style={styles.infoHeader} >
                    <Image
                        style={{
                            width: "35%",
                            height: "100%",
                            resizeMode: "cover",
                            borderRadius: SIZES.radius
                        }}
                        source={{ uri: isExist ? path : thumbnail }}
                    />
                    <View style={styles.infoRight}  >
                        <Text style={styles.infoTitle}>{bookName}</Text>
                        <Text style={{ marginVertical: SIZES.base / 2 }} >
                            <Badge
                                type={LabelUtil.getStatus(parseInt(status?.status))?.type}
                                title={LabelUtil.getStatus(parseInt(status?.status))?.message}
                            />
                        </Text>
                    </View>
                </View>
                <View style={styles.infoContent} >
                    <Text style={styles.infoText} >
                        <Text style={{ ...FONTS.body4 }} >Ngày bắt đầu:</Text> {license?.rights?.start}
                    </Text>
                    <Text style={styles.infoText} >
                        <Text style={{ ...FONTS.body4 }} >Ngày kết thúc:</Text> {license?.rights?.end}
                    </Text>
                </View>

            </View>
            <CustomButton
                title="Đọc sách"
                onPress={handleOnPress}
                primary
                disabled={parseInt(status?.status) === LICENSES.active.id ? false : true}
                customStyle={{ marginVertical: SIZES.base * 2 }}
            />

        </View>
    )
}

export default BookDetailScreen

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: COLORS.DEFAUT_WHITE
    },
    infoContainer: {

        flex: 1,

    },
    infoHeader: {
        flexDirection: "row",
        // width: "100%",
        height: width / 2,
        marginTop: SIZES.base
    },
    infoContent: {
        marginTop: SIZES.vertical
    },
    infoRight: {
        flex: 1,
        padding: 5
    },
    infoTitle: {
        fontSize: SIZES.h3,
        marginBottom: SIZES.base / 2,
        ...FONTS.h3
    },
    infoText: {
        // fontSize: SIZES.body5,
    }
})