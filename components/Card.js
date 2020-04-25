import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import styles from '../utils/styles'


export class Card extends Component {
  state = {
    flipCard: false
  }

  handleFlip = () => {
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
              ? <Text style={styles.contentCard}>Question: {card.question}</Text>
              : <Text style={styles.contentCard}>Answer: {typeof card.answer === 'boolean' ? card.answer.toString() : card.answer}</Text>
        }
        <Text style={styles.textCard}>{index + 1} of {deck.questions.length}</Text>
        <Button onPress={this.handleFlip} title="Flip card"/>
      </View>
    )
  }
}

export default Card

