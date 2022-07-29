import Paper from '@mui/material/Paper';
import { DragEvent } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { taskProp, Position } from '../lib/interfaces';
import { styled } from '@mui/material/styles';

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
  //filtering out relevant tasks for this Board by category
  const relevantTasks: taskProp[] | undefined = tasks?.filter(
    (task) => task.category === category
  );

  // check if board has any elements
  if (relevantTasks?.length) {
    return (
      <>
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
            <EditIcon color='action' sx={{ fontSize: 17, p: 1 }} />
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
