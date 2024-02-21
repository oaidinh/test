import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { CustomButton, AppIcon, RowSection } from '../../components'
import { ASSETS, COLORS, ICONS, ROUTES, SIZES, FONTS } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { devicesSelector, userSelector } from '../../redux/selectors'
import { signOut } from '../../redux/auth/authSlice'
const AccountScreen = () => {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)
    const navigation = useNavigation()
    const devices = useSelector(devicesSelector)
    const onDevicePress = () => navigation.navigate(ROUTES.device)
    return (
        <View style={styles.container} >
            <View style={styles.header} >
            </View>
            <View style={styles.footer} >
                <View style={styles.frameAvatar} >
                    <Image
                        source={ASSETS.avatar}
                        style={styles.avatar}
                    />
                    <Text
                        style={{
                            ...FONTS.h3,
                            textAlign: 'center',
                            marginTop: 8
                        }}
                    >
                        {user?.hoTen}
                    </Text>
                </View>
                <View style={styles.mainContent} >
                    <View style={{ flex: 1 }} >
                        <RowSection
                            leftIcon={<AppIcon
                                type={ICONS.MaterialCommunityIcons}
                                name="cellphone-cog"
                                size={SIZES.lagreIcon}
                                color={COLORS.DEFAULT_PRIMARY}
                            />}
                            rightIcon={<AppIcon
                                type={ICONS.FontAwesome}
                                name="chevron-right"
                                size={SIZES.icon}
                                onPress={onDevicePress}
                            />}
                            title="Thiết bị"
                            subTitle={devices?.length}
                            activeButton
                            onPress={onDevicePress}
                            customContainerStyle={styles.rowSection}
                        />
                        {/* <RowSection title={`limit:${limitDevice}`} customContainerStyle={{ backgroundColor: 'gray', borderRadius: 30 }} /> */}
                    </View>
                </View>
                <View >
                    <CustomButton
                        onPress={() => dispatch(signOut())}
                        title="Đăng xuất"
                        primary
                    />
                </View>
            </View>

        </View>
    )
}

export default AccountScreen
const { width, height } = Dimensions.get("screen")
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.DEFAULT_PRIMARY,
    },
    header: {
        flex: 1,
    },
    frameAvatar: {
        position: "absolute",
        top: "-11%",
        alignSelf: "center",
        zIndex: 100,
        width: width,
        height: width * .4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: width * .3,
        height: width * .3,
        resizeMode: "cover"
    },
    footer: {
        flex: 5,
        padding: SIZES.base,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: COLORS.DEFAUT_WHITE,
        elevation: SIZES.elevation
    },
    mainContent: {
        flex: 1,
        marginTop: "25%",
        paddingVertical: SIZES.vertical,
    },
    rowSection: {
        backgroundColor: COLORS.DEFAUT_WHITE,
        padding: SIZES.base * 1.5,
        borderRadius: SIZES.radius,
        elevation: SIZES.elevation
    }
})