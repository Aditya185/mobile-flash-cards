import 'react-native-gesture-handler'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Card from './components/Card'
import AddCard from './components/AddCard'
import Deck from './components/Deck'
import Quiz from './components/Quiz'

import reducer from './reducers/index'
import middleware from './middleware/index'

const Stack = createStackNavigator()
const store = createStore(reducer, middleware)

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Decks">
          <Stack.Screen
            name='Decks'
            component={DeckList}
            options={{ title: 'Mobile Flash Cards' }}
          />
          <Stack.Screen
            name='New Deck'
            component={NewDeck}
          />
          <Stack.Screen
            name='Deck'
            component={Deck}
          />
          <Stack.Screen
            name='New Card'
            component={AddCard}
          />
          <Stack.Screen
            name='Card'
            component={Card}
          />
          <Stack.Screen
            name='Quiz'
            component={Quiz}
          />
           
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App