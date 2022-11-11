import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Divider } from 'react-native-elements'

const Post = ({ post }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <Divider width={10} orientation='vertical' color='black' />
            <PostHeader post={post} />
            <PostImage post={post}></PostImage>
            <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                <PostFooter></PostFooter>
                <Likes post={post}></Likes>
                <Caption post={post}></Caption>

            </View>
        </View>
    )
}

const PostHeader = ({ post }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: post.profile_picture }} style={styles.pfp} />
            <Text style={{ marginLeft: 5, fontWeight: '700' }}> {post.user}</Text>
        </View>
        <View>
            <Text style={{ fontWeight: '900' }}>...</Text>
        </View>
    </View>
)

const PostImage = ({ post }) => (
    <View style={{ width: '100%', height: 450, }}>
        <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode: 'cover' }}></Image>
    </View>
)

const PostFooter = () => (
    <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftFooterIconsContianer}>
            <Icon imgStyle={styles.footerIcon} imgUrl={'https://cdn-icons-png.flaticon.com/512/126/126473.png'}></Icon>
            <Icon imgStyle={styles.footerIcon} imgUrl={'https://www.pngfind.com/pngs/m/247-2474217_png-file-svg-comment-icon-transparent-png.png'}></Icon>
            <Icon imgStyle={styles.footerIcon} imgUrl={'https://toppng.com/uploads/preview/share-png-file-share-icon-free-download-1156313309811bbndeiii.png'}></Icon>
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
        <Text style={{ fontWeight: '600' }}>{post.likes.toLocaleString('en')} likes</Text>
    </View>
)

const Caption = ({ post }) => (
    <View style={{marginTop: 5}}>
        <Text>
            <Text style={{ fontWeight: '600',}}>{post.user} </Text>
            <Text>{post.caption}</Text>
        </Text>
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
        width: '32%',
        justifyContent: 'space-between',
    }

})

export default Post