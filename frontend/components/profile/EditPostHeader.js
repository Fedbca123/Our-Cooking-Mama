import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const EditPostHeader = ({ navigation, ID }) => {
    const [modalVisible, setModalVisible] = useState(false);
    let postID = ID.postID
    async function loadProfile() {
        const response = await fetch(global.link + '/api/getPersonalFeed', {
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

    async function deletePost() {
        const response = await fetch(global.link + '/api/deletePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                ProfileID: global._id,
                PostID: postID
            }),
        }).then(response => {
            if (response.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Post Deleted'
                })
                loadProfile()
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Post failed to delete!'
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <View style={styles.contianer}>
            <TouchableOpacity onPress={loadProfile}>
                <Ionicons name="arrow-back" size={40} color="black" />
            </TouchableOpacity>

            <Text style={styles.text}>
                Edit Post
            </Text>

            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.logoContainer}>
                    <Ionicons name="trash-outline" size={40} color="red"></Ionicons>
                </View>
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                {/* <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}> */}
                <View style={styles.popcap}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', paddingBottom: 60 }}>Delete post?</Text>
                    <Text style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={{borderRadius: 10, borderWidth: 5, backgroundColor: 'black', }} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{
                                alignSelf: 'center',
                                padding: 10,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color:'white',
                            }}>Go Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderRadius: 10, borderWidth: 5, backgroundColor: 'black',}} onPress={deletePost}>
                            <Text style={{
                                alignSelf: 'center',
                                padding: 10,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color:'red',
                            }}>Delete</Text>
                        </TouchableOpacity>
                    </Text>

                </View>
                {/* </TouchableOpacity> */}
            </Modal>

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
    },
    popcap: {
        marginTop: '60%',
        borderRadius: 30,
        borderWidth: 5,
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '75%',
        height: '45%',
    },
})

export default EditPostHeader
