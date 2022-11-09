import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        {/* <Image
          style={styles.tinyLogo}
          source={require('../Images/OCMlogo2.png')}
        /> */}
      </View>
      <Text>
          Here lies the home screen :)
        </Text>
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
  logo: {
    
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
});
