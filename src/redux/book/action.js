import { createAsyncThunk } from '@reduxjs/toolkit'
import { BookService, LicenseService } from '../../services'
import { DateUtil, FileSystemUtil } from '../../utils'
import moment from 'moment'
import { OFFLINES } from '../../constants'
import { DATES } from '../../constants'


const Book = {
    userId: null,
    bookId: "",
    bookName: "",
    bookType: "",
    bookDesc: "",
    bookPath: "",
    authorId: "",
    thumbnail: "",
    thumbPath: "",
    license: null,
    status: null,
    annotations: [],
    deleteCfiRange: "",
    newAnnotation: null,
    epub: {
        contents: [],
        locations: undefined,
        location: undefined,
        total: 0,
        progress: 0,
        percentage: 0,
    },
}

const Annotation = {
    annotationId: "",
    annotationTypeId: "",
    comment: "",
    content: "",
    data: "",
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
    user: {
        fullName: "",
        ownerId: ""
    },
    offline: "",
    ownerId: "",
    bookId: ""
}


export const getBooks = createAsyncThunk("getBooks", async ({ userId, offlines, accessToken, expiresIn, dispatch }) => {
    try {
        //generate folder 
        await FileSystemUtil.generateDirectory(FileSystemUtil.BOOKDIR)
        await FileSystemUtil.generateDirectory(FileSystemUtil.THUMBDIR)

        //handle annotations offline
        let newOfflines = await handleSyncOffline(offlines, accessToken, expiresIn, dispatch)

        let newBooks = []
        const getBookConfigs = { userId, accessToken, expiresIn, dispatch }
        const response = await BookService.getBooksByUser(getBookConfigs)
        if (!response.data) return newBooks //⚠️no internet or cannot fetching => reject here 
        const epubs = response.data.filter(item => item.bookType === "epub")
        for (let index = 0; index < epubs.length; index++) {
            const item = epubs[index]
            delete item.checksum

            let book = Book
            book = { ...Book, ...item, userId }
            const { bookUrl, thumbnail, bookId } = book

            const licenseConfigs = { userId, bookId, accessToken, expiresIn, dispatch }
            const license = await LicenseService.getLicense(licenseConfigs)
            const statusConfigs = { licenseId: license?.id, accessToken, expiresIn, dispatch }
            const status = await LicenseService.getStatus(statusConfigs)
            book.license = license //✅set new license
            book.status = status   //✅set new status

            const jsonBody = { ownerId: userId, bookId, annotationTypeId: 0 }
            const annoConfigs = { jsonBody, accessToken, expiresIn, dispatch }
            const { annotations } = await BookService.getAnnotations(annoConfigs)
            book.annotations = annotations //✅set new annotations

            const thumbName = FileSystemUtil.getThumbnailName(thumbnail, bookId)
            const isExistBook = await FileSystemUtil.getExistFile(FileSystemUtil.BOOKDIR, bookId)
            const isExistThumb = await FileSystemUtil.getExistFile(FileSystemUtil.THUMBDIR, thumbName)
            if (!isExistThumb) {
                const thumbPath = await FileSystemUtil.downloadThumbail(bookId, thumbnail)
                if (thumbPath) book.thumbPath = thumbPath //✅set new thumbPath
            } else {
                book.thumbPath = `${FileSystemUtil.THUMBDIR}${thumbName}`
            }
            if (!isExistBook) {
                const bookPath = await FileSystemUtil.downloadBook(bookId, bookUrl)
                if (bookPath) book.bookPath = bookPath    //✅set new bookPath
            } else {
                book.bookPath = `${FileSystemUtil.BOOKDIR}${bookId}`
            }
            newBooks.push(book)
        }
        return { newBooks, newOfflines, userId }
    } catch (error) {
        console.log({ error })
        throw new Error(error)
    }
})

export const addAnnotation = createAsyncThunk("addAnnotation", async (configs) => {
    try {
        const { key } = configs
        const response = await BookService.addAnnotation(configs)
        const newObj = { key, newAnnotation: response.annotation }
        return newObj
    } catch (error) {
        const randomId = Math.floor(Math.random() * 10000)
        const newObj = {
            key,
            newAnnotation: {
                ...Annotation,
                ...jsonBody,
                offline: OFFLINES.addition,
                annotationId: `9999${randomId}`
            }
        }
        return newObj
    }

})

