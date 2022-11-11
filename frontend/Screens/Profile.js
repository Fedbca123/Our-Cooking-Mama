import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomTabs from '../components/BottomTabs';

export default function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Our profile page!</Text>
      <BottomTabs navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});