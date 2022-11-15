import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BottomTabs from '../components/BottomTabs';

export default function Settings({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Our settings page!</Text>
      <BottomTabs navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
