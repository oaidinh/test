import { createAsyncThunk } from '@reduxjs/toolkit'
import { DeviceService } from '../../services'

export const addAndGetDevices = createAsyncThunk("addAndGetDevices", async (configs) => {
    await DeviceService.addDevice(configs)
    const { deviceId } = configs.jsonBody
    const res = await DeviceService.getDevices(configs)
    const devices = res.data
    const existDevice = res.data.some(d => d.deviceId === deviceId)
    const limitDevice = !existDevice && res.count == 5
    return { limitDevice, devices }
})