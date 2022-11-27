import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ImageBackground, Button, Modal, Pressable, Keyboard } from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScreenHeight, ScreenWidth } from 'react-native-elements/dist/helpers';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function CreatePost({ navigation }) {
  const route = useRoute();
  const image = route.params.img;
  const background = '../Images/OCMgradient.png';

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [whoMade, setWhoMade] = useState("");
  const [whatFood, setWhatFood] = useState("");
  const [whatDescription, setWhatDescription] = useState("");
  const [newRecipeID, setRecipeID] = useState("")

  const handleModal = () => setModalVisible(() => !modalVisible);

  function setRecID(data) {
    setRecipeID(data._id)
  }

  async function createRecipe() {
		const response = await fetch(global.link + '/api/addRecipe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
        Name: whatFood,
        ChefID: whoMade,
				Ingredients: whatDescription,
			}),
		}).catch(err => {
			console.log(err);
		})
		const data = await response.json()
    console.log("The recipe is " + data._id)
    setRecID(data)
    // setRecipeID = data._id
		handleModal
	}

  async function handleUpload(event) {
    console.log("okay well hanldeUpload sees this as recipe " + newRecipeID)
    let formdata = new FormData();
    formdata.append("UserID", global._id)
    formdata.append("RecipeID", newRecipeID)
    formdata.append("Category", title)
    formdata.append("Caption", caption)
    formdata.append("Tags", tags)
    formdata.append("file", { uri: image, name: 'image.jpg', type: 'image/jpg' })

    event.preventDefault()
    const response = await fetch(global.link + '/api/addPost', {
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
    loadFeed()
  }

  async function loadFeed() {
    const response = await fetch(global.link + '/api/getMainFeed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            ProfileID: global._id,
        }),
    }).catch(err => {
        console.log(err);
    })
    const data = await response.json()
    navigation.navigate('Home', { data: data });
}


  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ImageBackground source={require(background)} style={styles.background}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Ionicons name={'arrow-back'} size={28} color='#000' onPress={() => navigation.navigate('Camera')} style={styles.backButton} />
            <Text style={styles.newPost}>Share your food!</Text>
          </View>

          <Pressable style={styles.button} onPress={handleModal}>
            <Text style={{ color: 'white', fontSize: 24 }}>Add details</Text>
          </Pressable>
          <Image source={{ uri: image }} style={styles.img} />
          <TextInput style={styles.input} placeholder='Enter a title' onChangeText={(val) => setTitle(val)} />


          <TextInput style={styles.input} placeholder='Write a caption' onChangeText={(val) => setCaption(val)}></TextInput>

          <TextInput style={styles.input} placeholder='Enter tags i.e. #vegan #nutallergy' onChangeText={(val) => setTags(val)} />

          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={{ alignContent: 'center' }}>Upload</Text>
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
              {/* <TouchableOpacity onPress={() => setModalVisible(true)}> */}
              <View style={styles.popcap}>

                <View style={{ alignItems: 'center' }}>
                  <Text style={{ marginTop: 15 }}>
                    <Pressable style={{
                      borderWidth: 2,
                      borderRadius: 20,
                      borderColor: 'white',
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      backgroundColor: '#133C55',
                    }} onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={{ color: 'white', fontSize: 24 }}>Close</Text>
                    </Pressable>
                  </Text>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 10, alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue',
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    left: 10,
                    fontWeight: 'bold'
                  }}>What is this?</Text>
                  <TextInput
                    style={{
                      borderWidth: 3,
                      borderRadius: 20,
                      width: 250,
                      height: 50,
                      paddingLeft: 15,
                      fontSize: 15,
                    }}
                    placeholder="Beef Wellington, Steak & Frites"
                    onChangeText={(val) => setWhatFood(val)}
                    autoFocus={true}></TextInput>
                </View>

                <View style={{ marginTop: 20, marginHorizontal: 10, alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue',
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    left: 10,
                    fontWeight: 'bold'
                  }}>Who made this?</Text>
                  <TextInput
                    style={{
                      borderWidth: 3,
                      borderRadius: 20,
                      width: 250,
                      height: 50,
                      paddingLeft: 15,
                      fontSize: 15,
                    }}
                    placeholder="Myself, Mei's Bakery, etc."
                    onChangeText={(val) => setWhoMade(val)}></TextInput>
                </View>
                
                <View style={{ marginTop: 20, marginHorizontal: 10, alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 15,
                    color: 'blue',
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    left: 10,
                    fontWeight: 'bold'
                  }}>Describe your meal</Text>
                  <TextInput
                    style={{
                      borderWidth: 3,
                      borderRadius: 20,
                      width: 250,
                      height: 250,
                      paddingLeft: 15,
                      fontSize: 15,
                      marginBottom: 10
                    }}
                    placeholder="Provide a recipe, or perhaps a review of your meal"
                    onChangeText={(val) => setWhatDescription(val)}
                    multiline={true}
                  ></TextInput>
                </View>

                <View>
                  <Pressable style={{
                    borderWidth: 2,
                    borderRadius: 20,
                    borderColor: 'white',
                    paddingVertical: 15,
                    paddingHorizontal: 20,
                    backgroundColor: '#133C55',
                  }} onPress={() => {createRecipe(); handleModal();}}>
                    <Text style={{ color: 'white', fontSize: 24, alignSelf: 'center' }}>Add recipe</Text>
                  </Pressable>
                </View>
              </View>
              {/* </TouchableOpacity> */}
            </Modal>
          </View>


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
    height: 200,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'stretch',
    flex: .75
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
  inputModal: {
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
  popcap: {
    marginTop: '25%',
    borderRadius: 30,
    borderWidth: 5,
    backgroundColor: 'pink',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    height: '75%',
  },
  button: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: '30%',
    backgroundColor: '#133C55',
  },
});
