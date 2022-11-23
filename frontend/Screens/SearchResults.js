import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, Modal } from 'react-native';
// import recipes from '../../backend/model/recipes';
import SearchResultsHeader from '../components/home/SearchResultsHeader'
// import { PROFILE } from '../dummydata/profile' shouldnt need this right???

export default function SearchResults({ route, navigation }) {
    const background = '../Images/OCMgradient.png'
    const { data } = route.params
    let users;
    let posts;
    let recipes;
    if (data.Users[0] != null)
    {
        users = data.Users[0]
    } else {
        users = "No result!"
    }

    if (data.Posts[0] != null)
    {
        posts = data.Posts[0]
    } else {
        posts.Photo = background;
    }

    if (data.Recipes[0] != null)
    {
        recipes = data.Recipes[0]
    } else {
        recipes = "No result!"
    }

    return (
        <ImageBackground style={styles.background} source={require(background)}>
            <SafeAreaView style={styles.container}>
                <SearchResultsHeader navigation={navigation}></SearchResultsHeader>
                <Text>HERE ARE THE USER RESULTS!</Text>
                <Text>{users.UserName}</Text>
                <Text>HERE ARE THE POST RESULTS!</Text>
                {/* <Text>{posts}</Text> */}
                <Image source={{ uri: posts.Photo }} style={{ height: 136, width: 111, resizeMode: 'cover', margin: 5 }}></Image>
                <Text>HERE ARE THE RECIPES RESULTS!</Text>
                <Text>{recipes}</Text>






            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
    },
});
