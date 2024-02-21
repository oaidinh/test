import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS, SIZES } from '../../constants'
import { setContentCfi } from '../../redux/filter'
import { bookRemainingSelector } from '../../redux/selectors'


const TableOfContentTab = ({ navigation }) => {
    const dispatch = useDispatch()
    const book = useSelector(bookRemainingSelector)

    const handleSetContentCfi = (href) => {
        dispatch(setContentCfi(href))
        navigation.closeDrawer()
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.DEFAUT_WHITE }}>

            {book?.epub?.contents?.map((i, index) => {
                // const key = i.href + "_" + Math.floor(Math.random() * 1000);
                // console.log('KEY', index);
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSetContentCfi(i.href)}
                        style={{
                            padding: SIZES.base,
                            borderBottomColor: "#eee",
                            borderBottomWidth: 1
                        }}
                    >
                        <Text>{i.label}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
};

export default TableOfContentTab