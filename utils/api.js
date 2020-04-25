import { AsyncStorage } from 'react-native'

const UDACITY_FLASHCARDS_KEY = 'udacity:flashcards'

const dummyData = () => ({
  'wdkp9xk3edalu40frxoigl': {
    deck_id: 'wdkp9xk3edalu40frxoigl',
    title: 'React',
    questions: [

        
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'When the state object changes, the component re-renders.',
        answer: 'correct'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      },
      {
        question: 'JSX is typesafe.',
        answer: 'correct'
      }
    ]
  },
  'e1bz7itvzi8351djcnes7j': {
    deck_id: 'e1bz7itvzi8351djcnes7j',
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      },
      {
        question: 'Multi-line comments in JavaScript start with //.',
        answer: 'incorrect'
      }
    ]
  }
})

export async function getDecks() {
  try {
    const results = await AsyncStorage.getItem(UDACITY_FLASHCARDS_KEY)

    if (results) {
      const data = JSON.parse(results)
      return data
    }
    else {
      await AsyncStorage.setItem(UDACITY_FLASHCARDS_KEY, JSON.stringify(dummyData()))
  
      return dummyData()
    }

  }
  catch (error) {
    await AsyncStorage.setItem(UDACITY_FLASHCARDS_KEY, JSON.stringify(dummyData()))
    return dummyData()
    
  }
}

export async function saveDeckTitle(deck) {

  await AsyncStorage.mergeItem(UDACITY_FLASHCARDS_KEY, JSON.stringify(
    {
      [deck.deck_id]: deck
    }
  ))
  return deck
}

export async function addCardToDeck(card) {
  const results = await AsyncStorage.getItem(UDACITY_FLASHCARDS_KEY)
  if (results) {
    const data = JSON.parse(results)
    const deck = data[card.deck_id]
    deck.questions = deck.questions.concat({
      question: card.question,
      answer: card.answer
    })
    await AsyncStorage.mergeItem(UDACITY_FLASHCARDS_KEY, JSON.stringify(
      {
        [card.deck_id]: deck
      }
    ))
    return card
  }
}

export async function removeDeck(deck_id) {
  const results = await AsyncStorage.getItem(UDACITY_FLASHCARDS_KEY)
  if (results) {
    const data = JSON.parse(results)
    delete data[deck_id]

    await AsyncStorage.setItem(UDACITY_FLASHCARDS_KEY, JSON.stringify(data))
    return data
  }
  return {}
}
