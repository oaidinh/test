import { COLORS, EPUBS } from '../constants'

export default [
    {
        name: EPUBS.theme.light,
        label: "Sáng",
        styles: {
            bg: COLORS.epubLight,
            color: COLORS.epubDark
        }
    },
    {
        name: EPUBS.theme.dark,
        label: "Tối",
        styles: {
            bg: COLORS.epubDark,
            color: COLORS.epubLight
        }
    },
    {
        name: EPUBS.theme.tan,
        label: "Ấm",
        styles: {
            bg: COLORS.epubTan,
            color: COLORS.epubLight
        }
    },
]