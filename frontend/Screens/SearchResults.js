import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
// import recipes from '../../backend/model/recipes';
import Toast from 'react-native-toast-message';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export default function SearchResults({ route, navigation }) {
    const background = '../Images/OCMgradient.png'
    const chefIcon = '../Images/chefImg.png'
    const [query, setQuery] = React.useState('')
    const [U, setU] = React.useState(false)
    const [P, setP] = React.useState(false)
    const [R, setR] = React.useState(false)
    const [users, setUsers] = React.useState([])
    const [posts, setPosts] = React.useState([])
    const [recipes, setRecipes] = React.useState([])


    const handleSearch = async (event) => {
        event.preventDefault()
        console.log("Searching...");
        const response = await fetch('http://' + global.ipv4 + ':3000/api/universalSearch', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({
				Query: query,
			}),
		}).catch(err => {
			console.log(err);
		})

        const data = await response.json()

        if(data.error == "No results found."){
            Toast.show({
                text1: "No results found."
            })
        }else{
            console.log("Results found")
        }

        if (!data.error) {
            if (data.Users.length > 0) {
                setU(true);
                setUsers(data.Users);
            } else {
                setU(false);
            }
            
            if (data.Posts.length > 0) {
                setP(true);
                setPosts(data.Posts);
            } else {
                setP(false);
            }
            
            if (data.Recipes.length > 0) {
                setR(true);
                setRecipes(data.Recipes);
            } else {
                setR(false);
            }
        }
        console.log(data)
    }

    const UserResults = () => {
        let content
        if(U){
            content = <View>
                <FlatList 
                    data={users}
                    renderItem={({item}) => (
                        <TouchableOpacity>
                            <View style={styles.userWrapper}>
                                <Image source={require(chefIcon)} style={styles.icon}></Image>
                                <Text style={styles.user}>{item.UserName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        }else {
            content = <Text></Text>
        }
        return content
    }

    const PostResults = () => {
        let content
        if(P){
            content = <View>
                <FlatList 
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.postWrapper}>
                            <Image source={{uri : item.Photo}}></Image>
                            <Text>{item.Category}</Text>
                        </View>
                    )}
                />
            </View>
        }else {
            content = <Text></Text>
        }
        return content
    }

    const RecipeResults = () => {
        let content
        if(R){
            content = <View>
                <FlatList 
                    data={recipes}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item}</Text>
                        </View>
                    )}
                />
            </View>
        }else {
            content = <Text></Text>
        }
        return content
    }

    return (
        <ImageBackground style={styles.background} source={require(background)}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back" size={32} style={{position:'absolute', left:0, paddingLeft: 10}} onPress={() => navigation.goBack()}/>
                    <View style={styles.search}>
                        <Ionicons name='search' size={25} style={{position:'absolute', left:0, marginLeft: 5}}/>
                        <TextInput 
                            style={styles.searchBar} 
                            placeholder='Search...' 
                            onChangeText={(val) => setQuery(val)} 
                            onSubmitEditing={handleSearch}
                            returnKeyType="search"
                        ></TextInput>
                    </View>
                </View>
                

                    <View>
                        <Text style={styles.box} >User results</Text>
                        <UserResults />
                    </View>

                    <View>
                        <Text style={styles.box}>Post results</Text>
                        <PostResults/>
                    </View>

                    <View>
                        <Text style={styles.box}>Recipe results</Text>
                        <RecipeResults/>
                    </View>

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
    header: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
    },
    search: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 30,
        width: 225
    },
    searchBar: {
        backgroundColor: '#fff',
        width: '70%',
        height: '100%',
        padding: 5,
    },
    scroll: {
        width: ScreenWidth,
        height: '100%'
    },
    box: {
        borderWidth: .5,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'lightgrey',
        overflow: 'hidden',
        fontWeight: '600'
    },
    user:{
        fontSize: 20,
        paddingHorizontal: 20,
        fontWeight: '600'
    },
    icon: {
        width: 32,
        height: 32,
        borderWidth: 1,
        borderRadius: 32/2,
        backgroundColor: 'aliceblue',
        marginLeft: 10
    },
    userWrapper: {
        flexDirection: 'row', 
        paddingVertical: 8, 
        marginHorizontal: 20,
        borderWidth: 1,
        width: '70%',
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#E39E6D',
        overflow: 'hidden'
    },
    postWrapper: {
        flexDirection: 'row',
    }
});

// import * as React from 'react';
// import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, Modal } from 'react-native';
// // import recipes from '../../backend/model/recipes';
// import SearchResultsHeader from '../components/home/SearchResultsHeader'
// // import { PROFILE } from '../dummydata/profile' shouldnt need this right???

// export default function SearchResults({ route, navigation }) {
//     const background = '../Images/OCMgradient.png'
//     const { data } = route.params
//     let usersExists = false;
//     let postsExists = false;
//     let recipesExists = false;

//     if (!data.error) {
//         if (data.Users.length > 0) {
//             usersExists = true
//         } else {
//             usersExists = false
//         }

//         if (data.Posts.length > 0) {
//             postsExists = true
//         } else {
//             postsExists = false
//         }

//         if (data.Recipes.length > 0) {
//             recipesExists = true
//         } else {
//             recipesExists = false
//         }
//     }
//     return (
//         <ImageBackground style={styles.background} source={require(background)}>
//             <SafeAreaView style={styles.container}>
//                 <SearchResultsHeader navigation={navigation}></SearchResultsHeader>
//                 <View style={styles.userPart}>
//                     <Text style={{ fontSize: 30, }}>User Results</Text>
//                     <UserResult usersExists={usersExists} data={data}></UserResult>
//                 </View>
//                 <View style={styles.postPart}>
//                     <Text style={{ fontSize: 30, }}>Post Results</Text>
//                     <PostResult postsExists={postsExists} data={data}></PostResult>
//                 </View>
//                 <View style={styles.recipePart}>
//                     <Text style={{ fontSize: 30, }}>Recipe Results</Text>
//                     <RecipeResult recipesExists={recipesExists} data={data}></RecipeResult>
//                 </View>
//             </SafeAreaView>
//         </ImageBackground>
//     );
// }

// const UserResult = ({ usersExists, data }) => {
//     let content
//     if (usersExists) {
//         content = <Text style={{ fontSize: 20 }}>{data.Users[0].UserName}</Text>
//     } else {
//         content = <Text style={{ fontSize: 20 }}>No users found!</Text>
//     }
//     return content
// }

// const PostResult = ({ postsExists, data }) => {
//     let content
//     if (postsExists) {
//         content = <Image source={{ uri: data.Posts[0].Photo }} style={{ height: 200, width: 200, resizeMode: 'cover', margin: 5 }}></Image>
//     } else {
//         content = <Text style={{ fontSize: 20 }}>No posts found!</Text>
//     }
//     return content
// }

// const RecipeResult = ({ recipesExists, data }) => {
//     let content
//     if (recipesExists) {
//         content = <Text style={{ fontSize: 20 }}>{data.Recipes[0].Recipe}</Text>
//     } else {
//         content = <Text style={{ fontSize: 20 }}>No recipes found!</Text>
//     }
//     return content
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     background: {
//         flex: 1,
//     },
//     userPart: {
//         marginBottom: 60,
//         alignItems: 'center'
//     },
//     postPart: {
//         marginBottom: 60,
//         alignItems: 'center'
//     },
//     recipePart: {
//         marginBottom: 60,
//         alignItems: 'center'
//     }
// });
