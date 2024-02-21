import { LICENSES, COLORS, BADGES } from '../constants'

const getStatus = (status) => {
    switch (status) {
        case LICENSES.active.id:
            return {
                type: BADGES.success,
                message: LICENSES.active.msg
            }
        case LICENSES.revoke.id:
            return {
                type: BADGES.warning,
                message: LICENSES.revoke.msg
            }
        case LICENSES.expire.id:
            return {
                type: BADGES.danger,
                message: LICENSES.expire.msg
            }
        case LICENSES.ready.id:
            return {
                type: BADGES.primary,
                message: LICENSES.ready.msg
            }
        default:
            return {
                type: BADGES.secondary,
                message: LICENSES.none.msg
            }
    }
}

const getColorBadge = type => {
    switch (type) {
        case BADGES.primary:
            return COLORS.primary
        case BADGES.success:
            return COLORS.success
        case BADGES.secondary:
            return COLORS.secondary
        case BADGES.danger:
            return COLORS.danger
        case BADGES.warning:
            return COLORS.warning
        default:
            return COLORS.default
    }
}

export default { getStatus, getColorBadge }