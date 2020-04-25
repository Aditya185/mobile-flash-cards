export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE'
export const DELETE_DECK = 'DELETE_DECK'
export const UPDATE_DECKS = 'UPDATE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function saveDeckTitleAction(deck) {
  return {
    type: SAVE_DECK_TITLE,
    deck
  }
}

export function addCardToDeckAction(card) {
  return {
    type: ADD_CARD_TO_DECK,
    card
  }
}

export function deleteDeck(deck_id) {
  return {
    type: DELETE_DECK,
    deck_id
  }
}