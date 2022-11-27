import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Touchable, Share } from 'react-native'
import { Divider } from 'react-native-elements'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const Post = ({ post }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [profileStats, setProfile] = useState([]);

    useEffect(() => {
        console.log(post.ProfileID)
        async function loadProfile() {

            const response = await fetch('http://' + global.ipv4 + ':3000/api/getOneProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    Query: post.ProfileID,
                }),
            }).catch(err => {
                console.log(err);
            })
            const data = await response.json()
            setProfile(data);
        }
        loadProfile();
    }, []);
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={1} orientation='vertical' color='black' />
            <PostHeader post={profileStats} />
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <PostImage post={post}></PostImage>
            </TouchableOpacity>
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
            </View>
            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                <PostFooter></PostFooter>
                <Likes post={post}></Likes>
                <Caption post={post}></Caption>
            </View>
        </View>
    )
}


const share = async () => {
    try {
        const result = await Share.share({
            message: 'Share this post with the foodie world!',
            url: './breakfast.jpg',
            title: 'Share this post with the foodie world!'
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
}

const PostHeader = ({ post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: post.ProfilePhoto }} style={styles.pfp} />
            <Text style={{ marginLeft: 5, fontWeight: '700' }}> {post.NickName}</Text>
        </View>
        <View>
            <Text style={{ fontWeight: '900' }}>...</Text>
        </View>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450, }}>
        <Image source={{ uri: post.Photo }} style={{ height: '100%', resizeMode: 'cover' }}></Image>
    </View>
)

const PostFooter = () => (
    <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftFooterIconsContianer}>
            <FontAwesome name="thumbs-o-up" size={33} color="black" />
            <TouchableOpacity onPress={share}>
                <FontAwesome5 name="share" size={33} color="black" />
            </TouchableOpacity>

        </View>
    </View>
)

const Icon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{ uri: imgUrl }}></Image>
    </TouchableOpacity>
)

const Likes = ({ post }) => (
    <View style={{ flexDirection: 'row', marginTop: 4 }}>
        <Text style={{ fontWeight: '600' }}>hardcoded # likes</Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={{ marginTop: 5 }}>
        <Text>
            <Text style={{ fontWeight: '600' }}>{post.NickName}</Text>
            <Text>{post.Caption}</Text>
            {/* BELOW HAS INVISIBLE CHARACTERS THIS IS AWFUL BUT I DONT KNOW HOW TO STRETCH THE CAPTION TO WIDTH OF SCREEN! OR ELSE IT WILL SHNRINK EVERYTHING */}
            <Text>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</Text>
        </Text>
    </View>
)

const Popup = ({ post }) => (
    <View>
        <View style={{ alignItems: 'center' }}>
            <Text style={{ marginTop: 15 }}>
                <Text style={{ fontWeight: '900', color: 'blue', }}>Tags: </Text>
                <Text style={{ fontWeight: '900', color: 'blue', }}>{post.Tags} </Text>
            </Text>
            <Image source={{ uri: post.Photo }} style={{ height: '50%', resizeMode: 'stretch', width: 300, height: 250 }}></Image>
        </View>

        <View style={{ marginTop: 20, marginHorizontal: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>{post.Category}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    pfp: {
        width: 35,
        height: 35,
        // marginLeft: 0,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: 'black',
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIconsContianer: {
        flexDirection: 'row',
        width: '23%',
        justifyContent: 'space-between',
    },
    popcap: {
        marginTop: '25%',
        borderRadius: 30,
        borderWidth: 5,
        backgroundColor: 'pink',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'center',
        width: '85%',
        height: '85%',
    },
})

export default Post