import { createSelector } from '@reduxjs/toolkit'
import { LoggerUtil } from '../utils'

//auth
export const authSelector = state => state.authSlice
export const accessTokenSelector = state => state.authSlice.accessToken
export const expiresInSelector = state => state.authSlice.expiresIn
export const userSelector = state => state.authSlice.user
export const firstLoggedSelector = state => state.authSlice.firstLogged
//device
export const devicesSelector = state => state.deviceSlice.devices
export const limitDeviceSelector = state => state.deviceSlice.limitDevice
//book
export const bookSelector = state => state.bookSlice.books
export const offlineSelector = state => state.bookSlice.offlines
export const bookLoadingSelector = state => state.bookSlice.isLoading
export const networkSelector = state => state.bookSlice.network

export const keySelector = state => state.filterSlice.key

export const epubThemeSelector = state => state.epubThemeSlice


const logger = LoggerUtil("Remaining")

export const bookRemainingSelector = createSelector(bookSelector, keySelector, (books, key) => {
    logger(JSON.stringify({ key }))
    return books.find(book => (book.userId + book.bookId) === key)
})

export const booksRemainingSelector = createSelector(bookSelector, userSelector, (books, user) => {
    logger(JSON.stringify({ user }))
    return books.filter(book => book.userId === user.userId)
})


