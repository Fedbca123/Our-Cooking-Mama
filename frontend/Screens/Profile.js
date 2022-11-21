import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, Modal } from 'react-native';
import BottomTabs from '../components/BottomTabs';
import Header from '../components/profile/Header';
import ProfileSummary from '../components/profile/ProfileSummary';
import UserPosts from '../components/profile/UserPosts';

import { PROFILE } from '../dummydata/profile'

export default function Profile({ navigation }) {
  const background = '../Images/OCMgradient.png'
  return (
    <ImageBackground style={styles.background} source={require(background)}>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation}></Header>
        <ProfileSummary profile={PROFILE} navigation={navigation}></ProfileSummary>
        <UserPosts profile={PROFILE[0].posts}></UserPosts>
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
