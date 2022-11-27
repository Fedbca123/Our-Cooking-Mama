import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native'
import { ScreenWidth } from 'react-native-elements/dist/helpers'
import { SafeAreaView } from 'react-navigation'
import { useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons';

const OtherProfileSummary = ({ profile, navigation }) => {
    const chefHat = '../../Images/chefImg.png';
    const [modalVisible, setModalVisible] = useState(false);
    const [nickName, setNickName] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [accountType, setAccountType] = useState('');
    const [favCuisine, setCuisine] = useState('');
    const [favDrink, setDrink] = useState('');
    const [favFood, setFood] = useState('');
    const [favFlavor, setFlavor] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const Divider = () => <View style={styles.divider}/>

    const [follower, setFollower] = useState();
    const [following, setFollowing] = useState();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData();
        });
    
        return unsubscribe;
    }, [navigation]);

    const getCounts = async () => {
		const responseFollowing = await fetch(global.link + '/api/getFollowingCount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				ProfileID: profile._id,
			}),
		}).catch(err => {
			console.log(err);
		})
		const dataFollowing = await responseFollowing.json()
        if(dataFollowing.status != 400){
            setFollowing(dataFollowing.Following);
        }

        const responseFollowers = await fetch(global.link + '/api/getFollowerCount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				ProfileID: profile._id,
			}),
		}).catch(err => {
			console.log(err);
		})
		const dataFollowers = await responseFollowers.json()
        if(dataFollowers.status != 400){
            setFollower(dataFollowers.Followers);
        }
    }

    if(follower == null || following == null){
        getCounts();
    }

    const getData = async () => {
        setProfilePic(profile.ProfilePhoto);
        setAccountType(profile.AccountType);
        setNickName(profile.NickName);
        setPronouns(profile.Pronouns);
        setCuisine(profile.FavCuisine);
        setDrink(profile.FavDrink);
        setFood(profile.FavFood);
        setFlavor(profile.FavoriteFlavor);
        getCounts();
    }

    const handleModal = () => {
        getData();
        setModalVisible(true);
    }

    const handleFollow = async () => {
        const response = await fetch(global.link + '/api/follow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				FollowerProfileID: profile._id,
				FollowingProfileID: global._id
			}),
		}).catch(err => {
			console.log(err);
		})
		const data = await response.json()
    }

    return (
        <SafeAreaView style={{}}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={40} color="black" />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image style={styles.logo2} source={require('../../Images/OCMlogo2.png')} />
                </View>
            </View>

            <View style={styles.info}>
                {(profilePic == '')? 
                <Image style={styles.logo} source={require(chefHat)} />
                :
                <Image style={styles.logo} source={profile.ProfilePhoto ? {uri : profile.ProfilePhoto} : null} />
                }
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 30, fontWeight: '700', paddingLeft: 10 }}>
                        <Text>{profile.NickName} </Text>
                        <Text style={{fontSize: 18, fontWeight: '400',paddingLeft: 10 }}>{profile.Pronouns}</Text>
                    </Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20 }}>
                        <Text style={{ color: '#75b9be' }}>Following</Text>
                        <Text style={{ color: '#75b9be' }}>Followers</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15 }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{following}</Text>
                        <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 50 }}>{follower}</Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity onPress={handleModal}>
                            <Text style={styles.aboutMe}>About Me</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleFollow}>
                            <Text style={styles.aboutMe}>Follow</Text>
                        </TouchableOpacity>
                    </View>

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
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ position: 'absolute', right: 0, paddingRight: 5, paddingTop: 5 }}>
                                <Entypo name="cross" size={30} color="#E39E6D" />
                            </TouchableOpacity>
                            <View>
                                <Text>NickName: {nickName}</Text>
                                <Text>Pronouns: {pronouns}</Text>
                                <Text>AccountType: {accountType} </Text>
                                
                                <View style={styles.widget}>
                                <Text>Favorite cuisine:</Text>
                                    <FlatList
                                        data={favCuisine}
                                        renderItem={({item}) => <Text>{item} </Text>}
                                        horizontal= {true}
                                    />
                                </View>
                                
                                <View style={styles.widget}>
                                    <Text>Favorite drink:</Text>
                                    <FlatList
                                        data={favDrink}
                                        renderItem={({item}) => <Text>{item} </Text>}
                                        horizontal= {true}
                                    />
                                </View>
                                
                                <View style={styles.widget}>
                                <Text>Favorite food:</Text>
                                    <FlatList
                                        data={favFood}
                                        renderItem={({item}) => <Text>{item} </Text>}
                                        horizontal= {true}
                                    />
                                </View>
                                <View style={styles.widget}>
                                <Text>Favorite flavor:</Text>
                                    <FlatList
                                        data={favFlavor}
                                        renderItem={({item}) => <Text>{item} </Text>}
                                        horizontal= {true}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>



            <Divider/>

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
        width: ScreenWidth,
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
        marginLeft: 0,
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
        borderColor: '#E39E6D',
        borderWidth: 2,
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
    divider: {
        marginVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    widget: {
        height: 50, 
        borderWidth:1, 
        padding: 5, 
        borderColor: '#E39E6D', 
        borderRadius: 10, 
        marginVertical: 5
    },
    logoContainer: {
        flexDirection: 'row',
    },
    logo2: {
        // padding: 30,
        width: 50,
        height: 50,

        resizeMode: 'contain'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 10,
        paddingTop: 10,
    }
})

export default OtherProfileSummary;
