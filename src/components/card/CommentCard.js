import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    useWindowDimensions,
    TouchableWithoutFeedback
} from 'react-native'
import React, { useState } from 'react'
import { COLORS, ICONS, SIZES } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAnnotation, updateAnnotation } from '../../redux/book/action'
import { setContentCfi } from '../../redux/filter'
import AppIcon from '../AppIcon'
import RowSection from '../RowSection'
import { accessTokenSelector, expiresInSelector, keySelector } from '../../redux/selectors'
import moment from 'moment'


const initialComment = {
    editable: false,
    editComment: ""
}

const CommentCard = ({ annotation, navigation }) => {
    const { width } = useWindowDimensions();
    const dispatch = useDispatch();
    const key = useSelector(keySelector);
    const accessToken = useSelector(accessTokenSelector)
    const expiresIn = useSelector(expiresInSelector)
    const {
        annotationTypeId,
        content,
        updatedAt,
        createdAt,
        data,
        annotationId,
        user,
        comment
    } = annotation

    const validFormatDate = moment(updatedAt, "DD/MM/YYYY HH:mm:ss").isValid();
    const [state, setState] = useState(() => {
        let state = { ...initialComment }
        state.editComment = comment ?? ""
        return state
    });

    const handleSubmitContent = () => {
        const jsonBody = { ...annotation, comment: state.editComment }
        const updateConfigs = { key, jsonBody, accessToken, expiresIn, dispatch }
        dispatch(updateAnnotation(updateConfigs))
        setState({ ...state, editable: false })
    }

    const handleDeleteContent = () => {
        const jsonBody = annotation
        const delConfigs = { key, jsonBody, accessToken, expiresIn, dispatch }
        Alert.alert('Thông báo', 'Bạn có chắc là muốn xóa ?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(deleteAnnotation(delConfigs)) },
        ]);
    }

    const handleGotoLocation = () => {
        dispatch(setContentCfi(data))
        navigation.closeDrawer();
    }

    return (
        <View style={[styles.container, { backgroundColor: COLORS.DEFAUT_WHITE }]} >
            <RowSection customContainerStyle={{ justifyContent: "space-between" }} >
                <Text style={{ fontSize: SIZES.body5 - 2, paddingLeft: 3 }} >{user?.fullName ?? "Unknow"}</Text>
                <View style={[styles.headerComment, { backgroundColor: COLORS.DEFAUT_WHITE }]} >

                    {state.editable ?
                        <View style={{ flexDirection: "row", width: 45, justifyContent: "space-between" }} >
                            <AppIcon type={ICONS.Feather} name="check" onPress={handleSubmitContent} />
                            <AppIcon type={ICONS.Feather} name="x" onPress={() => setState({ editComment: comment, editable: false })} />
                        </View>
                        :

                        <View style={{ flexDirection: "row-reverse", width: 45, justifyContent: "space-between" }} >
                            <AppIcon type={ICONS.Feather} name="trash-2" onPress={handleDeleteContent} />
                            {
                                annotationTypeId == 2
                                &&
                                <AppIcon type={ICONS.Feather} name="edit" onPress={() => setState({ ...state, editable: true })} />
                            }
                        </View>
                    }
                </View>
            </RowSection>

            <View style={{ flexDirection: 'row' }} >
                <View style={{
                    marginRight: 3,
                    backgroundColor: annotationTypeId == 2 ? COLORS.DEFAULT_COMMENT : COLORS.DEFAULT_HIGHLIGHT,
                    borderRadius: 15,
                    marginVertical: 2,
                    width: 3
                }}
                />
                <TouchableWithoutFeedback onPress={handleGotoLocation} >
                    <Text
                        style={{
                            width: width * .6,
                            color: COLORS.DEFAULT_GRAY,
                            fontSize: SIZES.body5 - 1
                        }}
                    >
                        {content}
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            {annotationTypeId == 2 && (
                <TextInput
                    editable={state.editable}
                    placeholder='Chưa có nhận xét'
                    multiline={true}
                    style={[styles.textArea]}
                    value={state.editComment}
                    onChangeText={text => setState({ ...state, editComment: text })}
                />
            )}

            <View style={styles.footerComment} >
                {/* <Text style={{ fontSize: 12 }} >{user?.fullName ?? "Unknow"}</Text> */}
                <Text style={{ fontStyle: "italic", fontSize: SIZES.body5 - 2 }} >
                    {validFormatDate ?
                        (updatedAt ?? createdAt)
                        : moment(updatedAt).format("DD/MM/YYYY HH:mm:ss")
                    }
                </Text>
            </View>

        </View>
    )
}

export default CommentCard

const styles = StyleSheet.create({
    container: {
        borderRadius: SIZES.radius,
        backgroundColor: "#ffeaa7",
        marginTop: 10,
        elevation: 5
    },
    textArea: {
        textAlignVertical: "top",
        margin: 5,
        // borderRadius: SIZES.radius,
    },
    headerComment: {
        borderTopLeftRadius: SIZES.radius,
        borderTopRightRadius: SIZES.radius,
        backgroundColor: "#fdcb6e",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 5,
    },
    footerComment: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 5,
    }
})