import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const Header = () => {

    const [searchQuery, setQuery] = React.useState("");

    return (
        <View style={styles.contianer}>
            <TouchableOpacity>
                <Image style={styles.logo} source={require('../../Images/OCMlogo2.png')} />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchBar}
                    onChangeText={setQuery}
                    value={searchQuery}
                    placeholder="Search"
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contianer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 30,
    },
    logo: {
        // padding: 30,
        width: 50,
        height: 50,
        
        resizeMode: 'contain'
    },
    searchContainer: {
        flexDirection: 'row'
    },
    searchBar: {
        borderWidth: 1,
        borderRadius: 20,
        // backgroundColor: 'black',
        height: 40,
        width: 200,
        padding: 10,
    }
})

export default Header