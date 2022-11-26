import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons';

const UserPosts = ({ profile, navigation }) => {
    const [deletePost, setDeletePost] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    const editPost = (specificPost) => () => {
        navigation.navigate('EditPost', { item: specificPost })
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        handleModal();
        console.log("Deleting..");
    }
    

    return (
        <View style={styles.container}>
            <FlatList
                data={profile}
                style={{}}
                numColumns={3}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={editPost(item)}>
                            <Image source={{ uri: item.Photo }} style={{ height: 136, width: 111, resizeMode: 'cover', margin: 5 }}></Image>
                        </TouchableOpacity>
                    </View>

                )}
            >
            </FlatList>
            {/* 
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                        <View style={styles.popcap}>
                            <Popup post={post}></Popup>
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View> */}


        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        // alignSelf: 'stretch',
        height: 390,
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

export default UserPosts
