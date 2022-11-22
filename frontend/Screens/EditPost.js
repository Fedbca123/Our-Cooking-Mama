import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList, SafeAreaView, ImageBackground, Modal } from 'react-native';
import EditPostHeader from '../components/profile/EditPostHeader'
// import { PROFILE } from '../dummydata/profile' shouldnt need this right???

export default function EditPost({ route, navigation }) {
    const background = '../Images/OCMgradient.png'
    const { item } = route.params
    return (
        <ImageBackground style={styles.background} source={require(background)}>
            <SafeAreaView style={styles.container}>
                <EditPostHeader navigation={navigation}></EditPostHeader>
                <Text>BELOW SHOULD BE THE IMAGE IN QUESTION</Text>
                <Image source={{ uri: item.image }} style={{ height: 300, width: 300, resizeMode: 'cover', margin: 5 }}></Image>
                <Text> FOR SANITY CHECK THE KEY OF THIS SPECIFIC IMAGE / POST IS {item.key} </Text>
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
