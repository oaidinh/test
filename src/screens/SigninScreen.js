import { StyleSheet, KeyboardAvoidingView, View, Platform, Image, Text, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

import { CustomButton, CustomTextInput } from '../components'
import { ASSETS, COLORS, SIZES } from '../constants'
import { Formik } from 'formik'
import * as yup from "yup"
import { LoggerUtil, ToastUtil } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setFirstLogged, signIn } from '../redux/auth/authSlice'
import { firstLoggedSelector } from '../redux/selectors'



const initialValues = {
    username: "",
    password: ""
}
// const initialValues = {
//     username: "test",
//     password: "test"
// }

const logger = LoggerUtil("Signin")

const SigninScreen = () => {

    const dispatch = useDispatch()
    const firstLogged = useSelector(firstLoggedSelector)
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

    const signinValidationSchema = yup.object().shape({
        username: yup.string().required("(*) Bắt buộc").min(3, ({ min }) => `Tài khoản phải có ít nhất ${min} kí tự`),
        password: yup.string().required("(*) Bắt buộc").min(3, ({ min }) => `Mật khẩu phải có ít nhất ${min} kí tự`),
    })
    const handleSubmitForm = async (values, { resetForm }) => {
        setIsSubmiting(true)
        try {
            dispatch(signIn(values))
        } catch (error) {
            resetForm()
            console.log(error)
            ToastUtil.showToast("Đăng nhập thất bại")
        } finally {
            setIsSubmiting(false)
        }
    }
    // handle set first login
    useLayoutEffect(() => {
        if (!firstLogged) dispatch(setFirstLogged())
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.introLogin} >
                <Image
                    source={ASSETS.appLogo}
                    style={{
                        width: "100%",
                        resizeMode: "contain",
                    }}
                />
            </View>
            <KeyboardAvoidingView
                style={styles.formContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={signinValidationSchema}
                    onSubmit={handleSubmitForm}
                >
                    {({ handleSubmit, handleChange, values, errors, isValid }) => (
                        <View>

                            <CustomTextInput
                                title="Tài khoản"
                                name="username"
                                placeholder="Nhập tài khoản"
                                handleChange={handleChange("username")}
                                value={values.username}
                                error={errors.username}
                                icon="user"
                            />
                            <CustomTextInput
                                title="Mật khẩu"
                                name="password"
                                placeholder="Nhập mật khẩu"
                                handleChange={handleChange("password")}
                                value={values.password}
                                error={errors.password}
                                icon="lock"
                                isPassword
                                showPassword={showPassword}
                                handleShowPassword={handleShowPassword}

                            />

                            <CustomButton
                                onPress={handleSubmit}
                                disabled={!isValid}
                                primary
                                customStyle={{ marginVertical: 10, marginTop: 15 }}
                                title="Đăng nhập"
                                isSubmiting={isSubmiting}
                            />
                        </View>
                    )}
                </Formik>
                {/* end form */}

            </KeyboardAvoidingView>
        </View>
    )
}

export default SigninScreen

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SIZES.base,
        // backgroundColor: COLORS.DEFAUT_WHITE
    },
    introLogin: {
        paddingTop: SIZES.base * 10,
        paddingBottom: SIZES.base * 2
    },
    formContainer: {
        flex: 1,
        // justifyContent: 'space-around',
        // backgroundColor: 'red'
    }
})