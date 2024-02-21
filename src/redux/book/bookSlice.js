import { createSlice } from '@reduxjs/toolkit'
import { LoggerUtil } from '../../utils'
import { addAnnotation, deleteAnnotation, getBooks, updateAnnotation } from './action'

/**
 * Interface        # api
 *  userId          ##primary
 *  bookId          ##primary
 *  bookName
 *  bookType
 *  bookDesc
 *  thumbnail
 *  authorId
 *  license
 *  status
 *  ##########
 *  bookPath        # static
 *  thumbPath       # static
 *  location        # static
 *  locations       # static
 *  annotations
 *  contents   
 *  deleteCfiRange  # static,
 *  newAnnotation:  # static,
 */
/**
 * interface Anno {
 *  annotationId:	number,
 *  annotationTypeId:	number,
 *  comment:string,
 *  content:	string,
 *  data:	string,
 *  updatedAt:	string,
 *  user:Object,
 *  offline?:Offline
 */
const initialState = {
    books: [],
    offlines: [],
    isLoading: false,
    network: null,
    isSyncOffline: false
}

const logger = LoggerUtil("BookSlice")

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        updateEpub: (state, action) => {
            const { key, epub } = action.payload
            state.books = state.books.map(item => {
                const itemKey = item.userId + item.bookId
                if (itemKey === key)
                    item.epub = { ...item.epub, ...epub }
                return item
            })
            logger("updateEpub")
        },
        updateLocations: (state, action) => {
            const { key, locations } = action.payload
            state.books = state.books.map(item => {
                const itemKey = item.userId + item.bookId
                if (itemKey === key)
                    item.epub.locations = locations
                return item
            })
            logger("updateLocations")
        },
        updateTableOfContent: (state, action) => {
            const { key, contents } = action.payload
            state.books = state.books.map(item => {
                const itemKey = item.userId + item.bookId
                if (itemKey === key)
                    item.epub.contents = contents
                return item
            })
            logger("updateTableOfContent")
        },
        setDefaultDeleteCfi: (state, action) => {
            const { key } = action.payload
            state.books = state.books.map(item => {
                const itemKey = item.userId + item.bookId
                if (itemKey === key) {
                    item.deleteCfiRange = null
                    logger("setDefaultDeleteCfi")
                }
                return item
            })
        },
        setDefaultNewAnnotation: (state, action) => {
            const { key } = action.payload
            state.books = state.books.map(item => {
                const itemKey = item.userId + item.bookId
                if (itemKey === key) {
                    item.newAnnotation = null
                    logger("setDefaultNewAnnotation")
                }
                return item
            })
        },
        updateNetWork: (state, action) => {
            const { network } = action.payload
            state.network = network
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state) => {
            state.isLoading = true
        }),
            builder.addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false
                console.log("getBooks reject")
                console.log(action.error.message)
            }),
            builder.addCase(getBooks.fulfilled, (state, action) => {
                const { newBooks, newOfflines, userId } = action.payload
                let { books } = state
                let oldBooks = books.filter(i => i.userId !== userId)
                let updateBooks = books.filter(i => i.userId === userId)
                newBooks?.forEach(newItem => {
                    const keys = updateBooks.map(i => i.userId + i.bookId)
                    const key = newItem.userId + newItem.bookId
                    const index = keys.indexOf(key)
                    if (index === -1) {
                        updateBooks.push(newItem)
                    } else {
                        updateBooks = updateBooks.map(item => {
                            const itemKey = item.userId + item.bookId
                            const { bookPath, thumbPath, epub } = item
                            if (itemKey === key) {
                                return {
                                    ...newItem,
                                    bookPath: bookPath || newItem.bookPath,    //⚠️ giữ lại 
                                    thumbPath: thumbPath || newItem.thumbPath, //⚠️ giữ lại 
                                    epub                                       //⚠️ giữ lại 
                                }
                            }
                            return item
                        })
                    }
                })

                updateBooks = updateBooks.filter(i => newBooks.some(e => i.bookId == e.bookId))
                state.books = [...oldBooks, ...updateBooks]
                state.isLoading = false
                state.offlines = newOfflines
            }),
            //addition 
            builder.addCase(addAnnotation.fulfilled, (state, action) => {
                const { key, newAnnotation } = action.payload

                //handle offline
                if (newAnnotation.hasOwnProperty('offline')) {
                    state.offlines.push(newAnnotation)
                }
                state.books = state.books.map(item => {
                    const itemKey = item.userId + item.bookId
                    if (itemKey === key) {
                        item.annotations.unshift(newAnnotation)
                        item.newAnnotation = newAnnotation
                        logger("addAnnotation")
                    }
                    return item
                })
                // console.log(JSON.stringify(state.books))
            }),
            //modification
            builder.addCase(updateAnnotation.fulfilled, (state, action) => {
                const { key, updateAnnotation } = action.payload
                //handle offline
                if (updateAnnotation.hasOwnProperty('offline')) {
                    const found = state.offlines.find(i => i.annotationId == updateAnnotation.annotationId)
                    if (found) {
                        delete updateAnnotation.offline
                        state.offlines = state.offlines.map(i => {
                            if (i.annotationId == updateAnnotation.annotationId) {
                                i = { ...i, ...updateAnnotation }
                            }
                            return i
                        })
                        logger("update offline state")
                    } else {
                        state.offlines.push(updateAnnotation)
                        logger("push offline state")
                    }
                }
                state.books = state.books.map(item => {
                    const itemKey = item.userId + item.bookId
                    if (itemKey === key) {
                        item.annotations = item.annotations.map(child => {
                            if (updateAnnotation.annotationId === child.annotationId) {
                                child = updateAnnotation
                                logger("updateAnnotation")
                            }
                            return child
                        })
                    }
                    return item
                })
            }),
            //subtraction
            builder.addCase(deleteAnnotation.fulfilled, (state, action) => {
                const { key, deleteAnnotation } = action.payload
                //handle offline
                if (deleteAnnotation.hasOwnProperty('offline')) {
                    const found = state.offlines.find(i => i.annotationId == deleteAnnotation.annotationId)
                    if (found) {
                        state.offlines = state.offlines.map(i => {
                            if (i.annotationId == deleteAnnotation.annotationId) {
                                i.offline = deleteAnnotation.offline
                            }
                            return i
                        })
                        logger("delete offline state")
                    } else {
                        state.offlines.push(deleteAnnotation)
                        logger("push offline state")
                    }
                }
                state.books = state.books.map(item => {
                    const itemKey = item.userId + item.bookId
                    if (itemKey === key) {
                        item.annotations = item.annotations.filter(child => {
                            return deleteAnnotation.annotationId !== child.annotationId
                        })
                        logger("deleteAnnotation")
                        item.deleteCfiRange = deleteAnnotation.data
                    }
                    return item
                })
            })
    }
})




export const {
    updateEpub,
    updateLocations,
    updateTableOfContent,
    setDefaultDeleteCfi,
    setDefaultNewAnnotation,
    updateNetWork
} = bookSlice.actions

export default bookSlice.reducer