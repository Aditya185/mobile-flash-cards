import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import styles from '../utils/styles';
import { gray } from '../utils/color'
import Card from './Card'
import Loading from './Loading'
import { removeDeck } from '../utils/api'
import { deleteDeck } from '../actions/index'


class Deck extends Component {
  onPress = () => {
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
      <View style={stylo.deckHeader}>
        <Text style={stylo.title}>
          {deck.title}
        </Text>
        <Text style={stylo.text}>{deck.questions.length} cards</Text>
      </View>

       <TouchableOpacity
            style={[styles.button]}   onPress={() => this.props.navigation.navigate('New Card', {
              deck_id
            })}
            >
            <Text style={[styles.buttonText,{fontWeight:'bold'}]}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlack,{marginTop:10}]}     onPress={this.onPress}
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

const stylo = StyleSheet.create({
  trash: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  deckHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: 120,
  },
  deckHeader: {
    padding: 40,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
  },
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    padding: 10,
    marginTop: 20,
  },
  noCardsMessage: {
    textAlign: 'center',
    fontSize: 20,
    color: gray
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 200,
  }
})

