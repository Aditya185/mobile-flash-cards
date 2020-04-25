import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { gainsboro } from '../utils/color'

class DeckCard extends Component {
  render() {
    
    const { navigation, decks, deck_id } = this.props
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Deck', {
        deck_id,
      })}>
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>{decks[deck_id].title}</Text>
          <Text style={styles.text}>{decks[deck_id].questions ? decks[deck_id].questions.length : 0} cards</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default DeckCard;

const styles = StyleSheet.create({
  deckTitle: {
    fontSize: 22,
    textAlign: 'center',
    padding: 5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  deck: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
    height: 120,
    backgroundColor: '#87ceeb',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    marginLeft:5,
    marginRight:5
  },
})
