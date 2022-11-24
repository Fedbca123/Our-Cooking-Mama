import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';

export default function CreatePost({ navigation }) {
  const route = useRoute();
  const image = route.params.img;
  const background = '../Images/OCMgradient.png';

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  async function handleUpload(event) {
    let formdata = new FormData();
    formdata.append("UserID", global._id)
    formdata.append("RecipeID", '63772881990a71a5cf2ff956')
    formdata.append("Category", title)
    formdata.append("Caption", caption)
    formdata.append("Tags", tags)
    formdata.append("file", {uri: image, name: 'image.jpg', type: 'image/jpg'})

		event.preventDefault()
		const response = await fetch('http://' + global.ipv4 + ':3000/api/addPost', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formdata
    }).then(response => {
      console.log("IMAGE UPLOADED!!!")
		}).catch(err => {
			console.log(err);
		})

    // probabyl navigate back 
    // probably need a toast notification or something
    // this takes like 10 seconds to upload so user will need a loading bar or circle or someryhing
    navigation.navigate('Home');
	}

  return (
    <KeyboardAvoidingView style={{flex:1}}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ImageBackground source={require(background)} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Ionicons name={'arrow-back'} size={28} color='#000' onPress={() => navigation.navigate('Camera')} style={styles.backButton} />
            <Text style={styles.newPost}>New Post</Text>
          </View>

          <TextInput style={styles.input} placeholder='Enter a title' onChangeText={(val) => setTitle(val)} />

          <Image source={{ uri: image }} style={styles.img} />

            <TextInput style={styles.input} placeholder='Write a caption' onChangeText={(val) => setCaption(val)}></TextInput>

            <TextInput style={styles.input} placeholder='Enter tags i.e. #vegan #nutallergy' onChangeText={(val) => setTags(val)} />

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={{ alignContent: 'center' }}>Upload</Text>
          </TouchableOpacity>

        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  img: {
    width: (ScreenWidth) - 20,
    height: (ScreenWidth) - 20,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'stretch',
    flex:.75
  },
  uploadButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E39E6D',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 11,
  },
  input: {
    height: 40,
    width: (ScreenWidth) - 20,
    marginTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    width: ScreenWidth,
    position: 'absolute',
    top: 0,
    height: (ScreenHeight) / 10,
    paddingTop: 40,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPost: {
    fontSize: 30,
    alignSelf: 'center',
  },
  inputCapTag: {
    height: 70,
    width: (ScreenWidth) - 20,
    marginTop: 5,
    marginBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    paddingTop: 35,
    paddingLeft: 10
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
