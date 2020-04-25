import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { steelblue, white } from '../utils/color'

const Btn = ({ children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Btn

const styles = StyleSheet.create({
  btn: {
    backgroundColor: steelblue,
    padding: 10,
    marginBottom: 20,
    height: 40,
    width: '80%',
    alignSelf: 'center'
  },
  text: {
    color: white,
    textAlign: 'center',
    fontSize: 18,
  }
})


