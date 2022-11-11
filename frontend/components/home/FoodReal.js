import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const FoodReal = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image style={styles.stories} source={require('../../Images/breakfast.jpg')} />
                <Text style={styles.storyText} >Breakfast</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.stories} source={require('../../Images/lunch.jpg')} />
                <Text style={styles.storyText} >Lunch</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.stories} source={require('../../Images/dinner.jpg')} />
                <Text style={styles.storyText} >Dinner</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',

    },
    stories: {
        width: 90,
        height: 90,
        marginLeft: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'purple',
    },
    storyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
    },
})

export default FoodReal