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
    async function loadProfile() {

        const response = await fetch('http://' + global.ipv4 + ':3000/api/getPersonalFeed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                UserID: global._id,
            }),
        }).catch(err => {
            console.log(err);
        })
        const data = await response.json()
        navigation.navigate('Profile', { data: data });
    }

    async function loadFeed() {
        console.log("Loading feed... global id is: " + global._id)
        const response = await fetch('http://' + global.ipv4 + ':3000/api/getMainFeed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                ProfileID: global._id,
            }),
        }).catch(err => {
            console.log(err);
        })
        const data = await response.json()
        navigation.navigate('Home', { data: data });
    }
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                <Entypo name="camera" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={loadFeed}>
                <Entypo name="home" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SearchResults')}>
                <Entypo name="magnifying-glass" size={33} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={loadProfile}>
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
