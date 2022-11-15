import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const Header = ({ navigation }) => {

    const [searchQuery, setQuery] = React.useState("");

    return (
        <View style={styles.contianer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{ fontSize: 25 }}>⬅️</Text>
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