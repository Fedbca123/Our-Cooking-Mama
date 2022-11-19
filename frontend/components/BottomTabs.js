import React, { useState } from 'react'
import { View, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const homeIcon = '../Images/homeIcon.png';
const profileIcon = '../Images/profileIcon.png';
const cameraIcon = '../Images/cameraIcon.jpg';

export const bottomTabIcons = [
    {
        name: 'Home',
        img: homeIcon
    },
    {
        name: 'Camera',
        img: cameraIcon
    },
    {
        name: 'Profile',
        img: profileIcon
    }
]


const BottomTabs = ({ navigation }) => {
    const [activeTab, setActivetab] = useState('Home')

    // const Icon = ({icon, navigation}) => {
    //     <TouchableOpacity>
    //         <Image source={icon.img} style={styles.icon}></Image>
    //     </TouchableOpacity>
    // }

    return (
        <View style={styles.container}>
            {/* <Divider width={20} orientation='horizontal'/> */}
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                <Entypo name="camera" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Entypo name="home" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={33} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10,
        paddingRight: 5,
        borderTopWidth: 1,
    },
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '3%',
        zIndex: 999,
        backgroundColor: '#000'
    }
})

export default BottomTabs;

// 2:03:29