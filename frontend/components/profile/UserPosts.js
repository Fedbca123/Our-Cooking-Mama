import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

const UserPosts = ({ profile }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={profile}
                style={{}}
                numColumns={3}
                renderItem={({ item }) => (
                    <View>
                    <Image source={{ uri: item.image }} style={{ height: 150, width: 125, resizeMode: 'cover', margin: 5 }}></Image>
                    {/* <Text>{item.key}</Text> */}
                    </View>

                )}
            >

            </FlatList>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // alignSelf: 'stretch',
        height: 350,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'purple',
        marginBottom: 20
    },
    storyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
    },
})

export default UserPosts