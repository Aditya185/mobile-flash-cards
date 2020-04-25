import React, { Component } from 'react'
import { View, TextInput, StyleSheet, Picker, Button,KeyboardAvoidingView,Text,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styles from '../utils/styles';

import { white } from '../utils/color'
import { addCardToDeckAction } from '../actions'
import { addCardToDeck } from '../utils/api'

class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onPress = () => {
    const { dispatch, navigation } = this.props
    const { question, answer } = this.state
    const deck_id = this.props.route.params.deck_id

    if (question === '' || answer === '') {
      return alert('Please, add question and answer')
    }

    const card = {
      deck_id,
      question,
      answer
    }
    
    dispatch(addCardToDeckAction(card))
    addCardToDeck(card)

    this.setState({
      question: '',
      answer: '',
    })

    return navigation.navigate('Deck', {
      deck_id
    })
  }

  render() {
    const { question,answer } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={[styles.content]}>
        <Text style={[ {fontWeight:'bold',fontSize:16,marginBottom:20}]}>Please Submit your Question and Answer</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Question"
          onChangeText={question => this.setState({ question })}
          value={question}
          multiline={true}
         
        />
        <TextInput
          style={styles.input}
          placeholder="Your Answer"
          onChangeText={answer => this.setState({ answer })}
          value={answer}
          multiline={true}
         
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonBlack]}   onPress={this.onPress}
          >
          <Text style={[styles.buttonText, styles.buttonBlackText]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewCard)

