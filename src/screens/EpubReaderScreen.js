import { StyleSheet, View, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { WebView } from 'react-native-webview'
import { AppIcon, Spinner } from '../components'
import { EPubThemeUtil, ToastUtil } from '../utils'
import { ANNOTATIONS, COLORS, EPUBS, ICONS, MENUS, SIZES, TOPBARS } from '../constants'
import { useDispatch, useSelector } from 'react-redux'
import { accessTokenSelector, bookRemainingSelector, epubThemeSelector, expiresInSelector, keySelector, userSelector } from '../redux/selectors'
import { setDefaultContentCfi, setKey } from '../redux/filter'
import { addAnnotation } from '../redux/book/action'
import {
    updateEpub,
    updateLocations,
    updateTableOfContent,
    setDefaultDeleteCfi,
    setDefaultNewAnnotation,
} from '../redux/book/bookSlice'
import { updateSettings } from '../redux/epub/themeSlice'
import { FooterReader } from '../components/epub'




const { width } = Dimensions.get("window")


const EpubReaderScreen = ({ bookBase64, navigation, bookId, navStack }) => {
    const dispatch = useDispatch()
    const webview = useRef()
    const { contentCfiRange } = useSelector(state => state.filterSlice)

    const book = useSelector(bookRemainingSelector)
    const user = useSelector(userSelector)
    const key = useSelector(keySelector)
    const accessToken = useSelector(accessTokenSelector)
    const expiresIn = useSelector(expiresInSelector)
    const { bg, color, size } = useSelector(epubThemeSelector)
    const bookLocation = book?.epub?.location
    const bookLocations = book?.epub?.locations

    const [isLoading, setIsLoading] = useState(true)
    const [results, setResults] = useState([])
    const [valSelected, setValSelected] = useState({
        cfiRange: "",
        selectedText: ""
    })

    useLayoutEffect(() => {
        dispatch(setKey(user?.userId + bookId))
    }, [])

    useEffect(() => {
        if (bookBase64) {
            setIsLoading(false)
            ToastUtil.showToast("Mở sách")
        }
    }, [])

    useEffect(() => {
        navStack.setOptions({
            headerRight: () => (
                <View style={{}} >
                    <AppIcon
                        type={ICONS.FontAwesome5}
                        name="align-justify"
                        size={20}
                        color="#000000"
                        onPress={() => navigation.toggleDrawer()}
                    />

                </View>
            ),
            tabBarVisible: false,
            tabBarStyle: { display: 'none' }
        })
    }, [navStack, valSelected])

    useEffect(() => {
        if (!book?.deleteCfiRange) return
        console.log("run effect delete")
        onDeleteAnno(book?.deleteCfiRange)
    }, [book?.deleteCfiRange])

    useEffect(() => {
        if (!contentCfiRange) return
        console.log("run effect content")
        goLocations(contentCfiRange)
    }, [contentCfiRange])

    useEffect(() => {
        const newAnno = book?.newAnnotation
        if (!newAnno) return
        console.log("run effect add")
        onAnnotated(newAnno.annotationId, newAnno.data, newAnno.annotationTypeId)
    }, [book?.newAnnotation])

    useEffect(() => {
        webview.current?.injectJavaScript(`
        window.rendition.themes.register("theme", ${JSON.stringify(EPubThemeUtil.themeToStyle({ bg, color, size }))})
        window.rendition.themes.select("theme")
        window.rendition.themes.fontSize("${size}")
        `)
        onReload()
    }, [bg, color, size])


    let injectedJS = `
    window.BOOK_BASE64 = "${bookBase64}"
    window.LOCATIONS = ${bookLocations}
    window.THEME = ${JSON.stringify(EPubThemeUtil.themeToStyle({ bg, color, size }))}
    window.SIZE = "${size}"
    `

    if (bookLocation) {
        injectedJS = `
        ${injectedJS}
        window.BOOK_LOCATION = "${bookLocation}"
    `
    }

    //highlight
    const handleAddAnnotation = async (annotationTypeId, data, content) => {
        if (!valSelected.cfiRange) return
        const jsonBody = {
            ownerId: user?.userId,
            bookId: book?.bookId,
            data,
            content,
            annotationTypeId,
            // for offline
            user: {
                fullName: user?.hoTen,
                ownerId: user?.userId,
            }
        }
        const addConfigs = { key, jsonBody, accessToken, expiresIn, dispatch }
        dispatch(addAnnotation(addConfigs))
    }

    function onAnnotated(annotationId, cfiRange, annotationTypeId) {
        const colorStr = annotationTypeId == 2 ? "green" : "yellow"
        webview.current?.injectJavaScript(`
            window.rendition.annotations.highlight("${cfiRange}", {}, (e) => {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: 'highlight',
                        annotationId:${annotationId},
                        cfiRange:'${cfiRange}',
                        message:"highlighted"
                    })
                )
            }, "hl", { "fill": "${colorStr}", "fill-opacity": "0.3", "mix-blend-mode": "multiply" })
        `)
        setValSelected({
            cfiRange: "",
            selectedText: ""
        })
        dispatch(setDefaultNewAnnotation({ key }))
    }



    const onloadAnnotations = async () => {
        book?.annotations?.forEach(e => {
            if (e.data) {
                const colorStr = e.annotationTypeId == 2 ? "green" : "yellow"
                webview.current?.injectJavaScript(`
                window.rendition.annotations.highlight("${e.data}", {}, (e) => {
                    window.ReactNativeWebView.postMessage(
                        JSON.stringify({
                            type: 'highlight',
                            annotationId:${e.annotationId},
                            cfiRange:'${e.data}',
                            message: "onload annotation",
                        })
                    )
                }, "hl", { "fill":"${colorStr}", "fill-opacity": "0.3", "mix-blend-mode": "multiply" })
            `)
            }
        })
    }


    const handleMessage = async (e) => {
        let parseData = JSON.parse(e.nativeEvent.data)
        const { type } = parseData
        delete parseData.type
        switch (type) {
            case EPUBS.key:
                onloadAnnotations()
                console.log({ key })
                return
            case EPUBS.contents:
                const { contents } = parseData
                dispatch(updateTableOfContent({ key, contents }))
                return
            case EPUBS.search:
                setResults(parseData.results)
                return
            case EPUBS.loc:
                const epub = parseData
                dispatch(updateEpub({ key, epub }))
                return
            case EPUBS.locations:
                const { locations } = parseData
                dispatch(updateLocations({ key, locations }))
                return
            case "load":
                console.log('LOAD', parseData)
                return
            case "error":
                console.log('ERROR', parseData)
                return
            case EPUBS.selected:
                // console.log("selected", parseData)
                const { cfiRange, selectedText } = parseData
                setValSelected({ cfiRange, selectedText })
                return
            case EPUBS.highlight:
                navigation.setParams({ jumtoAnnoTab: TOPBARS.annotation })
                navigation.openDrawer()
                return
            default:
                return
        }
    }

    function goPrev() {
        webview.current?.injectJavaScript(`window.rendition.prev()`)
    }

    function goNext() {
        webview.current?.injectJavaScript(`window.rendition.next()`)
    }

    function goLocations(href) {
        webview.current?.injectJavaScript(`window.rendition.display("${href}")`)
        dispatch(setDefaultContentCfi())
    }

    function onSearch(q) {
        webview.current?.injectJavaScript(`
        Promise.all(
        	window.book.spine.spineItems.map((item) => {
        		return item.load(window.book.load.bind(window.book)).then(() => {
        			let results = item.find('${q}'.trim())
        			item.unload()
        			return Promise.resolve(results)
        		})
        	})
        ).then((results) =>
        	window.ReactNativeWebView.postMessage(
        		JSON.stringify({ type: 'search', results: [].concat.apply([], results) })
        	)
        )`)
    }

    function setTheme() {
        console.log("clicked")
        webview.current?.injectJavaScript(`
        window.rendition.themes.register("light", ${JSON.stringify({
            body: {
                background: '#000',
                color: '#fff',
                'font-size': '100%',
            },
        })})
        window.rendition.themes.select("light")
		window.rendition.themes.fontSize("200%")
        `)
        onReload()
    }

    function onReload() {
        webview.current?.reload()
    }

    function onDeleteAnno(cfiRange) {
        webview.current?.injectJavaScript(`window.rendition.annotations.remove("${cfiRange}","highlight")`)
        dispatch(setDefaultDeleteCfi({ key }))
    }

    function onSlidingComplete(n) {
        goLocations(JSON.parse(bookLocations)[Math.round(n)])
    }
    function onSlidingSizeComplete(n) {
        console.log('set font', Math.round(n))
        dispatch(updateSettings({ size: `${Math.round(n)}%` }))
    }

    function updateSizeSettings(oldSize, isMinus) {
        const value = isMinus ? -SIZES.epubStep : SIZES.epubStep
        const sizeNumber = parseInt(oldSize.slice(0, -1))
        let newSize = sizeNumber + value
        const isMin = newSize <= SIZES.epubMin
        const isMax = newSize >= SIZES.epubMax

        if (isMin)
            newSize = SIZES.epubMin
        else if (isMax)
            newSize = SIZES.epubMax

        const size = newSize + "%"
        dispatch(updateSettings({ size }))
    }

    if (isLoading) return <Spinner />


    return (
        <View style={styles.container}>
            <WebView
                ref={webview}
                source={{ uri: 'file:///android_asset/epub.html' }}
                style={{ flex: 1, marginBottom: 55 }}
                injectedJavaScriptBeforeContentLoaded={injectedJS}
                onMessage={handleMessage}
                menuItems={[{ label: MENUS.hl.label, key: MENUS.hl.key }, { label: MENUS.cmt.label, key: MENUS.cmt.key }]}
                onCustomMenuSelection={(webViewEvent) => {
                    const { label, key, selectedText } = webViewEvent.nativeEvent
                    if (key === MENUS.hl.key) {
                        handleAddAnnotation(ANNOTATIONS.hightlight, valSelected.cfiRange, valSelected.selectedText)
                    } else if (key === MENUS.cmt.key) {
                        // NOTE: check cfi rỗng
                        const annotation = {
                            ownerId: user?.userId,
                            bookId: book.bookId,
                            data: valSelected.cfiRange,
                            content: valSelected.selectedText,
                            annotationTypeId: ANNOTATIONS.comment,
                            comment: ""
                        }
                        navigation.setParams({ jumtoAnnoTab: TOPBARS.annotation, isAddAnnotation: true, annotation })
                        navigation.openDrawer()
                    }
                }}

            />
            {/* Footer */}
            <FooterReader
                bg={bg}
                book={book}
                goPrev={goPrev}
                goNext={goNext}
                onSlidingComplete={onSlidingComplete}
                onSlidingSizeComplete={onSlidingSizeComplete}
                updateSizeSettings={updateSizeSettings}
                size={size}
            />
        </View >
    )
}

export default EpubReaderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    footer: {
        // height: 45,
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.DEFAUT_WHITE
    },
    progressWrapper: {
        flex: 1,
        height: 52,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonWrapper: {
        height: 30,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: "100%",
        height: 5
    }
})