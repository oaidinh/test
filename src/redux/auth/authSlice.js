import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../services';
import { DateUtil, ToastUtil } from '../../utils';

const initialState = {
    user: null,
    userToken: null,
    accessToken: null,
    expiresIn: 0,
    firstLogged: false,
    isLoading: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state) => {
            state.accessToken = null
            state.userToken = null
            state.user = null
            console.log({ state });
        },
        setFirstLogged: (state) => {
            state.firstLogged = true
        },
        revokeToken: (state, action) => {
            const { accessToken, expiresIn } = action.payload
            state.accessToken = accessToken
            state.expiresIn = expiresIn
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload
        }),
            builder.addCase(signIn.pending, (state, action) => {
                console.log('login pending')
                state.isLoading = true
            }),
            builder.addCase(signIn.rejected, (state, action) => {
                //action.error.message
                console.log('login reject', action.error)
                state.isLoading = false
                ToastUtil.showToast("Đăng nhập thất bại")
            }),
            builder.addCase(signIn.fulfilled, (state, action) => {
                const { accessToken, userToken, user, expiresIn } = action.payload
                state.accessToken = accessToken
                state.userToken = userToken
                state.user = user
                state.expiresIn = expiresIn
                state.isLoading = false
            })
    }
})

export const signIn = createAsyncThunk("signIn", async (jsonBody) => {

    //chung thuc ung dung
    const oauth2 = await AuthService.clientCredential()
    const accessToken = oauth2.access_token
    if (!accessToken)
        throw new Error("Máy chủ không phản hồi")
    const expiresIn = DateUtil.getSeconds(oauth2.expires_in)

    //login
    const loginResponse = await AuthService.signIn(jsonBody, accessToken)
    const userToken = loginResponse.token
    const isLogged = loginResponse.success && userToken
    if (!isLogged)
        throw new Error(loginResponse.message)

    // get current user
    const curResponse = await AuthService.getCurrentUser({ accessToken, userToken })
    const user = curResponse.data
    const isUser = curResponse.success && user
    if (!isUser)
        throw new Error(curResponse.message)

    return { userToken, accessToken, user, expiresIn }
})

export const getCurrentUser = createAsyncThunk("getCurrentUser", async (jsonBody) => {
    let result = null
    const response = await AuthService.getCurrentUser(jsonBody)
    if (response.success)
        result = response.data
    return result
})


export const { signOut, setFirstLogged, revokeToken } = authSlice.actions
export default authSlice.reducer