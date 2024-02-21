import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { ICONS, SIZES } from '../constants'



const AppIcon = ({ type, name, size, color, onPress }) => {
    switch (type) {
        case ICONS.AntDesign:
            return <AntDesign name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Entypo:
            return <Entypo name={name} size={size} color={color} onPress={onPress} />
        case ICONS.EvilIcons:
            return <EvilIcons name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Feather:
            return <Feather name={name} size={size} color={color} onPress={onPress} />
        case ICONS.FontAwesome:
            return <FontAwesome name={name} size={size} color={color} onPress={onPress} />
        case ICONS.FontAwesome5:
            return <FontAwesome5 name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Fontisto:
            return <Fontisto name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Foundation:
            return <Foundation name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Ionicons:
            return <Ionicons name={name} size={size} color={color} onPress={onPress} />
        case ICONS.MaterialCommunityIcons:
            return <MaterialCommunityIcons name={name} size={size} color={color} onPress={onPress} />
        case ICONS.MaterialIcons:
            return <MaterialIcons name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Octicons:
            return <Octicons name={name} size={size} color={color} onPress={onPress} />
        case ICONS.Zocial:
            return <Zocial name={name} size={size} color={color} onPress={onPress} />
        case ICONS.SimpleLineIcons:
            return <SimpleLineIcons name={name} size={size} color={color} onPress={onPress} />
        default:
            return <AntDesign name="questioncircle" size={size} color={color} onPress={() => alert("Icon không xác định")} />
    }

}

export default AppIcon

AppIcon.defaultProps = {
    size: SIZES.base * 2,
}