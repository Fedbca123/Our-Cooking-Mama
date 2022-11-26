import * as React from 'react';
import { TextInput } from 'react-native';
import { Text, View, StyleSheet, Image, SafeAreaView, ImageBackground, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import EditPostHeader from '../components/profile/EditPostHeader'
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';

export default function EditPost({ route, navigation }) {
    const background = '../Images/OCMgradient.png'
    const { item } = route.params
    const [title, setTitle] = React.useState('');
    const [caption, setCaption] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [postImage, setPostImage] = React.useState('')
    let postID = item._id
    let recID = item.RecipeID


    //Opens gallery and updates postImage
    const changePostImage = async () => {
        console.log(postImage)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPostImage(result.assets[0].uri);
        }

    }


    // Grabs post image and stores in postImage
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setPostImage(item.Photo);
        });
        setTitle(item.Category)
        setCaption(item.Caption)
        setTags(item.Tags)
        return unsubscribe;
    }, [navigation]);


    async function saveChanges(event) {
        let formdata = new FormData();
        formdata.append("ProfileID", global._id)
        formdata.append("RecipeID", recID)
        formdata.append("PostID", postID)
        formdata.append("Caption", caption)
        formdata.append("Tags", tags)
        formdata.append("Category", title)
        formdata.append("file", { uri: postImage, name: 'image.jpg', type: 'image/jpg' })

        event.preventDefault()
        const response = await fetch('http://' + global.ipv4 + ':3000/api/editPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then(response => {
            if (response.status == 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Changes saved'
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to save changes'
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <ImageBackground style={{ flex: 1 }} source={require(background)}>
                <SafeAreaView style={styles.container}>
                    <EditPostHeader navigation={navigation} post={{ item }} ></EditPostHeader>

                    {postImage ?
                        <Image source={{ uri: postImage }} style={{ height: 300, width: 300, resizeMode: 'cover', margin: 5, flex: 4 }}></Image>
                        :
                        <Text></Text>
                    }

                    <TouchableOpacity onPress={changePostImage} style={{}}>
                        <Text style={{ color: 'steelblue' }}>Change post image</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginVertical: 5, flex: 1, alignItems: 'center' }}>
                        {/* <Text>Title: </Text> */}
                        <TextInput style={styles.input} onChangeText={(val) => setTitle(val)} >{item.Category}</TextInput>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 5, flex: 1, alignItems: 'center' }}>
                        {/* <Text>Caption: </Text> */}
                        <TextInput style={styles.input} onChangeText={(val) => setCaption(val)}>{item.Caption}</TextInput>
                    </View>

                    <View style={{ flexDirection: 'row', marginVertical: 5, flex: 1, alignItems: 'center' }}>
                        {/* <Text>Tags: </Text> */}
                        <TextInput style={styles.input} onChangeText={(val) => setTags(val)}>{item.Tags}</TextInput>
                    </View>

                    <TouchableOpacity onPress={saveChanges}>
                        <Text style={styles.saveButton}>Save Changes</Text>
                    </TouchableOpacity>

                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        borderWidth: 2,
        width: '70%',
        height: '70%',
        paddingLeft: 2,
        borderRadius: 8
    },
    saveButton: {
        backgroundColor: '#E39E6D',
        borderRadius: 18,
        padding: 10,
        overflow: 'hidden',
    }
});
