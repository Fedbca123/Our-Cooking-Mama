import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Our settings page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
