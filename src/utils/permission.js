import { Alert, PermissionsAndroid } from 'react-native'

const getStoragePermission = async () => {
    let permissions = await PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ],
        {
            title: 'Mekosoft Ebook Permission',
            message: 'Mekosoft Ebook needs to access your storage'
        }
    )
    if (permissions['android.permission.READ_EXTERNAL_STORAGE'] === 'granted') {
        return
    } else {
        Alert.alert(
            'Permission required',
            'Allow Mekosoft Ebook to access your storage',
            [{ text: 'OK', onPress: async () => await getStoragePermission() }],
            { cancelable: false }
        )
    }
}

const checkStoragePermissions = async () => {
    let granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    )
    return granted
}

//check phone state
const getPhoneStatePermission = async () => {

    let permission = await PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
        ],
        {
            title: 'Mekosoft Ebook Permission',
            message: 'Mekosoft Ebook needs to access your phone state'
        }
    )

    if (permission["android.permission.READ_PHONE_STATE"] === "granted") {
        return
    } else {
        Alert.alert(
            'Permission required',
            'Allow Mekosoft Ebook to access your phone state1',
            [{ text: 'OK', onPress: async () => await getPhoneStatePermission() }],
            { cancelable: false }
        )
    }


}

const checkPhoneStatePermission = async () => {
    let granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    )
    return granted
}

export default {
    checkStoragePermissions,
    getStoragePermission,
    checkPhoneStatePermission,
    getPhoneStatePermission
}