import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, Modal } from 'react-native';
// import recipes from '../../backend/model/recipes';
import SearchResultsHeader from '../components/home/SearchResultsHeader'
// import { PROFILE } from '../dummydata/profile' shouldnt need this right???

export default function SearchResults({ route, navigation }) {
    const background = '../Images/OCMgradient.png'
    const { data } = route.params
    let usersExists = false;
    let postsExists = false;
    let recipesExists = false;

    if (!data.error) {
        if (data.Users.length > 0) {
            usersExists = true
        } else {
            usersExists = false
        }

        if (data.Posts.length > 0) {
            postsExists = true
        } else {
            postsExists = false
        }

        if (data.Recipes.length > 0) {
            recipesExists = true
        } else {
            recipesExists = false
        }
    }
    return (
        <ImageBackground style={styles.background} source={require(background)}>
            <SafeAreaView style={styles.container}>
                <SearchResultsHeader navigation={navigation}></SearchResultsHeader>
                <View style={styles.userPart}>
                    <Text style={{ fontSize: 30, }}>User Results</Text>
                    <UserResult usersExists={usersExists} data={data}></UserResult>
                </View>
                <View style={styles.postPart}>
                    <Text style={{ fontSize: 30, }}>Post Results</Text>
                    <PostResult postsExists={postsExists} data={data}></PostResult>
                </View>
                <View style={styles.recipePart}>
                    <Text style={{ fontSize: 30, }}>Recipe Results</Text>
                    <RecipeResult recipesExists={recipesExists} data={data}></RecipeResult>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const UserResult = ({ usersExists, data }) => {
    let content
    if (usersExists) {
        content = <Text style={{ fontSize: 20 }}>{data.Users[0].UserName}</Text>
    } else {
        content = <Text style={{ fontSize: 20 }}>No users found!</Text>
    }
    return content
}

const PostResult = ({ postsExists, data }) => {
    let content
    if (postsExists) {
        content = <Image source={{ uri: data.Posts[0].Photo }} style={{ height: 200, width: 200, resizeMode: 'cover', margin: 5 }}></Image>
    } else {
        content = <Text style={{ fontSize: 20 }}>No posts found!</Text>
    }
    return content
}

const RecipeResult = ({ recipesExists, data }) => {
    let content
    if (recipesExists) {
        content = <Text style={{ fontSize: 20 }}>{data.Recipes[0].Recipe}</Text>
    } else {
        content = <Text style={{ fontSize: 20 }}>No recipes found!</Text>
    }
    return content
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        flex: 1,
    },
    userPart: {
        marginBottom: 60,
        alignItems: 'center'
    },
    postPart: {
        marginBottom: 60,
        alignItems: 'center'
    },
    recipePart: {
        marginBottom: 60,
        alignItems: 'center'
    }
});
