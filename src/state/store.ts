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
const newState = cardReducer(
  initialState,
  cardAdd('DONE', 'Quite Coffee', 'Get it Done')
);

console.log(newState);
