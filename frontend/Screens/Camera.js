import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useRef, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';


import Button from '../components/Button.js';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType.js';



export default function Settings({navigation}) {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status == 'granted')
        })();
    }, [])

    const takePicture = async () => {
        if(cameraRef){
            try{
                const data = await cameraRef.current.takePictureAsync();
                //console.log(data.uri);
                setImage(data.uri);
            }catch(e){
                console.log(e);
            }
        }
    }

    const saveImage = async  () => {
        if(image){
            try{
                await MediaLibrary.createAssetAsync(image);
                alert('Saved to camera roll')
                setImage(null);
            }catch(e){
                console.log(e);
            }
        }

        navigation.navigate('CreatePost', {img: image});

    }

    if(hasCameraPermission == false){
        return <Text>No acess to camera</Text> 
    }

    const openGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
      
        if (!result.canceled) { // For some reason the image wont update here but if I jsut send the uri itll work
            //console.log("Before set: " + result.assets[0].uri);
            setImage(result.assets[0].uri);
            //console.log("After set: " + image);
        }
        

        navigation.navigate('CreatePost', {img: result.assets[0].uri});
    }



  return (
        <View style={styles.container}>
            {!image ?
            <Camera 
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
            >

                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingTop: 40}}>
                    <Button icon='arrow-long-left' onPress={() => navigation.goBack()}/>
                    <Button icon={"retweet"} onPress={() => {
                        setType(type == CameraType.back ? CameraType.front : CameraType.back)
                    }}/>
                    <Button
                        onPress={() => setFlash(flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                        )}
                        icon="flash"
                        color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
                    />
                </View>

            </Camera>
            :
            <Image source={{uri: image}} style={styles.camera}/>
            }
            <View style={styles.camButton}>
                {image ? 
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button title={"Re-take"} icon="retweet" onPress={() => setImage(null)}/>
                    <Button title={"Save and use"} icon="check" onPress={saveImage}/>
                </View>
                :
                <View style={{flexDirection: 'row', justifyContent:'space-evenly'}}>
                    <Button icon="camera" onPress={takePicture} />
                    <View style={{position: 'absolute', right: 0, paddingRight: 20}}>
                        <Button icon ="archive" onPress={openGallery} />
                    </View>
                </View>
                }
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  camButton: {
    backgroundColor: '#000', 
    paddingBottom: 30, 
    paddingTop: 10,
  },
});
