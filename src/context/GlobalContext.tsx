import React, { createContext, DragEvent, useState, useRef } from 'react';
import { Position, DragVector, cardProp } from '../lib/interfaces';
// importing sample data
import { cardItems } from '../lib/todoData';

interface Props {
  children?: React.ReactNode;
}

export const GlobalContext: React.Context<any> = createContext('');

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  // managing state with useState
  // cards holds an array of all cards on on trello boards
  // the interface for 1 card item is
  /*   export interface cardProp {
    category: string;
    title: string;
    desp: string;
  }
 */
  // category is the name of the cardBoard the item will go on
  // title is the title of the card and desp is the description
  const [cards, setCards] = useState<cardProp[] | undefined>([...cardItems]);
  // setting up useRef to starting and current position
  // of a card while it's being dragged
  const dragCoordinates = useRef<DragVector | null>(null);

  // adds a new card (card) provided by user form input
  // this function will be passed as a prop to cardBoard component
  // it will then be called by handleClick function
  const addCard = (card: cardProp): void => {
    // validating that input was provided and cards
    // is defined
    if (cards === undefined) return;

    //adding in new card
    setCards([...cards, card]);
  };

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

    // DEBUG OUTPUT *************
    const { category, index } = dragCoordinates.current?.start;
    console.log(`start category: ${category}, start index: ${index}`);
    const { category: currentCategory, index: currentIndex } =
      dragCoordinates.current?.current;
    console.log(
      `current category: ${currentCategory}, current index: ${currentIndex}`
    );
  };

  // after being dragged by user, drop card in its new position
  // this will require updating, based on new card location
  // given in DragCoorindates
  const moveCard = (event: DragEvent<Element>): void => {
    event.preventDefault();
    event.stopPropagation();
    //validation checks, make sure useRef DragCoordinates is defined
    // if undefined then exit
    if (
      dragCoordinates.current?.start === undefined ||
      dragCoordinates.current?.current === undefined ||
      cards === undefined
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
    const startBoard: cardProp[] | undefined = cards?.filter(
      (card) => card.category === startCategory
    );
    if (startBoard === undefined) return; //quick validation check

    // obtaining card we're going to move from starBoard
    const cardToMove: cardProp = startBoard[startIndex];

    // removing card from starting drag position
    startBoard.splice(startIndex, 1);

    // if starting category and final category are the same then
    // card was just moved into a different position on the same board
    if (startCategory === finalCategory) {
      //inserting dragged item in new position
      startBoard.splice(finalIndex, 0, cardToMove);

      //*****************setting state ***************
      // extracting other card Boards and combining with startBoard
      const otherBoards: cardProp[] | undefined = cards?.filter(
        (card) => card.category !== startCategory
      );
      setCards([...otherBoards, ...startBoard]); // set state
    } else {
      // start category and final category are different
      //here we are moving cards from 1 Board to Another

      //determine final board
      const finalBoard: cardProp[] | undefined = cards?.filter(
        (card) => card.category === finalCategory
      );

      //updating category on cardToMove to match finalCategory
      cardToMove.category = finalCategory;

      //inserting dragged item in new position on NEW Board
      finalBoard.splice(finalIndex, 0, cardToMove);

      //*****************setting state ***************
      // extracting other card Boards and combining with startBoard
      const otherBoards: cardProp[] | undefined = cards?.filter(
        (card) =>
          card.category !== startCategory && card.category !== finalCategory
      );
      setCards([...otherBoards, ...startBoard, ...finalBoard]); // set state
    }
  };

  if (!cards) {
    return (
      <GlobalContext.Provider
        value={{
          cardItems,
          addCard,
          moveCard,
          setDragPosition,
        }}>
        {children}
      </GlobalContext.Provider>
    );
  } else {
    return (
      <GlobalContext.Provider
        value={{
          cards,
          setCards,
          addCard,
          moveCard,
          setDragPosition,
        }}>
        {children}
      </GlobalContext.Provider>
    );
  }
};
