import { StyleSheet, View, TouchableWithoutFeedback, Text, Dimensions } from 'react-native'
import React, { useRef, useMemo, useCallback } from 'react'
import { COLORS, EPUBS, ICONS, SIZES, } from '../../constants'
import { useDispatch } from 'react-redux'
import { updateSettings } from '../../redux/epub/themeSlice'
import { epubThemeModeData } from '../../data'
import Slider from '@react-native-community/slider'
import BottomSheet from '@gorhom/bottom-sheet'
import AppIcon from '../AppIcon'
import RowSection from '../RowSection'


const { width } = Dimensions.get("window")

const FooterReader = ({ book, goPrev, goNext, onSlidingComplete, onSlidingSizeComplete, updateSizeSettings, size, bg }) => {
    const dispatch = useDispatch()

    // handle bottomsheet
    const bottomSheetRef = useRef(null)
    const snapPoints = useMemo(() => ['10%', '35%'], [])
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index)
    }, [])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enableContentPanningGesture={false}
        >
            <View style={styles.footer} >
                <TouchableWithoutFeedback onPress={goPrev} >
                    <View style={styles.buttonWrapper}>
                        <AppIcon type={ICONS.Feather} name="chevron-left" size={24} color={COLORS.DEFAULT_GRAY} />
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.progressWrapper} >
                    <Text style={{ paddingVertical: 5 }} >
                        {book?.epub?.total ? `${book?.epub?.progress || 1} / ${book?.epub?.total}` : "..."}
                    </Text>

                    <Slider
                        value={book?.epub?.progress}
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={book?.epub?.total || 1}
                        minimumTrackTintColor={COLORS.DEFAULT_PRIMARY}
                        maximumTrackTintColor={COLORS.DEFAULT_GRAY}
                        thumbTintColor={COLORS.DEFAULT_PRIMARY}
                        onSlidingComplete={onSlidingComplete}
                    />
                </View>
                <TouchableWithoutFeedback onPress={goNext} >
                    <View style={styles.buttonWrapper}>
                        <AppIcon type={ICONS.Feather} name="chevron-right" size={24} color={COLORS.DEFAULT_GRAY} />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View>
                <RowSection title="Thiết lập" />
                <RowSection
                    customContainerStyle={{ paddingVertical: 0 }}
                    title={`Độ phóng văn bản ${size}`}
                    rightIcon={
                        <View style={{ flexDirection: 'row', marginBottom: 5 }} >
                            <RowSection
                                customContainerStyle={{
                                    borderColor: COLORS.DEFAULT_PRIMARY,
                                    borderWidth: 1,
                                    borderRightWidth: .5,
                                    padding: 3,
                                    paddingHorizontal: 8,
                                }}
                            >
                                <AppIcon
                                    type={ICONS.Entypo}
                                    name="minus"
                                    size={SIZES.icon}
                                    color={COLORS.DEFAULT_PRIMARY}
                                    onPress={() => updateSizeSettings(size, true)}
                                />
                            </RowSection>
                            <RowSection
                                customContainerStyle={{
                                    borderColor: COLORS.DEFAULT_PRIMARY,
                                    borderWidth: 1,
                                    borderLeftWidth: .5,
                                    padding: 3,
                                    paddingHorizontal: 8
                                }}
                            >
                                <AppIcon
                                    type={ICONS.Entypo}
                                    name="plus"
                                    size={SIZES.icon}
                                    color={COLORS.DEFAULT_PRIMARY}
                                    onPress={() => updateSizeSettings(size, false)}
                                />
                            </RowSection>
                        </View>
                    }

                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Text style={{ width: 50, textAlign: "right" }} >{SIZES.epubMin}</Text>
                    <View style={[styles.progressWrapper, { height: 'auto' }]} >
                        < Slider
                            value={parseInt(size.slice(0, -1))}
                            disabled={false}
                            style={styles.slider}
                            minimumValue={SIZES.epubMin}
                            maximumValue={SIZES.epubMax}
                            step={SIZES.epubStep}
                            minimumTrackTintColor={COLORS.DEFAULT_PRIMARY}
                            maximumTrackTintColor={COLORS.DEFAULT_GRAY}
                            thumbTintColor={COLORS.DEFAULT_PRIMARY}
                            onSlidingComplete={onSlidingSizeComplete}
                        />
                    </View>
                    <Text style={{ width: 50 }} >{SIZES.epubMax}</Text>
                </View>

                <RowSection title="Chế độ hiển thị" />
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.horizontal + 5, justifyContent: 'space-around' }} >

                    {epubThemeModeData.map((item, index) => (
                        <TouchableWithoutFeedback

                            key={index}
                            onPress={() => dispatch(updateSettings({ bg: item.styles.bg, color: item.styles.color }))}
                        >
                            <View style={{
                                backgroundColor: item.name === EPUBS.theme.light ? COLORS.DEFAUT_WHITE2 : item.styles.bg,
                                paddingVertical: 10,
                                paddingHorizontal: 30,
                                borderColor: bg === item.styles.bg ? COLORS.DEFAULT_PRIMARY : "transparent",
                                borderWidth: 2,
                                borderRadius: SIZES.radius
                            }} >
                                <Text style={{
                                    color: item.styles.color
                                }} >
                                    {item.label}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
        </BottomSheet >
    )
}

export default FooterReader

const styles = StyleSheet.create({
    footer: {
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