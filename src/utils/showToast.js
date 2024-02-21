import { ToastAndroid, Platform } from 'react-native'

const showToast = (message) => {
    if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 100)
    } else if (Platform.OS === "ios") {
        alert(message)
    }
}


export default {
    showToast
}