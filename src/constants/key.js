export const LIMIT_DEVICE = 5
export const BASE_DOMAIN = 'http://dev.lrc.mekosoft.vn'
export const BASE_URL = `${BASE_DOMAIN}/api/jsonws`


export const API = Object.freeze({
    login: '/ebook.ebook/login-v2',
    currentUser: '/ebook.ebook/currentUser-v2',
    clientCredential: '/o/oauth2/token?grant_type=client_credentials&client_id=mobile-app&client_secret=mobile-app',
    getBooks: '/license.content/get-books',
    getAnnotations: '/anno.annotation/get-annotations',
    addAnnotation: '/anno.annotation/add-annotation',
    updateAnnotation: '/anno.annotation/update-annotation',
    deleteAnnotation: '/anno.annotation/delete-annotation',
    getLicense: '/license.license/get-license-v2',
    getStatus: '/license.status/get-status',
    addDevice: '/license.device/add-device',
    getUserDevices: '/license.userdevice/get-user-devices',
    getUserDevice: '/license.userdevice/get-user-device',
    addUserDevice: '/license.userdevice/add-user-device',
    deleteUserDevice: '/license.userdevice/delete-user-device',
})

export const HTTP = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
})