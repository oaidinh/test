import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/auth/authSlice'

const SignupScreen = () => {
    const dispatch = useDispatch()
    return (
        <View>
            <Text>SignupScreen</Text>
            <Button title='logout' onPress={() => dispatch(logout())} />
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({})