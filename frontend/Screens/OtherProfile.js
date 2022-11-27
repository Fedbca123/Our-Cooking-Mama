import * as React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native'

import BottomTabs from '../components/BottomTabs';
import OtherProfileSummary from '../components/profile/OtherProfileSummary';
import OtherUserPosts from '../components/profile/OtherUserPosts';

const OtherProfile = ({ navigation, route }) => {
    const { item } = route.params;
    const [feed, setFeed] = React.useState([]);
    const [profileStats, setProfile] = React.useState([]);
    const background = '../Images/OCMgradient.png';

    React.useEffect(() => {
        async function loadProfile() {
        
            const response = await fetch(global.link + '/api/getOneProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    Query: item._id,
                }),
            }).catch(err => {
                console.log(err);
            })
            const data = await response.json()
            setProfile(data);
        }
        loadProfile();

        async function getFeed(){
            const response = await fetch(global.link + '/api/getPersonalFeed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    UserID: item._id,
                }),
            }).catch(err => {
                console.log(err);
            })
            const data = await response.json()
            setFeed(data);
        }
        getFeed();
        console.log(feed)
    }, [] );

    return(
        <ImageBackground style={styles.background} source={require(background)}>
        <SafeAreaView style={styles.container}>
          <OtherProfileSummary profile={profileStats} navigation={navigation}></OtherProfileSummary>
          <OtherUserPosts profile={feed} navigation={navigation}></OtherUserPosts>
          <BottomTabs navigation={navigation} />
        </SafeAreaView>
      </ImageBackground>
    );
}

export default OtherProfile

const styles = StyleSheet.create({
    container: {
    },
    background: {
      //flex: 1,
    },
  });
