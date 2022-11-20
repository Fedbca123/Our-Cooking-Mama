import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons';

const UserPosts = ({ profile }) => {
    const [deletePost, setDeletePost] = useState(false);

    const handleModal = () => {
        setDeletePost(!deletePost);
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
                        <TouchableOpacity onLongPress={handleModal}>
                            <Image source={{ uri: item.image }} style={{ height: 136, width: 111, resizeMode: 'cover', margin: 5 }}></Image>
                        </TouchableOpacity>
                    {/* <Text>{item.key}</Text> */}
                    </View>

                )}
            >
            </FlatList>

            <Modal
            animationType="slide" 
            visible={deletePost} 
            transparent={true}
            onRequestClose={() => {
                setDeletePost(!deletePost);
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setDeletePost(!deletePost)} style={{position: 'absolute', right: 0, paddingRight: 5, paddingTop: 5}}>
                            <Entypo name="cross" size={30} color="black"/>
                        </TouchableOpacity>
                        <View>
                            <Text>Do you want to delete this post?</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10}}>
                                <TouchableOpacity onPress={handleDelete}>
                                    <Text style={{color: 'steelblue'}}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleModal}>
                                    <Text style={{color: 'steelblue'}}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

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
