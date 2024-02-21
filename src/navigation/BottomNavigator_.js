import { Text, View, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLORS } from '../constants'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const Tab = createBottomTabNavigator()

const HomeScreen = () => (
    <View style={{
        height: 60,
        flexDirection: 'row',
        backgroundColor: 'red'
    }} >
        <Animated.View
            style={[
                {
                    flex: 3,
                    alignItems: "center",
                    justifyContent: 'center',
                },

            ]}
        >
            <Animated.View
                style={[
                    {
                        flexDirection: 'row',
                        width: "80%",
                        height: 50,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: 25,
                    },

                ]}
            >
                <Text>ABC</Text>
                {true && (
                    <Text
                        numberOfLines={1}
                        style={{ color: '#222' }} >
                        oai
                    </Text>
                )}
            </Animated.View>

        </Animated.View>

        <Animated.View
            style={[
                {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: 'center',
                },

            ]}
        >
            <Animated.View
                style={[
                    {
                        flexDirection: 'row',
                        width: "80%",
                        height: 50,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: 25,
                    },

                ]}
            >
                <Text>ABC</Text>
                {true && (
                    <Text
                        numberOfLines={1}
                        style={{ color: '#222' }} >
                        oai
                    </Text>
                )}
            </Animated.View>

        </Animated.View>

        <Animated.View
            style={[
                {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: 'center',
                },

            ]}
        >
            <Animated.View
                style={[
                    {
                        flexDirection: 'row',
                        width: "80%",
                        height: 50,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: 25,
                    },

                ]}
            >
                <Text>ABC</Text>
                {true && (
                    <Text
                        numberOfLines={1}
                        style={{ color: '#222' }} >
                        oai
                    </Text>
                )}
            </Animated.View>

        </Animated.View>
    </View>
)

const SettingsScreen = () => (
    <View>
        <Text>Home Screen</Text>
    </View>
)
const SettingsScreen1 = () => (
    <View>
        <Text>Home Screen</Text>
    </View>
)
const SettingsScreen2 = () => (
    <View>
        <Text>Home Screen</Text>
    </View>
)
const SettingsScreen3 = () => (
    <View>
        <Text>Home Screen</Text>
    </View>
)

const MyTabBar = ({ state, descriptors, navigation }) => {
    //
    const tabFlex = useSharedValue(1)
    const tabColor = useSharedValue(COLORS.DEFAUT_WHITE)
    const homeTabFlex = useSharedValue(1)
    const homeTabColor = useSharedValue(COLORS.DEFAUT_WHITE)
    const settingsTabFlex = useSharedValue(1)
    const settingsTabColor = useSharedValue(COLORS.DEFAUT_WHITE)


    //Reanimated Animated Style
    const homeFlexStyle = useAnimatedStyle(() => ({ flex: homeTabFlex.value }))
    const homeColorStyle = useAnimatedStyle(() => ({ backgroundColor: homeTabColor.value }))
    const settingsFlexStyle = useAnimatedStyle(() => ({ flex: settingsTabFlex.value }))
    const settingsColorStyle = useAnimatedStyle(() => ({ backgroundColor: settingsTabColor.value }))

    const flexStyle = useAnimatedStyle(() => ({ flex: tabFlex.value }))
    const colorStyle = useAnimatedStyle(() => ({ backgroundColor: tabColor.value }))

    useEffect(() => {
        if (state.index === 0) {
            homeTabFlex.value = withTiming(4, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.DEFAULT_GREEN, { duration: 500 })
        } else {
            homeTabFlex.value = withTiming(1, { duration: 500 })
            homeTabColor.value = withTiming(COLORS.DEFAUT_WHITE, { duration: 500 })
        }

        if (state.index === 1) {
            settingsTabFlex.value = withTiming(4, { duration: 500 })
            settingsTabColor.value = withTiming(COLORS.DEFAULT_GREEN, { duration: 500 })
        } else {
            settingsTabFlex.value = withTiming(1, { duration: 500 })
            settingsTabColor.value = withTiming(COLORS.DEFAUT_WHITE, { duration: 500 })
        }

        // if (state.index === 2) {
        //     tabFlex.value = withTiming(4, { duration: 500 })
        //     tabColor.value = withTiming(COLORS.DEFAULT_GREEN, { duration: 500 })
        // } else if (state.index === 3) {
        //     tabFlex.value = withTiming(4, { duration: 500 })
        //     tabColor.value = withTiming(COLORS.DEFAULT_GREEN, { duration: 500 })
        // } else if (state.index === 4) {
        //     tabFlex.value = withTiming(4, { duration: 500 })
        //     tabColor.value = withTiming(COLORS.DEFAULT_GREEN, { duration: 500 })
        // }
    }, [state.index])

    return (
        <View style={{
            height: 70,
            flexDirection: 'row',
            justifyContent: "space-around",
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#eee"
        }} >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name
                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true })
                    }
                }
                console.log(state.index, index)
                return (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={onPress}
                        style={[{
                            backgroundColor: 'red',
                            marginHorizontal: 1,
                            flex: index == 0 ? 4 : 1
                        },
                            // flexStyle
                            // homeFlexStyle
                        ]}
                    >
                        <Animated.View
                            style={[
                                {
                                    flex: index == 0 ? 8 : 1,
                                    alignItems: "center",
                                    justifyContent: 'center',
                                },
                                isFocused && flexStyle
                            ]}
                        >
                            <Animated.View
                                style={[
                                    {
                                        flexDirection: 'row',
                                        width: "80%",
                                        height: 50,
                                        alignItems: "center",
                                        justifyContent: 'center',
                                        borderRadius: 25,
                                    },
                                    // isFocused && colorStyle
                                ]}
                            >
                                <Text>ABC</Text>
                                {isFocused && (
                                    <Text
                                        numberOfLines={1}
                                        style={{ color: isFocused ? COLORS.DEFAUT_WHITE : '#222' }} >
                                        {label}
                                    </Text>
                                )}
                            </Animated.View>
                        </Animated.View>

                    </TouchableWithoutFeedback>
                    // <TouchableOpacity
                    //     onPress={onPress}
                    //     style={{
                    //         backgroundColor: index == 0 ? "blue" : "red"
                    //     }} >
                    //     <Text key={index} >ABC</Text>
                    // </TouchableOpacity>
                )
            })}
        </View>
    )
}
const BottomNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
        // screenOptions={({ route }) => ({
        //     tabBarIcon: ({ focused, color, size }) => {
        //         let iconName
        //         switch (route.name) {
        //             case "Home":
        //                 iconName = focused ? "home" : "home-account"
        //                 break
        //             case "Settings":
        //                 iconName = focused ? "account-settings" : "account-settings-outline"
        //                 break

        //             default:
        //                 break
        //         }
        //         return (
        //             <MaterialCommunityIcons name={iconName} color={color} size={size} />
        //         )
        //     },

        //     tabBarActiveTintColor: "red",
        //     tabBarInactiveTintColor: "gray",
        // })}  
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
            <Tab.Screen name="Settings1" component={SettingsScreen1} />
            {/* 
            <Tab.Screen name="Settings2" component={SettingsScreen2} />
            <Tab.Screen name="Settings3" component={SettingsScreen3} /> */}
        </Tab.Navigator>
    )
}

export default BottomNavigator
