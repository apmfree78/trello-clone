import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { DragVector } from "../lib/interfaces";

// information held by specific card or task
export interface CardState {
  id: string;
  category: string;
  title: string;
  desp: string;
}
// card edit reducer paylaod type
interface CardEditProp {
  id: string;
  title: string;
  desp: string;
}

// hold card sample data , for a full fledge app this
// data would be pull via API to backend database
export const initialState: CardState[] = [
  { id: "1", category: "TO DO", title: "Yoga", desp: "Go to Yoga" },
  { id: "2", category: "TO DO", title: "Gym", desp: "Go to Gym" },
  { id: "3", category: "TO DO", title: "Read", desp: "Read a Book" },
  {
    id: "4",
    category: "TO DO",
    title: "Get Gas for Car",
    desp: "Get Gas for Car",
  },
  { id: "5", category: "TO DO", title: "Go for Walk", desp: "Go for Walk" },
  { id: "6", category: "TO DO", title: "Read", desp: "Read a Book" },
  { id: "7", category: "IN PROGRESS", title: "Code", desp: "Coding now" },
  {
    id: "8",
    category: "IN PROGRESS",
    title: "Write Blog Post",
    desp: "Write on leetcode",
  },
  {
    id: "9",
    category: "IN PROGRESS",
    title: "Buy Grocery",
    desp: "At Grocery Store",
  },
  { id: "10", category: "DONE", title: "Dinner", desp: "Made Dinner" },
  { id: "11", category: "DONE", title: "Vacuum", desp: "Done Vacuuming" },
  { id: "12", category: "DONE", title: "Feed Cats", desp: "Feed Cats at 9pm" },
];

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    cardAdd: {
      reducer(state, action: PayloadAction<CardState>) {
        state.push(action.payload);
      },
      prepare(category: string, title: string, desp: string) {
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
    cardEdit: {
      reducer(state, action: PayloadAction<CardEditProp>) {
        // destructioning paylaod
        const { title, desp } = action.payload;
        // extracting location of cared to edit
        const cardToEdit = state.find((card) => card.id === action.payload.id);

        if (cardToEdit) {
          //updating card values
          // console.log('editing card');
          cardToEdit.title = title;
          cardToEdit.desp = desp;
        }
      },
      prepare(id: string, title: string, desp: string) {
        return {
          payload: {
            id,
            title,
            desp,
          },
        };
      },
    },
    cardDelete(state, action: PayloadAction<string>) {
      // extracting location of card in state array by using
      // action.payload , whihc is just card id
      const index = state.findIndex((card) => card.id === action.payload);

      if (index) {
        //deleting card at index
        // console.log(`deleting card at ${index}`);
        state.splice(index, 1);
      }
    },

    // after being dragged by user, drop card in its new position
    // this will require updating, based on new card location
    // given in DragCoorindates
    moveCard(state, action: PayloadAction<DragVector>) {
      // action.payload represent coordinates of the starting
      // and ending positions of the card that has been dragged
      // console.log(action.payload);
      if (
        action.payload?.start === undefined ||
        action.payload?.current === undefined
      )
        return;

      // now extracting starting position of card (when user first dragged)
      // and final position of card (when user dropped)
      const { category: startCategory, index: startIndex } =
        action.payload.start;
      const { category: finalCategory, index: finalIndex } =
        action.payload.current;

      // second validation if final and start position are same
      // then exit (as there no where for the card to move!)
      if (startCategory === finalCategory && startIndex === finalIndex) return;

      // console.log(`start cat: ${startCategory}, index: ${startIndex}`);
      // console.log(`final cat: ${finalCategory}, index: ${finalIndex}`);
      //filtering out and extract board where card was first Dragged from
      const startBoard: CardState[] | undefined = current(state).filter(
        (card) => card.category === startCategory
      );
      if (startBoard === undefined) return; //quick validation check

      // obtaining card we're going to move from starBoard
      const cardToMove: CardState = startBoard[startIndex];

      // removing card from starting drag position
      // console.log('removing card from initial position');
      startBoard.splice(startIndex, 1);

      // if starting category and final category are the same then
      // card was just moved into a different position on the same board
      if (startCategory === finalCategory) {
        //inserting dragged item in new position
        // console.log('adding card to new position');
        startBoard.splice(finalIndex, 0, cardToMove);

        // console.log(startBoard);
        //*****************setting state ***************
        // extracting other card Boards and combining with startBoard
        const otherBoards: CardState[] | undefined = current(state).filter(
          (card) => card.category !== startCategory
        );
        // console.log(otherBoards);
        return [...otherBoards, ...startBoard];
      } else {
        // start category and final category are different
        //here we are moving cards from 1 Board to Another

        //determine final board
        const finalBoard: CardState[] | undefined = current(state).filter(
          (card) => card.category === finalCategory
        );

        //updating category on cardToMove to match finalCategory
        // cardToMove.category = finalCategory;

        //inserting dragged item in new position on NEW Board
        finalBoard.splice(finalIndex, 0, {
          id: cardToMove.id,
          category: finalCategory,
          title: cardToMove.title,
          desp: cardToMove.desp,
        });

        // console.log(finalBoard);
        //*****************setting state ***************
        // extracting other card Boards and combining with startBoard
        const otherBoards: CardState[] | undefined = current(state).filter(
          (card) =>
            card.category !== startCategory && card.category !== finalCategory
        );

        return [...otherBoards, ...startBoard, ...finalBoard]; // set state
      }
    },
  },
});

export const { cardAdd, cardEdit, cardDelete, moveCard } = cardSlice.actions;

export default cardSlice.reducer;
