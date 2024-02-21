export const LICENSES = Object.freeze({
    none: { id: 0, msg: "Unknown" },
    active: { id: 1, msg: "Còn hiệu lực" },
    ready: { id: 2, msg: "Chưa đăng ký" },
    cancel: { id: 3, msg: "Hủy bỏ giấy phép" },
    expire: { id: 4, msg: "Hết hạn" },
    return: { id: 5, msg: "Trả sách" },
    revoke: { id: 6, msg: "Thu hồi giấy phép" },
    renew: { id: 7, msg: "Gia hạn" }
})


export const BADGES = Object.freeze({
    success: "success",
    primary: "primary",
    danger: "danger",
    warning: "warning",
    secondary: "secondary",
    default: "default"
})

export const ROUTES = Object.freeze({
    //common group
    app: "app",
    home: "home",
    epubReader: "epubReader",
    signin: "signin",
    signup: "signup",
    welcome: "welcome",
    bookDetail: "bookDetail",
    personalLibrary: "personalLibrary",

    //drawer
    epubDrawer: "epubDrawer",

    //stack
    homeStack: "homeStack",
    libStack: "libStack",
    accountStack: "accountStack",

    //account group
    account: "account",
    device: "device",
})

export const EPUBS = Object.freeze({
    locations: "locations",
    selected: "selected",
    loc: "loc",
    key: "key",
    metadata: "metadata",
    contents: "contents",
    search: "search",
    highlight: "highlight",
    books: "books",
    bookLocation: "book_location",
    storage: "storage",

    //theme
    theme: {
        light: "Light",
        dark: "Dark",
        tan: "Tan",
    }
})

export const OFFLINES = Object.freeze({
    addition: "addition",
    subtraction: "subtraction",
    modification: "modification"
})

export const DATES = Object.freeze({
    greater: 1,
    less: -1,
    same: 0
})

export const ICONS = Object.freeze({
    AntDesign: "AntDesign",
    Entypo: "Entypo",
    EvilIcons: "EvilIcons",
    Feather: "Feather",
    FontAwesome: "FontAwesome",
    FontAwesome5: "FontAwesome5",
    Fontisto: "Fontisto",
    Foundation: "Foundation",
    Ionicons: "Ionicons",
    MaterialIcons: "MaterialIcons",
    MaterialCommunityIcons: "MaterialCommunityIcons",
    Octicons: "Octicons",
    Zocial: "Zocial",
    SimpleLineIcons: "SimpleLineIcons",
})



export const TOPBARS = Object.freeze({
    toc: "tableOfContent",
    annotation: "annotation"
})
export const ANNOTATIONS = Object.freeze({
    hightlight: 1,
    comment: 2
})
export const MENUS = Object.freeze({
    hl: { key: "highlight", label: "Highlight" },
    cmt: { key: "comment", label: "Comment" },
})

export const AUTHS = Object.freeze({
    userToken: "userToken",
    accessToken: "accessToken",
    firstLogged: "firstLogged",
})

export const CONTEXTS = Object.freeze({
    restoreToken: "restoreToken",
    signIn: "signIn",
    signOut: "signOut",
    firstLogged: "firstLogged",
    currentUser: "currentUser"
})

export const STORE = Object.freeze({
    root: "persist:root"
})