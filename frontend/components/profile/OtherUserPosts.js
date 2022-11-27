import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { FlatList } from 'react-native-gesture-handler'

const OtherUserPosts = ({ profile }) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={profile}
                style={{}}
                numColumns={3}
                renderItem={({ item }) => (
                    <View>
                        <Image source={{ uri: item.Photo }} style={{ height: 136, width: 111, resizeMode: 'cover', margin: 5 }}></Image>
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
        // height: 467,
        height: '63.5%',
        //borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: (ScreenWidth),
        // marginLeft: 10,
        // marginRight: 10
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default OtherUserPosts