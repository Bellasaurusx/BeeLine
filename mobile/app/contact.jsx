import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Page</Text>

    <Link href="/" style={styles.Link}>Back Home</Link>
    </View>
  )
}

export default Contact

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

    Link:{
        marginVertical: 10,
        borderBottomWidth: 1,
    }

})