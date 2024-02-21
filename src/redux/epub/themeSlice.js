import { COLORS, SIZES } from '../../constants'

const { createSlice } = require('@reduxjs/toolkit')
const { LoggerUtil } = require('../../utils')


const initialState = {
    bg: COLORS.epubLight,
    color: COLORS.epubDark,
    size: `${SIZES.epubSize}%`
}

const logger = LoggerUtil("EpubThemeSlice")

const epubThemeSlice = createSlice({
    name: "epubTheme",
    initialState,
    reducers: {
        updateSize: (state, action) => {
            const { newSize } = action.payload
            state.size = newSize
        },
        updateColorMode: (state, action) => {
            const { bg, color } = action.payload
            state.bg = bg
            state.color = color
        },
        updateSettings: (state, action) => {
            const newSettings = { ...state, ...action.payload }

            state.bg = newSettings.bg
            state.color = newSettings.color
            state.size = newSettings.size
            logger(JSON.stringify(state))
        }
    }
})


export const { updateSettings } = epubThemeSlice.actions
export default epubThemeSlice.reducer

