import {
  RECEIVE_DECKS,
  SAVE_DECK_TITLE,
  ADD_CARD_TO_DECK,
  DELETE_DECK
} from '../actions'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case SAVE_DECK_TITLE:
      return {
        ...state,
        [action.deck.deck_id]: {
          ...action.deck
        }
      }
    case ADD_CARD_TO_DECK:
      const { card } = action
      const { deck_id, question, answer } = card
      return {
        ...state,
        [deck_id]: {
          ...state[deck_id],
          questions: state[deck_id].questions.concat({
            question,
            answer
          })
        }
      }
    case DELETE_DECK:
      delete state[action.deck_id];
      return {
        ...state
      }
    default:
      return state
  }
}
