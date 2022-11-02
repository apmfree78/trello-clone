import { render, screen } from '@testing-library/react';
import Cards from '../Cards';
import { CardState } from '../../state/cardSlice';
import user from '@testing-library/user-event';

jest.mock('nanoid', () => 'abc123');
jest.mock('react-redux', () => ({
  useDispatch: () => {
    return null;
  },
  useSelector: () => {
    return {
      cards: [
        { id: '1', category: 'TO DO', title: 'Yoga', desp: 'Go to Yoga' },
        { id: '2', category: 'TO DO', title: 'Gym', desp: 'Go to Gym' },
        { id: '3', category: 'TO DO', title: 'Read', desp: 'Read a Book' },
        {
          id: '4',
          category: 'TO DO',
          title: 'Get Gas for Car',
          desp: 'Get Gas for Car',
        },
        {
          id: '5',
          category: 'TO DO',
          title: 'Go for Walk',
          desp: 'Go for Walk',
        },
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
        {
          id: '12',
          category: 'DONE',
          title: 'Feed Cats',
          desp: 'Feed Cats at 9pm',
        },
      ],
    };
  },
}));

test('list items are present', () => {
  render(<Cards category='TO DO' />);
  const listItem = screen.getByText(/Yoga/i);
  expect(listItem).toBeInTheDocument();
});

test('edit modal appears present when pencil icon is clicked', async () => {
  render(<Cards category='TO DO' />);
  const pencilIconForYoga = screen.getByTestId(/yoga edit/i);
  //click pencil icon
  await user.click(pencilIconForYoga);
  // check that headline for modal appears
  const modalHeader = screen.getByRole('heading', { name: /edit card/i });
  expect(modalHeader).toBeInTheDocument();
});

test('edit modal title input appears present when pencil icon is clicked', async () => {
  render(<Cards category='TO DO' />);
  const pencilIconForYoga = screen.getByTestId(/yoga edit/i);
  //click pencil icon
  await user.click(pencilIconForYoga);

  // check that title appears
  const title = screen.getByRole('textbox', { name: /title/i });
  expect(title).toBeInTheDocument();
});

test('edit modal description input appears present when pencil icon is clicked', async () => {
  render(<Cards category='TO DO' />);
  const pencilIconForYoga = screen.getByTestId(/yoga edit/i);
  //click pencil icon
  await user.click(pencilIconForYoga);

  // check that description appears
  const description = screen.getByRole('textbox', { name: /description/i });
  expect(description).toBeInTheDocument();
});

test('edit modal save button appears present when pencil icon is clicked', async () => {
  render(<Cards category='TO DO' />);
  const pencilIconForYoga = screen.getByTestId(/yoga edit/i);
  //click pencil icon
  await user.click(pencilIconForYoga);

  // check that button appears
  const saveButton = screen.getByRole('button', { name: /save changes/i });
  expect(saveButton).toBeInTheDocument();
});

test('list items are present', () => {
  render(<Cards category='TO DO' />);
  const listItem = screen.getByText(/Get Gas for Car/i);
  expect(listItem).toBeInTheDocument();
});

test('list items are present', () => {
  render(<Cards category='TO DO' />);
  const listItem = screen.getByText(/Go for Walk/i);
  expect(listItem).toBeInTheDocument();
});

test('list items are present', () => {
  render(<Cards category='IN PROGRESS' />);
  const listItem = screen.getByText(/code/i);
  expect(listItem).toBeInTheDocument();
});

test('list items are present', async () => {
  render(<Cards category='DONE' />);
  const listItem = await screen.findByText(/Dinner/i);
  expect(listItem).toBeInTheDocument();
});

test('correct # of items in DONE board', () => {
  render(<Cards category='DONE' />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toEqual(3);
});

test('correct # of items in IN PROGRESS board', () => {
  render(<Cards category='IN PROGRESS' />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems.length).toEqual(3);
});

test('correct # of items in TO DO board', () => {
  render(<Cards category='TO DO' />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(6);
});
