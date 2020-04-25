import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

import { black, white } from '../utils/color'

export class Card extends Component {
  state = {
    flipCard: false
  }

  onPress = () => {
    this.setState(prevState => ({
      flipCard: !prevState.flipCard
    }))
  }
  render() {
    const { flipCard } = this.state
    const { card, index, deck } = this.props

    return (
      <View style={styles.card}>
        {
          !flipCard
              ? <Text style={styles.content}>Question: {card.question}</Text>
              : <Text style={styles.content}>Answer: {typeof card.answer === 'boolean' ? card.answer.toString() : card.answer}</Text>
        }
        <Text style={styles.text}>{index + 1} of {deck.questions.length}</Text>
        <Button onPress={this.onPress} title="Flip card"/>
      </View>
    )
  }
}

export default Card

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 250,
    minWidth: '80%',
    margin: 10,
    marginLeft: 40,
    marginRight: 40,
    padding: 20,
    backgroundColor: white,
    borderRadius: 10,
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  }
})
