import React, { Component } from 'react'
import { View, TextInput, StyleSheet,KeyboardAvoidingView,Text,TouchableOpacity } from 'react-native'
import { white } from '../utils/color'
import { connect } from 'react-redux'
import styles from '../utils/styles';

import { saveDeckTitleAction  } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { generateUID } from '../utils/helper'

export class NewDeck extends Component {
  state = {
    deckTitle: '',
    toDeck: false,
  }

  onPress = () => {
    const { dispatch, navigation } = this.props
    const { deckTitle } = this.state

    if (deckTitle === '') {
      return alert('Please, add a title')
    }

    const deck_id = generateUID()
    
    const deck = {
      deck_id,
      title: deckTitle,
      questions: []
    }
    
    dispatch(saveDeckTitleAction(deck))
    saveDeckTitle(deck)
    
    this.setState({
      deckTitle: ''
    })

    return navigation.navigate('Deck', {
      deck_id,
    })
  }

  render() {
    const { deckTitle } = this.state
    
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={[styles.content,{marginTop:50}]}>
        <Text style={[styles.title, {marginBottom: 20,fontSize:30}]}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(deckTitle) => this.setState({ deckTitle })}
          value={deckTitle}
          multiline={true}
         
        />
        <TouchableOpacity
             style={[styles.button, styles.buttonBlack]} 
              onPress={this.onPress}
          >
          <Text style={[styles.buttonText, styles.buttonBlackText]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    )
  }
}



export default connect()(NewDeck)