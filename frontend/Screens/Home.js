import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import FoodReal from '../components/home/FoodReal';
import Header from '../components/home/Header';

export default function Home() {

  const [posts, setPost] = useState([
    { name: "cristian's post", key: '1' },
    { name: "chrystian's post", key: '2' },
    { name: "geela's post", key: '3' },
    { name: "rachel's post", key: '4' },
    { name: "omar's post", key: '5' },
    { name: "marc's post", key: '6' },
    { name: "illiya's post", key: '7' },
    { name: "taniya's post", key: '8' },
  ])


  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>
      <FoodReal></FoodReal>
      {/* <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Text style={styles.post}>{item.name}</Text>
        )}
      /> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
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
  }
});
