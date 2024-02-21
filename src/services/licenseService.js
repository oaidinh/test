import { API } from '../constants'
import { HttpRequest, requestOauth2Api } from './httpRequest'

export default {
    getLicense: async ({ userId, bookId, accessToken, expiresIn, dispatch }) => {
        const url = `${API.getLicense}?userId=${userId}&bookId=${bookId}`
        const payload = {}
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const requestOptions = { url, payload, headers, expiresIn, dispatch }
        return await requestOauth2Api(requestOptions)
    },
    getStatus: async ({ licenseId, accessToken, expiresIn, dispatch }) => {
        const url = `${API.getStatus}?licenseId=${licenseId}`
        const payload = {}
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const requestOptions = { url, payload, headers, expiresIn, dispatch }
        return await requestOauth2Api(requestOptions)
    },
    //un use
    // addDevice: async (jsonBody) => {
    //     return await requestWithFormData(API.addDevice, "POST", jsonBody)
    // }
}