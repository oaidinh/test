import { LoggerUtil } from '../../utils'
const { createSlice } = require('@reduxjs/toolkit')


const initialState = {
    key: null,
    contentCfiRange: null,
}
const logger = LoggerUtil("FilterSlice")
const filterSlice = createSlice({
    initialState,
    name: "filter",
    reducers: {
        setKey: (state, action) => {
            state.key = action.payload
            logger(`Set key= ${state.key}`)
        },
        setContentCfi: (state, action) => {
            state.contentCfiRange = action.payload
        },
        setDefaultContentCfi: (state) => {
            state.contentCfiRange = null
        },

    }
})
export const {
    setKey,
    setContentCfi,
    setDefaultContentCfi,
} = filterSlice.actions

export default filterSlice.reducer