import { API, HTTP } from '../constants'
import { ClientCredentialRequest, HttpRequest } from './httpRequest'

export default AuthService = {
    clientCredential: async () => {
        let result
        try {
            const response = await ClientCredentialRequest()
            result = response
        } catch (error) {
            console.log(error)
        }
        return result
    },
    //NOTE: username, password
    signIn: async (jsonBody, token) => {
        let result
        try {
            const formData = new FormData()
            formData.append("jsonBody", JSON.stringify(jsonBody))
            const payload = { method: HTTP.POST, body: formData }
            const headers = { 'Authorization': `Bearer ${token}` }
            const response = await HttpRequest(API.login, payload, headers)
            result = response
        } catch (error) {
            console.log(error)
        }
        return result
    },
    //NOTE: userToken, accessToken
    getCurrentUser: async (data) => {
        let result
        try {
            const formData = new FormData()
            formData.append("jsonBody", JSON.stringify({ token: data.userToken }))
            const payload = { method: HTTP.POST, body: formData }
            const headers = { 'Authorization': `Bearer ${data.accessToken}` }
            const response = await HttpRequest(API.currentUser, payload, headers)
            result = response
        } catch (error) {
            console.log(error)
        }
        return result
    }
}