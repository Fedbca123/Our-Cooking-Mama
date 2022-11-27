import * as React from 'react';
import {useState, useEffect} from "react";
import { StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import BottomTabs from '../components/BottomTabs';
import Header from '../components/profile/Header';
import ProfileSummary from '../components/profile/ProfileSummary';
import UserPosts from '../components/profile/UserPosts';

export default function Profile({ navigation, route }) {
  const background = '../Images/OCMgradient.png'
  const { data } = route.params
  const [profileStats, setProfile] = useState([]);
  const [profileId, setProfileId] = useState('');

  useEffect(() => {
    async function loadProfile() {
    
        const response = await fetch('http://' + global.ipv4 + ':3000/api/getOneProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                Query: global._id,
            }),
        }).catch(err => {
            console.log(err);
        })
        const data = await response.json()
        setProfile(data);
    }
    loadProfile();
    if(data[0] != null){
      setProfileId(data[0].ProfileID);
    }
}, [] );


  return (
    <ImageBackground style={styles.background} source={require(background)}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} data={data}></Header>
        <ProfileSummary profile={profileStats} navigation={navigation} profileId={profileId}></ProfileSummary>
        <UserPosts profile={data} navigation={navigation}></UserPosts>
        <BottomTabs navigation={navigation} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  background: {
    flex: 1,
  },
});
