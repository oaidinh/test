import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import { COLORS, ICONS, ROUTES, SIZES, FONTS } from '../../constants'
import AppIcon from '../AppIcon'
import Badge from '../Badge'
import { FileSystemUtil, LabelUtil } from '../../utils'


const BookCard = ({ navigation, book, horizontal }) => {
    const { bookName, license, status, bookId, thumbPath, thumbnail } = book
    const { isExist, path } = FileSystemUtil.getViewPath(thumbPath)
    if (horizontal) {
        return (
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate(ROUTES.bookDetail, { book })}
            >
                <View style={styles.container}  >
                    <Image
                        style={styles.cardImage}
                        source={
                            { uri: isExist ? path : thumbnail }
                        }
                    />
                    <View style={styles.cardRight} >
                        <Text style={styles.bookTitle} >{bookName}</Text>
                        <View style={{ marginTop: SIZES.base / 2 }} >
                            <Text
                                style={styles.rowText} >
                                <Text style={{ ...FONTS.body5 }} >Ngày bắt đầu: </Text>{license?.rights?.start}
                            </Text>
                            <Text style={styles.rowText} >
                                <Text style={{ ...FONTS.body5 }} >Ngày kết thúc: </Text>{license?.rights?.end}
                            </Text>
                        </View>
                        <View style={{ marginVertical: SIZES.base }} >
                            <Badge
                                type={LabelUtil.getStatus(parseInt(status?.status))?.type}
                                title={LabelUtil.getStatus(parseInt(status?.status))?.message}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.bookDetail)}
            style={{
                height: 300,
                aspectRatio: 2 / 3.5,
                marginRight: 10,
                borderRadius: 6,
            }} >
            <Image
                style={{
                    width: "100%",
                    height: "79%",
                    borderRadius: 6,
                    resizeMode: "cover"
                }}
                source={{ uri: book.thumbnail }}
            />
            <Text
                style={{
                    fontWeight: "bold"
                }}
                numberOfLines={2}
            >{book.bookName}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 3 }} >
                <View style={{ flexDirection: 'row', alignItems: "center" }} >
                    <AppIcon type={ICONS.AntDesign} name="star" size={15} color={COLORS.DEFAULT_YELLOW} />
                    <Text style={{ marginLeft: 5 }} >5.0</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center", marginLeft: 10 }} >
                    <AppIcon type={ICONS.AntDesign} name="star" size={15} color={COLORS.DEFAULT_PRIMARY} />
                    <Text style={{ marginLeft: 5 }} >150.000vnd</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default BookCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.DEFAUT_WHITE,
        marginBottom: 8,
        elevation: 5,
        borderRadius: 8,
        flexDirection: 'row'
    },
    cardImage: {
        width: "25%",
        height: "100%",
        minWidth: 80,
        minHeight: 120,
        resizeMode: "cover",
        borderRadius: 8
    },
    cardRight: {
        flex: 1,
        paddingHorizontal: 10
    },
    bookTitle: {
        ...FONTS.h4,
        fontWeight: 'bold'
    },
    rowText: {
        fontSize: SIZES.body5,
        color: COLORS.DEFAULT_GRAY,
        //   marginTop: SIZES.base / 2
    }
})