import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Logo from '../assets/Logo.png';
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <Text style={[styles.title, {color: 'red'}]}>BeeLine</Text>

      <Text style={{ marginTop: 10, marginBottom: 30 }}>A Bee App</Text>

      <View style={styles.card}>
              <Link href="camera">camera</Link>
      </View>

      <View style={styles.card}>
            <Link href="maps" style={styles.Link}>maps</Link>
      </View>

            
      <View style={styles.card}>
            <Link href="photogal" style={styles.Link}>photogal</Link>
      </View>

      <View style={styles.card}>
            <Link href="login" style={styles.Link}>login</Link>
      </View>

            <View style={styles.card}>
            <Link href="compvis" style={styles.Link}>Camera2</Link>
      </View>

      <Link href="about" style={styles.Link}>About Page</Link>
      <Link href="contact" style={styles.Link}>Contact Page</Link>

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

      Link:{
        marginVertical: 10,
        borderBottomWidth: 1,
    }
});
