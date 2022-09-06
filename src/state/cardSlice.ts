import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

// information held by specific card or task
export interface CardState {
  id: string;
  category: string;
  title: string;
  desp: string;
}



// hold card sample data , for a full fledge app this
// data would be pull via API to backend database
export const initialState: CardState[] = [
  { id: '1', category: 'TO DO', title: 'Yoga', desp: 'Go to Yoga' },
  { id: '2', category: 'TO DO', title: 'Gym', desp: 'Go to Gym' },
  { id: '3', category: 'TO DO', title: 'Read', desp: 'Read a Book' },
  { id: '4', category: 'TO DO', title: 'Get Gas for Car', desp: 'Get Gas for Car' },
  { id: '5', category: 'TO DO', title: 'Go for Walk', desp: 'Go for Walk' },
  { id: '6', category: 'TO DO', title: 'Read', desp: 'Read a Book' },
  { id: '7', category: 'IN PROGRESS', title: 'Code', desp: 'Coding now' },
  {
    id: '8',
    category: 'IN PROGRESS',
    title: 'Write Blog Post',
    desp: 'Write on leetcode',
  },
  { id: '9', category: 'IN PROGRESS', title: 'Buy Grocery', desp: 'At Grocery Store' },
  { id: '10', category: 'DONE', title: 'Dinner', desp: 'Made Dinner' },
  { id: '11', category: 'DONE', title: 'Vacuum', desp: 'Done Vacuuming' },
  { id: '12', category: 'DONE', title: 'Feed Cats', desp: 'Feed Cats at 9pm' },
];

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    add: {
      reducer(state, action: PayloadAction<CardState>) {
        state.push(action.payload);
      },
      prepare(category, title, desp) {
        return {
          payload: {
            id: nanoid(),
            category,
            title,
            desp
          }
        }
      }
    },
    edit: (state, action: PayloadAction<CardState>) => {
      // destructioning paylaod
      const { title, desp } = action.payload;
      // extracting location of cared to edit
      const cardToEdit = state.find(card => card.id === action.payload.id);

      if (cardToEdit) {
        //updating card values
        cardToEdit.title = title;
        cardToEdit.desp = desp;
      }
    },
    delete: (state, action: PayloadAction<string>) => {
      // extracting location of card in state array by using 
      // action.payload , whihc is just card id 
      const index = state.findIndex(card => card.id === action.payload);

      if (index) {
        //deleting card at index 
        state.slice(index, 1);
      }
    }
  }
});

// export const { add, edit, delete } = cardSlice.actions;

export default cardSlice.reducer
