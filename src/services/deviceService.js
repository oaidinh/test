import { API, HTTP } from '../constants'
import { postRequestWithJsonBody, requestOauth2Api } from './httpRequest'


export default {
    getDevices: async ({ jsonBody, accessToken, expiresIn, dispatch }) => {
        const url = `${API.getUserDevices}?ownerId=${jsonBody.ownerId}`
        const payload = {}
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const requestOptions = { url, payload, headers, expiresIn, dispatch }
        return await requestOauth2Api(requestOptions)
    },
    getDevice: async (configs) => {
        return
    },
    addDevice: async (configs) => {
        configs.url = API.addUserDevice
        return await postRequestWithJsonBody(configs)
    },
    deleteDevice: async ({ userDeviceId, accessToken, expiresIn, dispatch }) => {
        const formData = new FormData()
        formData.append("userDeviceId", userDeviceId)
        const url = API.deleteUserDevice
        const payload = { method: HTTP.POST, body: formData }
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const requestOptions = { url, payload, headers, expiresIn, dispatch }
        return await requestOauth2Api(requestOptions)
    },
}