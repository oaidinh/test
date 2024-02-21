import { API, HTTP } from '../constants'
import { postRequestWithJsonBody, requestOauth2Api } from './httpRequest'

export default BookService = {
    //userId
    getBooksByUser: async ({ userId, accessToken, expiresIn, dispatch }) => {
        const url = `${API.getBooks}?userId=${userId}`
        const payload = { method: HTTP.GET }
        const headers = { 'Authorization': `Bearer ${accessToken}` }
        const requestOptions = { url, payload, headers, expiresIn, dispatch }
        return await requestOauth2Api(requestOptions)
    },
    //ownerId, bookId, annotationTypeId
    getAnnotations: async (configs) => {
        configs.url = API.getAnnotations
        return await postRequestWithJsonBody(configs)
    },
    //ownerId, bookId, annotationTypeId, content, data
    addAnnotation: async (configs) => {
        configs.url = API.addAnnotation
        return await postRequestWithJsonBody(configs)
    },
    //annotationId, content
    updateAnnotation: async (configs) => {
        configs.url = API.updateAnnotation
        return await postRequestWithJsonBody(configs)
    },
    //annotationId
    deleteAnnotation: async (configs) => {
        configs.url = API.deleteAnnotation
        return await postRequestWithJsonBody(configs)
    }

}