import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "./localStorage";
import cardReducer from "./cardSlice";
//   initialState,
//   cardAdd,
//   cardEdit,
//   cardDelete,

export default configureStore({
  reducer: {
    cards: cardReducer,
  },
  preloadedState: loadState(),
});

// // testing redux store
// let newState = cardReducer(
//   initialState,
//   cardAdd('DONE', 'Quite Coffee', 'Get it Done')
// );

// console.log(newState);

// newState = cardReducer(initialState, cardDelete('3'));
// console.log(newState);

// newState = cardReducer(initialState, cardEdit('5', 'Read 2 Books', 'read now'));
// console.log(newState);