export const updateAnnotation = createAsyncThunk("updateAnnotation", async (configs) => {
    try {
        const { key } = configs
        const response = await BookService.updateAnnotation(configs)
        const updateObj = { key, updateAnnotation: response.annotation }
        return updateObj
    } catch (error) {
        const updateObj = {
            key, updateAnnotation: {
                ...jsonBody,
                offline: OFFLINES.modification,
                updatedAt: new Date().getTime()
            }
        }
        return updateObj
    }
})

export const deleteAnnotation = createAsyncThunk("deleteAnnotation", async (configs) => {
    try {
        const { key, jsonBody } = configs
        const response = await BookService.deleteAnnotation(configs)
        console.log({ response })
        const deleteObj = { key, deleteAnnotation: jsonBody }
        return deleteObj
    } catch (error) {
        const delOffline = { ...jsonBody, offline: OFFLINES.subtraction }
        const deleteObj = { key, deleteAnnotation: delOffline }
        return deleteObj
    }

})

export const syncOfflineAnnotation = createAsyncThunk("syncAnnotation", async ({ offlines }) => {
    return await handleSyncOffline(offlines)
})

/**
 * 
 * @param offlines 
 * @returns newOfflines
 */
async function handleSyncOffline(offlines, accessToken, expiresIn, dispatch) {

    try {
        const promise = offlines?.map(async item => {
            console.log("handleSyncOffline >>>>", item.offline)
            const { bookId } = item
            const jsonBody = { ownerId: userId, bookId, annotationTypeId: 0 }
            const annoConfigs = { jsonBody, accessToken, expiresIn, dispatch }
            const { annotations } = await BookService.getAnnotations(annoConfigs)

            const found = annotations.find(anno => anno.annotationId == item.annotationId)
            const caseAdd = !found && item.offline === OFFLINES.addition
            const caseOfflineDelete = !found && (item.offline === OFFLINES.subtraction || item.offline === OFFLINES.modification)
            const caseDelete = found && item.offline === OFFLINES.subtraction
            const caseUpdate = found && item.offline === OFFLINES.modification

            if (caseAdd) {
                const addConfigs = { jsonBody: item, accessToken, expiresIn, dispatch }
                const resA = await BookService.addAnnotation(addConfigs)
                console.log({ resA })
                // ***ko thêm condition resA vì muốn state reject***
                if (resA.success) delete item.offline
                console.log("handleSyncOffline caseAdd")
            }

            if (caseOfflineDelete) {
                delete item.offline
                console.log("handleSyncOffline caseOfflineDelete")
            }

            if (caseDelete) {
                const delConfigs = { jsonBody: item, accessToken, expiresIn, dispatch }
                const resD = await BookService.deleteAnnotation(delConfigs)
                console.log({ resD })
                if (resD.success) delete item.offline
                console.log("handleSyncOffline caseDelete")
            }

            if (caseUpdate) {
                const d1 = moment(item.updatedAt).format("DD/MM/YYYY HH:mm:ss")
                const d2 = found?.updatedAt
                const compareDate = DateUtil.compareDate(d1, d2)
                if (compareDate === DATES.greater) {
                    const updateConfigs = { jsonBody: item, accessToken, expiresIn, dispatch }
                    const resU = await BookService.updateAnnotation(updateConfigs)
                    console.log({ resU })
                    if (resU.success) delete item.offline
                } else {
                    delete item.offline
                }
                console.log("handleSyncOffline caseUpdate")
            }
            console.log("handleSyncOffline >>>> end")
            return item
        })
        let newOfflines = await Promise.all(promise) || [] // ktra lỗi undefined
        newOfflines = newOfflines.filter(i => i.hasOwnProperty('offline'))
        console.log("newOfflines after set=", newOfflines)
        return newOfflines
    } catch (error) {
        console.log("handle offline error", error)
        return offlines
    }
}