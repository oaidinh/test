import { createSlice } from '@reduxjs/toolkit'
import { LoggerUtil } from '../../utils'
import { addAndGetDevices, getDevices } from './action'

const initialState = {
    devices: [],
    limitDevice: false
}

const logger = LoggerUtil("DeviceSlice")
const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        deleteDevice: (state, action) => {
            const delDevice = action.payload
            state.devices = state.devices.filter(item => item.userDeviceId != delDevice.userDeviceId)
            if (state.devices.length != 5) {
                state.limitDevice = false
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(addAndGetDevices.rejected, () => {
            logger("addAndGetDevices reject")
        }),
            builder.addCase(addAndGetDevices.fulfilled, (state, action) => {
                const { limitDevice, devices } = action.payload
                state.devices = devices
                state.limitDevice = limitDevice
            })
    }
})

export const { deleteDevice } = deviceSlice.actions
export default deviceSlice.reducer