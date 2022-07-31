import React, {
  createContext,
  DragEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Position, DragVector, cardProp } from '../lib/interfaces';
// importing sample data
import { cardItems } from '../lib/todoData';

interface Props {
  children?: React.ReactNode;
}

/*
  THIS FILE CONTAINS THE GLOBAL STATE OF APPLICATION, INCLUDING
  BOTH DATA (VIA USESTATE AND USEREF) THAT IS AN OBJECT CONTAINING
  ALL USER CARDS.  THESE CARDS ARE LOADED FROM /LIB/TODODATA.TS

  ALL MAIN FUNCTION THAT MUTATE THE STATE ARE INCLUDED IN THIS FILE,
  INCLUDING: addCard, editCard, deleteCard, and moveCard

  setDragPosition tracks the current position of a card that is
  being tragged and saved it into a ref called dragCoordinates

  moveCard uses dragCoordinates to move the card from it's initial
  location to final location
*/

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

  //checking to see if card data is stored in localStorage
  const savedCards: string | null = localStorage.getItem('cards');
  const hasLocalStorage: boolean = savedCards !== null;

  // DEFINING MAIN CARD STATE
  const [cards, setCards] = useState<cardProp[] | undefined>(
    hasLocalStorage ? JSON.parse(savedCards || '') : [...cardItems]
  );
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

    /*    // DEBUG OUTPUT *************
    const { category, index } = dragCoordinates.current?.start;
    console.log(`start category: ${category}, start index: ${index}`);
    const { category: currentCategory, index: currentIndex } =
      dragCoordinates.current?.current;
    console.log(
      `current category: ${currentCategory}, current index: ${currentIndex}`
    ); */
  };
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

  // edits a card title and/or description based on what
  // the user submitted in CardEditForm (via CardModal)
  // state is updated too and re-rendered to show updates
  const editCard = (card: cardProp, index: number): void => {
    //filtering out and extract board where card is located
    const currentBoard: cardProp[] | undefined = cards?.filter(
      (_card) => _card.category === card.category
    );

    // extracting other card Boards and combining with currentBoard
    const otherBoards: cardProp[] | undefined = cards?.filter(
      (_card) => _card.category !== card.category
    );

    //validationg both arrays exist
    if (otherBoards === undefined || currentBoard === undefined) return;

    //updating card
    currentBoard[index].title = card.title;
    currentBoard[index].desp = card.desp;

    //*****************setting state ***************

    setCards([...otherBoards, ...currentBoard]); // set state
  };

  // deletes card - this method is dispatch when user clicks
  // the X button in card and on the alert confirms they want
  // to delete the card
  const deleteCard = (category: string, index: number): void => {
    //filtering out and extract board where card is located
    const currentBoard: cardProp[] | undefined = cards?.filter(
      (_card) => _card.category === category
    );

    // extracting other card Boards and combining with currentBoard
    const otherBoards: cardProp[] | undefined = cards?.filter(
      (_card) => _card.category !== category
    );

    //validating both arrays exist
    if (otherBoards === undefined || currentBoard === undefined) return;

    // deleting card from currentBoard @ index
    currentBoard.splice(index, 1);

    //*****************setting state ***************
    setCards([...otherBoards, ...currentBoard]); // set state
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

  // SAVE TO LOCAL STORAGE
  // when card state is updated saving cards to localStorage
  useEffect(() => {
    // console.log('saving cards to local storage');
    // console.log(`cards:${JSON.stringify(cards)}`);
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  // RETURNING GLOBAL CONTEXT
  if (!cards) {
    return (
      <GlobalContext.Provider
        value={{
          cardItems,
          addCard,
          deleteCard,
          editCard,
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
          addCard,
          deleteCard,
          editCard,
          moveCard,
          setDragPosition,
        }}>
        {children}
      </GlobalContext.Provider>
    );
  }
};
