import ReactNativeBlobUtil from 'react-native-blob-util'

const DOWNLOADDIR = ReactNativeBlobUtil.fs.dirs.DownloadDir
const BOOKDIR = DOWNLOADDIR + "/books/"
const THUMBDIR = DOWNLOADDIR + "/thumbnails/"



async function generateDirectory(dir) {
    const isExist = await ReactNativeBlobUtil.fs.exists(dir)
    if (!isExist)
        ReactNativeBlobUtil.fs.mkdir(dir)
}
async function checkExistDirectory(dir) {
    return await ReactNativeBlobUtil.fs.exists(dir)
}

function getThumbnailName(thumbnail, bookId) {
    const extension = thumbnail.split(".").pop()
    return `thumbnail_${bookId}.${extension}`
}

function getViewPath(path) {
    if (path)
        return { isExist: true, path: `file://${path}` }
    return { isExist: false, path: "" }
}

async function getExistFile(dir, name) {
    try {
        const filesName = await ReactNativeBlobUtil.fs.ls(dir)
        return filesName.some(fName => fName === name)
    } catch (err) {
        console.log(err)
    }
}

async function downloadBook(bookId, bookUrl) {
    try {
        const res = await ReactNativeBlobUtil
            .config({
                fileCache: true,
                overwrite: true,
                addAndroidDownloads: {
                    path: `${BOOKDIR}${bookId}`,
                    useDownloadManager: true,
                    notification: false,
                }
            })
            .fetch('GET', bookUrl)
        console.log("book-downloaded", res.data)
        return res.data
    } catch (errorMessage) {
        // error handling
        console.log({ bookId })
        console.log(errorMessage)
        return null
    }
}

async function downloadThumbail(bookId, thumbnail) {
    const name = getThumbnailName(thumbnail, bookId)
    try {
        const res = await ReactNativeBlobUtil.config({
            fileCache: true,
            overwrite: true,
            addAndroidDownloads: {
                path: `${THUMBDIR}${name}`,
                useDownloadManager: true,
                notification: false,
            }
        })
            .fetch('GET', thumbnail)
        console.log("thumbnail-downloaded", res.data)
        return res.data
    } catch (errorMessage) {
        // error handling
        console.log({ thumbnail })
        console.log(errorMessage)
        return null
    }
}

export default {
    BOOKDIR,
    THUMBDIR,
    getExistFile,
    downloadBook,
    downloadThumbail,
    generateDirectory,
    checkExistDirectory,
    getThumbnailName,
    getViewPath
}
