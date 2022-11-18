import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const Header = ({ navigation }) => {

    const [searchQuery, setQuery] = React.useState("");

    const handleEdit = () => {

    }

    return (
        <View style={styles.contianer}>
            
            <Entypo name={'arrow-long-left'} size={28} color= '#000' onPress={() => navigation.goBack()}></Entypo>
            
            <Entypo name={'edit'} size={28} color='#000' onPress={() => handleEdit}></Entypo>
            
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
