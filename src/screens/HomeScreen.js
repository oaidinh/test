import {
    ToastAndroid,
    FlatList,
    StyleSheet,
    Text, View,
    Dimensions,
    RefreshControl,
    Image,
    TextInput
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { LoggerUtil } from '../utils'
import { AppIcon, Spinner, TitleSection } from '../components'
import { BookCard } from '../components/card'
import { AUTH, COLORS, ICONS } from '../constants'
import { getAndroidId } from 'react-native-device-info'
import { BookService } from '../services'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../context/AuthContext'


const homeLogger = LoggerUtil("Home")
const { width, height } = Dimensions.get("screen")



const HomeScreen = ({ navigation }) => {

    const { setFirstLogged } = useContext(AuthContext)
    const [books, setBooks] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    async function fetchData() {
        const { data } = await BookService.getBooks()
        const sliceData = data //.reverse() //data.slice(0, 5)
        const androidId = await getAndroidId()
        homeLogger("android ID " + androidId)
        setBooks(sliceData)
    }

    async function handleSetFirstLogin() {
        const firstlogged = await AsyncStorage.getItem(AUTH.FIRST_LOGGED)
        if (!firstlogged) {
            await AsyncStorage.setItem(AUTH.FIRST_LOGGED, "true")
            const isLogged = await AsyncStorage.getItem(AUTH.FIRST_LOGGED)
            homeLogger({ isLogged })
            setFirstLogged(isLogged)
        }
    }

    async function handleOnRefresh() {
        setIsRefreshing(true)
        await fetchData()
        setIsRefreshing(false)
    }

    useEffect(() => {
        handleSetFirstLogin()
        fetchData()
    }, [])


    function renderCarousel() {
        return (
            <GestureHandlerRootView>
                <Carousel
                    loop
                    width={width - 20}
                    height={width / 2}
                    autoPlay={true}
                    data={[
                        require(`../assets/images/6879433.jpg`),
                        require(`../assets/images/7945313.jpg`)
                    ]}
                    scrollAnimationDuration={1000}
                    // onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item, index }) => {
                        return <View
                            style={{
                                flex: 1,
                                // borderWidth: 1,
                                backfaceVisibility: "blue",
                                justifyContent: 'center',
                                margin: 5,
                            }}
                        >
                            <Image style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover",
                                borderRadius: 6
                            }}
                                source={item}
                            />
                        </View>
                    }}
                />
            </GestureHandlerRootView>
        )
    }

    function renderCaterogies() {
        return (
            <View>
                <TitleSection title="Thể loại" onPress={() => alert("clicked")} />
                <FlatList
                    data={[
                        {
                            id: 1,
                            title: "Classic",
                            image: "https://w0.peakpx.com/wallpaper/127/366/HD-wallpaper-books-on-bookshelf.jpg"
                        },
                        {
                            id: 2,
                            title: "Fantasy",
                            image: "https://w0.peakpx.com/wallpaper/625/318/HD-wallpaper-book-of-fantasy-magic-fantasy-magic-skies-book-sailboat.jpg"
                        },
                        {
                            id: 3,
                            title: "Romance",
                            image: "https://w0.peakpx.com/wallpaper/326/218/HD-wallpaper-book-of-love-romantic-romance-book-hearts-bokeh-valentines-day-love-bright-oragne-thumbnail.jpg"
                        },
                        {
                            id: 4,
                            title: "Science fiction",
                            image: "https://best-sci-fi-books.com/wp-content/uploads/2021/05/sequel.jpg"
                        },
                    ]}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    // contentContainerStyle={{ padding: 10 }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                width: 200,
                                aspectRatio: 2 / 1,
                                marginRight: 5,
                                // backgroundColor: "red",
                                position: "relative"
                            }} >
                                <Image style={{
                                    borderRadius: 6,
                                    width: "100%",
                                    height: "100%",
                                    resizeMode: "cover"
                                }}
                                    source={{ uri: item.image }}
                                />
                                <Text style={{
                                    position: "absolute",
                                    bottom: 10,
                                    left: 10,
                                    zIndex: 1,
                                    color: COLORS.DEFAUT_WHITE,
                                    fontWeight: "bold",
                                    backgroundColor: "#00000080",
                                    paddingHorizontal: 5,
                                    paddingVertical: 2

                                }} >{item.title}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    function renderTrending() {
        return (
            <View>
                <TitleSection title="Xu hướng" />
                <FlatList
                    data={books}
                    keyExtractor={item => item.bookId.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <BookCard book={item} navigation={navigation} />}
                />
            </View>
        )
    }

    function renderRecommendedForYou() {
        return (
            <View>
                <TitleSection title="Gợi ý cho bạn" />
                <FlatList
                    data={books}
                    keyExtractor={item => item.bookId.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <BookCard book={item} navigation={navigation} />}
                />
            </View>
        )
    }
    if (isRefreshing) {
        return <Spinner />
    }

    return (
        <View style={styles.container}>

            {/* header */}
            <View style={{
                // height: 200,
                padding: 10,
                width,
                backgroundColor: COLORS.DEFAULT_PRIMARY
            }} >

                {/* title */}
                <View style={styles.headerTitle} >
                    <View>
                        {/* <Text>Hi, Rookie</Text> */}
                        <Text>What book you want read today?</Text>
                    </View>
                    <View>
                        <Text>Avatar</Text>
                    </View>
                </View>

                {/* search */}
                <View style={styles.headerSearch} >
                    <TextInput style={styles.headerSearchInput} placeholder='Tìm sách ngay...' />
                    <AppIcon type={ICONS.FontAwesome} name="search" size={20} onPress={() => ToastAndroid.showWithGravityAndOffset("search", ToastAndroid.SHORT, ToastAndroid.TOP, 0, 0)} />
                </View>
            </View>



            {/* body */}
            <View
            // style={{ backgroundColor: "red" }}
            >
                <FlatList
                    refreshControl={
                        <RefreshControl
                            onRefresh={handleOnRefresh}
                            refreshing={isRefreshing}
                            colors={["red", "blue"]}
                        />}

                    ListHeaderComponent={
                        <View>
                            {/* carousel */}
                            {/* {renderCarousel()} */}

                            {/* Kind of book */}
                            {/* {renderCaterogies()} */}

                            {/* Trending book */}
                            {/* {renderTrending()} */}

                            {/* Recommended for you */}
                            {/* {renderRecommendedForYou()} */}

                            <TitleSection title="Danh sách sách" />
                        </View>
                    }
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    data={books}
                    keyExtractor={item => item.bookId.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{ marginVertical: 10, marginBottom: 110 }}
                    renderItem={({ item }) => <BookCard horizontal book={item} navigation={navigation} />}
                />
            </View>

        </View>
    )
}

export default HomeScreen



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundCurvedContainer: {
        backgroundColor: COLORS.DEFAULT_GREEN,
        height: height * 3,
        position: 'absolute',
        top: -1 * (height * 3 - 250),
        width: height * 3,
        borderRadius: height * 3,
        alignSelf: 'center',
        zIndex: -1,
    },
    headerContainer: {
        justifyContent: 'space-between',
        height: 200,
    },
    headerTitle: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    headerSearch: {
        flexDirection: "row",
        borderRadius: 6,
        backgroundColor: COLORS.DEFAUT_WHITE,
        alignItems: "center",
        paddingHorizontal: 10
    },
    headerSearchInput: {
        flex: 1
    }
})