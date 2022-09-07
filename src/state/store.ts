import { configureStore } from '@reduxjs/toolkit';
import cardReducer, {
  initialState,
  cardAdd,
  cardEdit,
  cardDelete,
} from './cardSlice';

export default configureStore({
  reducer: {
    card: cardReducer,
  },
});

// testing redux store
let newState = cardReducer(
  initialState,
  cardAdd('DONE', 'Quite Coffee', 'Get it Done')
);

console.log(newState);

newState = cardReducer(initialState, cardDelete('3'));
console.log(newState);

newState = cardReducer(initialState, cardEdit('5', 'Read 2 Books', 'read now'));
console.log(newState);
