import { useRef } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Position, DragVector } from '../lib/interfaces';

// setting up useRef to starting and current position
// of a card while it's being dragged
const dragCoordinates = useRef<DragVector | null>(null);

// track index and category of card while it's being dragged
// type can be either "start" or "current", indicating
// what Drag cooridinate is being updated
const setDragPosition = (position: Position, type: string): void => {
  if (type === 'current' || type === 'start') {
    dragCoordinates.current = {
      ...dragCoordinates?.current,
      [type]: position,
    };
  }
  if (
    dragCoordinates.current?.start === undefined ||
    dragCoordinates.current?.current === undefined
  )
    return;
};
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
  {
    id: '4',
    category: 'TO DO',
    title: 'Get Gas for Car',
    desp: 'Get Gas for Car',
  },
  { id: '5', category: 'TO DO', title: 'Go for Walk', desp: 'Go for Walk' },
  { id: '6', category: 'TO DO', title: 'Read', desp: 'Read a Book' },
  { id: '7', category: 'IN PROGRESS', title: 'Code', desp: 'Coding now' },
  {
    id: '8',
    category: 'IN PROGRESS',
    title: 'Write Blog Post',
    desp: 'Write on leetcode',
  },
  {
    id: '9',
    category: 'IN PROGRESS',
    title: 'Buy Grocery',
    desp: 'At Grocery Store',
  },
  { id: '10', category: 'DONE', title: 'Dinner', desp: 'Made Dinner' },
  { id: '11', category: 'DONE', title: 'Vacuum', desp: 'Done Vacuuming' },
  { id: '12', category: 'DONE', title: 'Feed Cats', desp: 'Feed Cats at 9pm' },
];

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    cardAdd: {
      reducer(state, action: PayloadAction<CardState>) {
        state.push(action.payload);
      },
      prepare(category, title, desp) {
        return {
          payload: {
            id: nanoid(),
            category,
            title,
            desp,
          },
        };
      },
    },
    cardEdit(state, action: PayloadAction<CardState>) {
      // destructioning paylaod
      const { title, desp } = action.payload;
      // extracting location of cared to edit
      const cardToEdit = state.find((card) => card.id === action.payload.id);

      if (cardToEdit) {
        //updating card values
        cardToEdit.title = title;
        cardToEdit.desp = desp;
      }
    },
    cardDelete(state, action: PayloadAction<string>) {
      // extracting location of card in state array by using
      // action.payload , whihc is just card id
      const index = state.findIndex((card) => card.id === action.payload);

      if (index) {
        //deleting card at index
        state.slice(index, 1);
      }
    },

    // after being dragged by user, drop card in its new position
    // this will require updating, based on new card location
    // given in DragCoorindates
    moveCard(state, action: PayloadAction<DragEvent>) {
      action.payload.preventDefault();
      action.payload.stopPropagation();
      //validation checks, make sure useRef DragCoordinates is defined
      // if undefined then exit
      if (
        dragCoordinates.current?.start === undefined ||
        dragCoordinates.current?.current === undefined
      )
        return;

      // now extracting starting position of card (when user first dragged)
      // and final position of card (when user dropped)
      const { category: startCategory, index: startIndex } =
        dragCoordinates.current?.start;
      const { category: finalCategory, index: finalIndex } =
        dragCoordinates.current?.current;

      // second validation if final and start position are same
      // then exit (as there no where for the card to move!)
      if (startCategory === finalCategory && startIndex === finalIndex) return;

      //filtering out and extract board where card was first Dragged from
      const startBoard: CardState[] | undefined = state?.filter(
        (card) => card.category === startCategory
      );
      if (startBoard === undefined) return; //quick validation check

      // obtaining card we're going to move from starBoard
      const cardToMove: CardState = startBoard[startIndex];

      // removing card from starting drag position
      startBoard.splice(startIndex, 1);

      // if starting category and final category are the same then
      // card was just moved into a different position on the same board
      if (startCategory === finalCategory) {
        //inserting dragged item in new position
        startBoard.splice(finalIndex, 0, cardToMove);

        //*****************setting state ***************
        // extracting other card Boards and combining with startBoard
        const otherBoards: CardState[] | undefined = state?.filter(
          (card) => card.category !== startCategory
        );
        state = [...otherBoards, ...startBoard];
      } else {
        // start category and final category are different
        //here we are moving cards from 1 Board to Another

        //determine final board
        const finalBoard: CardState[] | undefined = state?.filter(
          (card) => card.category === finalCategory
        );

        //updating category on cardToMove to match finalCategory
        cardToMove.category = finalCategory;

        //inserting dragged item in new position on NEW Board
        finalBoard.splice(finalIndex, 0, cardToMove);

        //*****************setting state ***************
        // extracting other card Boards and combining with startBoard
        const otherBoards: CardState[] | undefined = state?.filter(
          (card) =>
            card.category !== startCategory && card.category !== finalCategory
        );

        state = [...otherBoards, ...startBoard, ...finalBoard]; // set state
      }
    },
  },
});

export const { cardAdd, cardEdit, cardDelete, moveCard } = cardSlice.actions;

export default cardSlice.reducer;
