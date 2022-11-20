import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';

export default function CreatePost({ navigation }) {
  const route = useRoute();
  const image = route.params.img;
  const background = '../Images/OCMgradient.png';

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const handleUpload = () => {
    console.log("POSTING..")
    const tagsArr = tags.split(' ');
    console.log("\nTitle: " + title + "\nCaption: " + caption + "\nTags: " + tagsArr);
  }

  return (
    <ImageBackground source={require(background)} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Entypo name={'arrow-long-left'} size={28} color='#000' onPress={() => navigation.navigate('Camera')} style={styles.backButton} />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  img: {
    width: (ScreenWidth) - 20,
    height: (ScreenWidth) - 20,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'stretch'
  },
  uploadButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f406ff',
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
    paddingTop: 20,
    alignContent: 'center',
    justifyContent: 'center',
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
