import moment from 'moment'
import { DATES } from '../constants'
function compareDate(d1, d2) {
    const date1 = moment(d1, "DD/MM/YYYY HH:mm:ss").valueOf()
    const date2 = moment(d2, "DD/MM/YYYY HH:mm:ss").valueOf()
    console.log({ date1, date2 })
    if (date1 < date2) {
        return DATES.less
    } else if (date1 > date2) {
        return DATES.greater
    } else {
        return DATES.same
    }
}
function getSeconds(expires_in) {
    if (typeof expires_in != 'number') expires_in = parseInt(expires_in)
    const seconds = Math.round(Date.now() / 1000)
    return seconds + expires_in
}

export default { compareDate, getSeconds }