import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DeckCard from './DeckCard'
import { receiveDecks } from '../actions'
import { getDecks } from '../utils/api'
import { setLocalNotification } from '../utils/helper'

export class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    
    setLocalNotification()

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
  }

  render() {
    const { decksIds, decks, navigation, loading } = this.props

    if (loading === true) {
      return <Text>Loading...</Text>
    }
 
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Decks
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('New Deck')}
          >
            <MaterialCommunityIcons
              name='plus-circle'
              size={40}
              color={'red'}
            />
          </TouchableOpacity>
        </View>
          {
            decksIds !== null
              ? decksIds.map(deck_id => (
                <DeckCard
                  key={deck_id}
                  deck_id={deck_id}
                  decks={decks}
                  navigation={navigation}
                />
              ))
              : (
                <View style={styles.noDeckContainer}>
                  <Text style={styles.noDeckMessage}>You don't have any deck yet</Text>
                </View>
              )
        }
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  const decksIds = state ? Object.keys(state) : null

  return { 
    loading: state === null ? true : false,
    decks: state,
    decksIds
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  headerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  noDeckMessage: {
    textAlign: 'center',
    fontSize: 22,
    color: 'gray'
  },
  noDeckContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 200,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#B284BE',
    marginBottom:10
  },
  addButton: {
    width: 40,
    height: 40,
  }
})
