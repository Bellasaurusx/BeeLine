import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../assets/Logo.png';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <Text style={styles.title}>BeeLine</Text>

      <Text style={{ marginTop: 10, marginBottom: 30 }}>asfdewf</Text>

      <View style={styles.card}>
        <Text>This is a card.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills full space
    backgroundColor: '#fff',
    alignItems: 'center', // center horizontally
    justifyContent: 'center', // center vertically
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 8,
    //shadow styling in React Native:
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // adds shadow on Android
  },
  img: {
    marginVertical: 20,
    width: 120, // add a width and hieght
    height: 120,
    resizeMode: 'contain',
  },
});
