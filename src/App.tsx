import { DragEvent, useRef, useState } from 'react';
import { Grid, Container } from '@mui/material';
import TaskBoard from './components/TaskBoard';
// importing sample data
import { tasks } from './lib/todoData';
// import interfaces
import { Position, DragVector, taskProp } from './lib/interfaces';

const App: React.FC = () => {
  // managing state with useState
  // taskItems holds an array of all tasks on on trello boards
  // the interface for 1 task item is
  /*   export interface taskProp {
    category: string;
    title: string;
    desp: string;
  }
 */
  // category is the name of the TaskBoard the item will go on
  // title is the title of the task and desp is the description
  const [taskItems, setTaskItems] = useState<taskProp[] | undefined>([
    ...tasks,
  ]);
  // setting up useRef to starting and current position
  // of a card while it's being dragged
  const dragCoordinates = useRef<DragVector | null>(null);

  // adds a new task (card) provided by user form input
  // this function will be passed as a prop to TaskBoard component
  // it will then be called by handleClick function
  const addTask = (task: taskProp): void => {
    // validating that input was provided and taskItems
    // is defined
    if (taskItems === undefined) return;

    //adding in new task
    setTaskItems([...taskItems, task]);
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
      taskItems === undefined
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
    const startBoard: taskProp[] | undefined = taskItems?.filter(
      (task) => task.category === startCategory
    );
    if (startBoard === undefined) return; //quick validation check

    // obtaining card we're going to move from starBoard
    const cardToMove: taskProp = startBoard[startIndex];

    // removing card from starting drag position
    startBoard.splice(startIndex, 1);

    // if starting category and final category are the same then
    // card was just moved into a different position on the same board
    if (startCategory === finalCategory) {
      //inserting dragged item in new position
      startBoard.splice(finalIndex, 0, cardToMove);

      //*****************setting state ***************
      // extracting other card Boards and combining with startBoard
      const otherBoards: taskProp[] | undefined = taskItems?.filter(
        (task) => task.category !== startCategory
      );
      setTaskItems([...otherBoards, ...startBoard]); // set state
    } else {
      // start category and final category are different
      //here we are moving cards from 1 Board to Another

      //determine final board
      const finalBoard: taskProp[] | undefined = taskItems?.filter(
        (task) => task.category === finalCategory
      );

      //updating category on cardToMove to match finalCategory
      cardToMove.category = finalCategory;

      //inserting dragged item in new position on NEW Board
      finalBoard.splice(finalIndex, 0, cardToMove);

      //*****************setting state ***************
      // extracting other card Boards and combining with startBoard
      const otherBoards: taskProp[] | undefined = taskItems?.filter(
        (task) =>
          task.category !== startCategory && task.category !== finalCategory
      );
      setTaskItems([...otherBoards, ...startBoard, ...finalBoard]); // set state
    }
  };

  return (
    <Container sx={{ p: 2 }} maxWidth='lg'>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='flex-start'
        spacing={2}>
        {/* Creating Grid with 3 main Trello Boards */}
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard
            tasks={taskItems}
            addTask={addTask}
            setDragPosition={setDragPosition}
            moveCard={moveCard}
            category='TO DO'
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard
            tasks={taskItems}
            addTask={addTask}
            setDragPosition={setDragPosition}
            moveCard={moveCard}
            category='IN PROGRESS'
          />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <TaskBoard
            tasks={taskItems}
            addTask={addTask}
            setDragPosition={setDragPosition}
            moveCard={moveCard}
            category='DONE'
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
