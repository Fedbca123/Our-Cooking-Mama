import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const EditPostHeader = ({ navigation }) => {

    return (
        <View style={styles.contianer}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="arrow-back" size={40} color="black" />
            </TouchableOpacity>

            <Text style={styles.text}>
                Edit Post
            </Text>

            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../Images/OCMlogo2.png')} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    contianer: {
        width: '93%',
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
    },
    text: {
        fontSize: 30,
        fontWeight: '800'
    }
})

export default EditPostHeader
