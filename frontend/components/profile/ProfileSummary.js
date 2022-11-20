import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { SafeAreaView } from 'react-navigation'
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons';

const ProfileSummary = ({ profile }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleModal = () => {
        setModalVisible(true);
    }

    return (
        <SafeAreaView>
            <View style={styles.info}>
                <Image style={styles.logo} source={{ uri: profile[0].profile_picture }} />
                
                <View style={{flexDirection: 'column'}}>
                    <Text style={{ fontSize: 30, fontWeight: '700', paddingLeft: 50}}>{global.signedUser}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 47}}>
                        <Text style={{color: '#75b9be'}}>Foodies</Text>
                        <Text style={{color: '#75b9be'}}>Fooders</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 47}}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{profile[0].following}</Text>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{profile[0].followers}</Text>
                    </View>
                    
                    <TouchableOpacity onPress={handleModal}>
                        <Text style={styles.aboutMe}>About Me</Text>
                    </TouchableOpacity>

                </View>

                <Modal 
                    animationType="slide" 
                    visible={modalVisible} 
                    transparent={true}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{position: 'absolute', right: 0, paddingRight: 5, paddingTop: 5}}>
                                <Entypo name="cross" size={30} color="black"/>
                            </TouchableOpacity>
                            <View>
                                <Text>NickName: {}</Text>
                                <Text>Pronouns: </Text>
                                <Text>AccountType: </Text>
                                <Text>Favorite cuisine: </Text>
                                <Text>Favorite drink: </Text>
                                <Text>Favorite food: </Text>
                                <Text>Favorite flavor: </Text>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>

            <View style={styles.bio}>
                <Text>{profile[0].bio}</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#75b9be',
        marginBottom: 20
    },
    storyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
    },
    info: {
        flexDirection: 'row',
        paddingLeft: 20,
        width: ScreenWidth
    },
    bio: {
        paddingVertical: 5, 
        paddingHorizontal: 5, 
        borderWidth: 2, 
        marginHorizontal: 10, 
        marginBottom: 5,
        borderColor: "#75b9be"
    },
    aboutMe: {
        alignSelf: 'center',
        marginLeft: 45,
        borderWidth: 2,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: '#75b9be'
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

export default ProfileSummary;