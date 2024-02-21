import { DateUtil, LoggerUtil } from '../utils'
import { revokeToken } from '../redux/auth/authSlice'
const { BASE_URL, HTTP, BASE_DOMAIN, API } = require('../constants')

const serviceLogger = LoggerUtil("Service")

export const HttpRequest = async (url, payload = {}, headers = {}) => {
    serviceLogger(JSON.stringify(`${BASE_URL}${url}`))
    try {
        const requestOptions = {
            method: "GET",
            headers: {
                Accept: 'application/json',
                ...headers
            },
            ...payload,
        }
        const response = await fetch(`${BASE_URL}${url}`, requestOptions)
        const data = await response.json()
        return data
    } catch (error) {
        serviceLogger(error)
        serviceLogger("ERROR=" + url)
    }
}

export const ClientCredentialRequest = async () => {
    try {
        const response = await fetch(`${BASE_DOMAIN}${API.clientCredential}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: HTTP.POST
        })
        return await response.json()
    } catch (error) {
        serviceLogger(error)
    }
}

export const requestOauth2Api = async ({ url, payload, headers, expiresIn, dispatch }) => {
    const dateInMillisecs = Math.round(Date.now() / 1000)
    const isTokenExpired = dateInMillisecs > expiresIn
    //check expireinsecs == undefined
    if (isTokenExpired) {
        console.log('Refresh Token: Ooops ... token expired: ', url)
        const response = await ClientCredentialRequest()
        const accessToken = response.access_token
        if (!accessToken)
            console.log("no accesstoken response") /* NOTE: chưa handle error */
        // Save to localStore
        const expiresIn = DateUtil.getSeconds(response.expires_in)
        dispatch(revokeToken({ accessToken, expiresIn }))
        console.log('Refresh token url: ', url)
        const newToken = accessToken
        headers = { 'Authorization': `Bearer ${newToken}` }
        console.log('Refresh Token: Fetch data with new token: ', url, newToken)
        return HttpRequest(url, payload, headers)
    }
    return HttpRequest(url, payload, headers)
}

export const postRequestWithJsonBody = async ({ url, jsonBody, accessToken, expiresIn, dispatch }) => {
    let result
    try {
        const formData = new FormData()
        formData.append("jsonBody", JSON.stringify(jsonBody))
        const payload = { method: HTTP.POST, body: formData }
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const requestOptions = { url, payload, headers, expiresIn, dispatch }
        const response = await requestOauth2Api(requestOptions)
        result = response
    } catch (error) {
        console.log(error)
    }
    return result
}


