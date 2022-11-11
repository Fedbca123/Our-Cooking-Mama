import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import FoodReal from '../components/home/FoodReal';
import Header from '../components/home/Header';
import Post from '../components/home/Post';

import { POSTS } from '../dummydata/posts'

export default function Home() {
  const background = '../Images/OCMgradient.png'



  // const [posts, setPost] = useState([
  //   { name: "cristian's post", key: '1' },
  //   { name: "chrystian's post", key: '2' },
  //   { name: "geela's post", key: '3' },
  //   { name: "rachel's post", key: '4' },
  //   { name: "omar's post", key: '5' },
  //   { name: "marc's post", key: '6' },
  //   { name: "illiya's post", key: '7' },
  //   { name: "taniya's post", key: '8' },
  // ])


  return (
    // <ImageBackground style={styles.background} source={require(background)}>
      <SafeAreaView style={styles.container}>
        <Header></Header>
        <FoodReal></FoodReal>
        <ScrollView>
          {POSTS.map((post,index) => (
            <Post post={post} key={index}></Post>
          ))}
        </ScrollView>
        {/* <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Text style={styles.post}>{item.name}</Text>
        )}
      /> */}

      </SafeAreaView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: null,
  },
  post: {
    marginTop: 24,
    padding: 50,
    backgroundColor: 'pink',
    fontSize: 30,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
});
