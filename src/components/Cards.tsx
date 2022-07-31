/* eslint-disable no-restricted-globals */
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

//design for each card element
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  paddingLeft: 8,
  paddingTop: 8,
  paddingBottom: 1,
  color: theme.palette.text.secondary,
  height: 'auto',
  '&:active': {
    backgroundColor: '#77be77',
  },
}));

// ItemHidden is present when there are no active
// cards are board, this allows user to drag new
// cards to this board
const ItemHidden = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  paddingLeft: 8,
  backgroundColor: 'gray',
  height: 20,
  lineHeight: '1.25em',
}));

// display all cards for a given trello board (list)
const Cards: React.FC<Props> = ({ category }) => {
  // set modal open / close state, if true, modal popup will show
  // if false modal popup will remain hidden
  const [modelOpen, setModalOpen] = useState<boolean>(false);

  // IMPORT FROM GLOBAL CONTEXT
  // importing cards, setDragPosition which tracks movment of
  // card when its dragged , moveCard, which executes the move,
  // deleteCard which delete the card
  const { cards, setDragPosition, moveCard, deleteCard } =
    useContext(GlobalContext);

  // getting current card index, need this for Card Modal
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

  // dispatches deleting of card at index (of category)
  // to deleteCard global context method
  const handleDelete = (index: number) => {
    if (confirm('Are you sure want to delete this card?')) {
      deleteCard(category, index);
    }
  };

  //filtering out relevant cards for this Board by category
  const relevantCards: cardProp[] | undefined = cards?.filter(
    (card: cardProp) => card.category === category
  );

  // check if board has any elements
  if (relevantCards?.length) {
    return (
      <>
        {/* display modal popup to edit card if modalOpen === true  */}
        {modelOpen && (
          <CardModal
            open={modelOpen}
            setOpen={setModalOpen}
            message={`Edit Card`}>
            {/* CardEditForm is passed a child to CardModal and then
              displayed in the Modal */}
            <CardEditForm
              category={category}
              index={currentCardIndex || 0}
              title={relevantCards[currentCardIndex || 0].title}
              description={relevantCards[currentCardIndex || 0].desp}
            />
          </CardModal>
        )}
        {/* show all cards for this category by mapping through revelantCards */}
        {relevantCards.map((card, i) => (
          <Item
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'black',
            }}
            // tracking the dragging of the card and if another card is being dragged above it
            onDragEnter={() =>
              setDragPosition({ category, index: i }, 'current')
            }
            onDragStart={() => setDragPosition({ category, index: i }, 'start')}
            onDragEnd={moveCard}
            key={i}
            elevation={8}
            draggable>
            {card.title}
            {/* pencil icon to show modal popup that allows user to edit and delete card */}
            <span>
              <EditIcon
                onClick={() => showCardDetails(i)}
                color='action'
                sx={{ fontSize: 17, paddingBottom: 1 }}
              />
              {/* user can click this X icon to delete a card */}
              <CloseIcon
                onClick={() => handleDelete(i)}
                color='action'
                sx={{ fontSize: 17, paddingRight: 1, paddingBottom: 1 }}
              />
            </span>
          </Item>
        ))}
      </>
    );
  } else {
    //return default hidden element that allows user to drag card to empty board
    return (
      <ItemHidden
        onDragEnter={() => setDragPosition({ category, index: 0 }, 'current')}
        onDragEnd={moveCard}
        key={0}
        elevation={8}
        draggable>
        This list is lonely! 😔
      </ItemHidden>
    );
  }
};

export default Cards;
