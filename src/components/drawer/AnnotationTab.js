import React, { useLayoutEffect, useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { CommentCard } from '../card';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../constants';
import { addAnnotation } from '../../redux/book/action';
import { accessTokenSelector, bookRemainingSelector, expiresInSelector, keySelector } from '../../redux/selectors';


const initialComment = {
    bookId: 0,
    annotationTypeId: 0,
    data: "",
    content: "",
    ownerId: 0,
    comment: ""
}

const AnnotationTab = ({ isAddAnnotation, annotation, navigation }) => {
    const dispatch = useDispatch()
    const book = useSelector(bookRemainingSelector)
    const key = useSelector(keySelector)
    const accessToken = useSelector(accessTokenSelector)
    const expiresIn = useSelector(expiresInSelector)
    const [comment, setComment] = useState(annotation)
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(isAddAnnotation)

    useLayoutEffect(() => {
        return () => {
            navigation.setParams({ isAddAnnotation: false })
        }
    }, [])

    const handleSubmit = () => {
        setLoading(true)
        try {
            if (!comment.bookId) return alert("Không thêm được nhận xét");
            const jsonBody = comment
            const configs = { key, jsonBody, accessToken, expiresIn, dispatch }
            dispatch(addAnnotation(configs))
            setComment(initialComment)
            setShowForm(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    const handleClose = () => {
        navigation.closeDrawer()
    }

    if (loading) {
        return <Text>Loading...</Text>
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.DEFAUT_WHITE,
                paddingHorizontal: 10
            }}
        >
            {showForm && (
                <View
                    style={{
                        backgroundColor: COLORS.DEFAUT_WHITE,
                        marginTop: SIZES.base,
                        elevation: 5,
                        padding: SIZES.base,
                    }}
                >
                    <Text style={{ padding: SIZES.base / 2 }}  >{comment.content}</Text>
                    <TextInput
                        multiline
                        placeholder='Nhập nhận xét'
                        value={comment?.comment}
                        onChangeText={text => setComment({ ...comment, comment: text })}
                        style={{
                            padding: SIZES.base / 2,
                        }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "flex-end",
                        marginVertical: 5
                    }} >
                        <TouchableOpacity
                            style={{
                                padding: 5,
                                paddingHorizontal: SIZES.base,
                                backgroundColor: COLORS.DEFAULT_PRIMARY,
                                borderRadius: SIZES.radius
                            }}
                            onPress={handleSubmit}
                        >
                            <Text style={{ color: COLORS.DEFAUT_WHITE }} >Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: 5,
                                paddingHorizontal: SIZES.base,
                                backgroundColor: COLORS.DEFAUT_WHITE,
                                borderRadius: SIZES.radius,
                                marginHorizontal: 5
                            }}
                            onPress={handleClose}
                        >
                            <Text>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {
                book?.annotations?.map((anno) => {
                    return (
                        <CommentCard key={anno.annotationId} annotation={{ ...anno, bookId: book.bookId, ownerId: book.userId }} navigation={navigation} />
                    )
                })
            }

        </View>
    );
}

export default AnnotationTab