import Paper from '@mui/material/Paper';
import { DragEvent, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { taskProp, Position } from '../lib/interfaces';
import { styled } from '@mui/material/styles';
import CardModal from './CardModal';

interface Props {
  category: string;
  tasks: taskProp[] | undefined;
  setDragPosition: (position: Position, type: string) => void;
  moveCard: (event: DragEvent) => void;
}

//design for main task item
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  paddingLeft: 8,
  color: theme.palette.text.secondary,
  height: 40,
  lineHeight: '40px',
}));

// this item is present when there are no active
// cards are board, this allows user to drag new
// cards to this board
const ItemHidden = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  paddingLeft: 8,
  backgroundColor: 'gray',
  height: 20,
  lineHeight: '20px',
}));

// display all cards for a given trello board (list)
const Cards: React.FC<Props> = ({
  category,
  tasks,
  setDragPosition,
  moveCard,
}) => {
  // set modal open / close state
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const [displayCardDetails, setDisplayCardDetails] = useState<number | null>(
    null
  );

  // function to set state for card modal which
  // allows user to edit card title and details
  // also delete card
  const showCardDetails = (cardIndex: number) => {
    //set card to display
    setDisplayCardDetails(cardIndex);

    // open modal
    setModalOpen(true);
  };

  //filtering out relevant tasks for this Board by category
  const relevantTasks: taskProp[] | undefined = tasks?.filter(
    (task) => task.category === category
  );

  // check if board has any elements
  if (relevantTasks?.length) {
    return (
      <>
        {/* display settings modal to change Reminder Settings  */}
        {modelOpen && (
          <CardModal
            open={modelOpen}
            setOpen={setModalOpen}
            message={`Edit ${
              relevantTasks[displayCardDetails || 0].title
            } Card`}>
            <h2>Testing</h2>
          </CardModal>
        )}
        {relevantTasks.map((task, i) => (
          <Item
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            onDragEnter={() =>
              setDragPosition({ category, index: i }, 'current')
            }
            onDragStart={() => setDragPosition({ category, index: i }, 'start')}
            onDragEnd={moveCard}
            key={i}
            elevation={8}
            draggable>
            {task.title}
            {/* pencil icon to show modal popup that allows user to edit and delete card */}
            <EditIcon
              onClick={() => showCardDetails(i)}
              color='action'
              sx={{ fontSize: 17, p: 1 }}
            />
          </Item>
        ))}
      </>
    );
  } else {
    //return hidden element
    return (
      <ItemHidden
        onDragEnter={() => setDragPosition({ category, index: 0 }, 'current')}
        onDragEnd={moveCard}
        key={0}
        elevation={8}
        draggable>
        This list is empty and all alone!
      </ItemHidden>
    );
  }
};

export default Cards;
