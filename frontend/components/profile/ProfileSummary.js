import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const ProfileSummary = ({ profile }) => {
    return (
        <View style={styles.container}>
            <View style={{ paddingBottom: 10 }}>
                <Text style={{ fontSize: 30, fontWeight: '700' }}>{global.signedUser}</Text>
            </View>
            <View>
                <Image style={styles.logo} source={{ uri: profile[0].profile_picture }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 23, alignItems: 'center' }}>
                <View style={{ paddingHorizontal: 100 }}>
                    <Text>
                        <Text style={{ fontSize: 20, color: 'blue' }}>Foodies: </Text>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{profile[0].following}</Text>
                    </Text>
                </View>
                <View style={{ paddingHorizontal: 100 }}>
                    <Text>
                        <Text style={{ fontSize: 20, color: 'blue' }}>Fooders: </Text>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>{profile[0].followers}</Text>
                    </Text>
                </View>
            </View>
            <View style={{paddingVertical: 10, borderWidth: 1, paddingHorizontal: 10}}>
                <Text>{profile[0].bio}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: 'purple',
        marginBottom: 20
    },
    storyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
    },
})

export default ProfileSummary