import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Header = ({ navigation }) => {

    return (
        <View style={styles.contianer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Ionicons name="arrow-back" size={40} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Entypo name="edit" size={28} color="black"/>
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../Images/OCMlogo2.png')} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    contianer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingTop: 10
    },
    logo: {
        // padding: 30,
        width: 50,
        height: 50,

        resizeMode: 'contain'
    },
    logoContainer: {
        flexDirection: 'row',
    }
})

export default Header
