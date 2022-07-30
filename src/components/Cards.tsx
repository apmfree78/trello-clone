import Paper from '@mui/material/Paper';
import { useState, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { cardProp } from '../lib/interfaces';
import { styled } from '@mui/material/styles';
import CardModal from './CardModal';
import { GlobalContext } from '../context/GlobalContext';
import CardEditForm from './CardEditForm';
interface Props {
  category: string;
}

//design for main task item
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  paddingLeft: 8,
  paddingTop: 8,
  paddingBottom: 1,
  color: theme.palette.text.secondary,
  height: 'auto',
  // lineHeight: '40px',
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
const Cards: React.FC<Props> = ({ category }) => {
  // set modal open / close state
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  // importing cards, setDragPosition which tracks movment of
  // card when its dragged and , moveCard, which executes the move
  const { cards, setDragPosition, moveCard } = useContext(GlobalContext);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);

  // function to set state for card modal which
  // allows user to edit card title and details
  // also delete card
  const showCardDetails = (index: number) => {
    //set card to display
    setCurrentCardIndex(index);

    // open modal
    setModalOpen(true);
  };

  //filtering out relevant tasks for this Board by category
  const relevantTasks: cardProp[] | undefined = cards?.filter(
    (card: cardProp) => card.category === category
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
            message={`Edit ${relevantTasks[currentCardIndex || 0].title} Card`}>
            <CardEditForm
              category={category}
              index={currentCardIndex || 0}
              title={relevantTasks[currentCardIndex || 0].title}
              description={relevantTasks[currentCardIndex || 0].desp}
            />
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
            <span>
              <EditIcon
                onClick={() => showCardDetails(i)}
                color='action'
                sx={{ fontSize: 17, paddingBottom: 1 }}
              />
              <CloseIcon
                onClick={() => showCardDetails(i)}
                color='action'
                sx={{ fontSize: 17, paddingRight: 1, paddingBottom: 1 }}
              />
            </span>
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
