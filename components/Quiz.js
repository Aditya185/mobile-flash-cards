import React, { Component } from 'react'
import { Text, View, Button, StyleSheet,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../utils/styles';

import Card from './Card'
import Btn from './Btn'
import { clearLocalNotification, setLocalNotification } from '../utils/helper'

export class Quiz extends Component {
  state = {
    index: 0,
    correctAnswers: 0,
  }

  onPress = (answer) => {
    const deck_id = this.props.route.params.deck_id
    const deck = this.props.decks[deck_id]
    const lastIndex = deck.questions.length
    const { index } = this.state

    if (answer === deck.questions[index].answer.toString()) {
      this.setState(prevState => {
        return {
          index: prevState.index < lastIndex ? prevState.index + 1 : prevState.index,
          correctAnswers: prevState.correctAnswers + 1
        }
      })
    } else {
      this.setState(prevState => {
        return {
          index: prevState.index < lastIndex ? prevState.index + 1 : prevState.index,
          correctAnswers: prevState.correctAnswers
        }
      })
    }
  }

  handleRestartQuiz = () => {
    this.setState({
      index: 0,
      correctAnswers: 0
    })
  }

  handleFinishQuiz = () => {
    const deck_id = this.props.route.params.deck_id
    
    clearLocalNotification().then(() => setLocalNotification)

    return this.props.navigation.navigate('Deck', {
      deck_id
    })
  }

  render() {
    const deck_id = this.props.route.params.deck_id
    const deck = this.props.decks[deck_id]
    const { index, correctAnswers } = this.state

    return (
      <View style={stylo.quizContainer}>
        {
          deck.questions[index]
            ? (
              <View>
                <Card
                  index={index}
                  deck={deck}
                  card={deck.questions[index]}
                />
                <TouchableOpacity
                      style={[styles.buttonCorrect, styles.buttonGreen,{marginTop:50}]} onPress={() => {
                        this.handleResponse({ isCorrect: true });
                      }}
                      >
                      <Text style={[styles.buttonText, styles.buttonBlackText,{fontSize:20}]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonInCorrect, styles.buttonRed,{marginTop:10}]}  onPress={() => {
                        this.handleResponse({ isCorrect: false });
                      }}
                      >
                      <Text style={[styles.buttonText, styles.buttonBlackText,{fontSize:20}]}>Incorrect</Text>
                    </TouchableOpacity>
              </View>
            ) : (
              <View style={stylo.messageContainer}>
                <Text style={stylo.finalMessage}>You finished the quiz</Text>
                <Text style={stylo.finalMessage} >You got {(correctAnswers / deck.questions.length * 100).toFixed(2)}% of correct answers</Text>

                <Button title='Back to Deck' onPress={this.handleFinishQuiz} />

                <Button title='Restart quiz' onPress={this.handleRestartQuiz} />
              </View>
            )
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    decks: state
  }
}

export default connect(mapStateToProps)(Quiz)

const stylo = StyleSheet.create({
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    color: 'red'
  },
  finalMessage: {
    fontSize: 22,
    textAlign: 'center',
    margin: 20,
  },
  messageContainer: {
    height: 200,
  }
})