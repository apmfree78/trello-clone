import React, { createContext, useRef } from 'react';
import { Position, DragVector } from '../lib/interfaces';
// importing sample data

interface Props {
  children?: React.ReactNode;
}

/*
  setDragPosition tracks the current position of a card that is
  being tragged and saved it into a ref called dragCoordinates

*/

export const GlobalContext: React.Context<any> = createContext('');

export const GlobalProvider: React.FC<Props> = ({ children }) => {
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
  // RETURNING GLOBAL CONTEXT
  return (
    <GlobalContext.Provider
      value={{
        setDragPosition,
        dragCoordinates,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
