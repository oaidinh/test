import React, { useState, useLayoutEffect } from "react"
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { DrawerContentScrollView, useDrawerStatus } from '@react-navigation/drawer'
import { COLORS, ICONS, SIZES, TOPBARS } from '../../constants'
import TableOfContentTab from './TableOfContentTab'
import AnnotationTab from './AnnotationTab'
import AppIcon from '../AppIcon'


const sections = [
    { name: TOPBARS.toc, icon: 'table-of-contents' },
    { name: TOPBARS.annotation, icon: 'comment-quote-outline' },
];

const DrawerContentTab = (props) => {
    const isOpen = useDrawerStatus()
    const [route, setRoute] = useState(TOPBARS.toc)

    let jumtoAnnoTab = props?.state?.routes[0]?.params?.jumtoAnnoTab
    let isAddAnnotation = props?.state?.routes[0]?.params?.isAddAnnotation
    let annotation = props?.state?.routes[0]?.params?.annotation

    useLayoutEffect(() => {
        if (isOpen === "closed") {
            props.navigation.setParams({ jumtoAnnoTab: undefined, isAddAnnotation: false })
            setRoute(TOPBARS.toc)
        }
    }, [isOpen])

    useLayoutEffect(() => {
        if (jumtoAnnoTab) setRoute(jumtoAnnoTab)
    }, [jumtoAnnoTab])

    const renderScene = () => {
        switch (route) {
            case TOPBARS.toc:
                return <TableOfContentTab navigation={props.navigation} />
            case TOPBARS.annotation:
                return <AnnotationTab
                    navigation={props.navigation}
                    isAddAnnotation={isAddAnnotation}
                    annotation={annotation}
                />
            default:
                return null;
        }
    };

    return (
        <DrawerContentScrollView {...props}  >
            <View style={styles.wrapper}>
                <View style={styles.iconWrapper}>
                    {sections.map(({ name, icon }, i) => (
                        <TouchableOpacity
                            onPress={() => setRoute(name)}
                            style={
                                route === name
                                    ? [styles.sectionButton, styles.selectedSectionButton]
                                    : styles.sectionButton
                            }
                            key={i}>
                            <AppIcon
                                name={icon}
                                type={ICONS.MaterialCommunityIcons}
                                size={SIZES.lagreIcon}
                                color={route === name ? COLORS.DEFAULT_PRIMARY : COLORS.DEFAULT_GRAY}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                {renderScene()}
            </View>

        </DrawerContentScrollView>
    )
}

export default DrawerContentTab

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingBottom: SIZES.base
    },
    iconWrapper: {
        flexDirection: 'row',
        paddingRight: 15,
        paddingBottom: 10
    },
    sectionButton: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSectionButton: {
        borderColor: COLORS.DEFAULT_PRIMARY,
        borderBottomWidth: 2
    }
})