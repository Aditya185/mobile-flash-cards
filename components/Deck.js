import React, { Component } from 'react'
import { View, Text,ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../utils/styles';
import { removeDeck } from '../utils/api'
import { deleteDeck } from '../actions/index'


class Deck extends Component {

  handleStartQuiz = () => {
    const deck_id = this.props.route.params.deck_id
    const deck = this.props.decks[deck_id]

    if (deck.questions.length === 0) {
      return alert('Add cards to start a quiz')
    }

    return this.props.navigation.navigate('Quiz', {
      deck_id
    })
  }

  handleDelete = () => {
    const deck_id = this.props.route.params.deck_id
    this.props.dispatch(deleteDeck(deck_id))
    removeDeck(deck_id)

    return this.props.navigation.navigate('Decks')
  }

 

  render() {
  const deck_id = this.props.route.params.deck_id
  const deck = this.props.decks[deck_id]
  
  if (!deck) {
    return  <Text style={styles.loadingMessage}>
              Loading...
            </Text>
  }

  return (
    <ScrollView> 
      <View style={styles.deckHeader}>
        <Text style={styles.titleDeck}>
          {deck.title}
        </Text>
        <Text style={styles.textDeck}>{deck.questions.length} cards</Text>
      </View>

       <TouchableOpacity
            style={[styles.button]}   onPress={() => this.props.navigation.navigate('New Card', {
              deck_id
            })}
            >
            <Text style={[styles.buttonText,{fontWeight:'bold'}]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlack,{marginTop:10}]}     onPress={this.handleStartQuiz}
            >
            <Text style={[styles.buttonText, styles.buttonBlackText]}>Start Quiz</Text>
          </TouchableOpacity>
         
          <Text style={[{fontSize:18,marginTop:10,textAlign:'center',color:'red'}]} onPress={this.handleDelete} >Delete Deck</Text>
         
    </ScrollView>
  )
  }
}

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(Deck)

