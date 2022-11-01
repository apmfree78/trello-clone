import { render, screen } from '@testing-library/react';
import Cards from '../Cards';
import { CardState } from '../../state/cardSlice';

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
