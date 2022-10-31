import { render, screen } from '@testing-library/react';
import TaskBoard from '../TaskBoard';

test('Board element is present', () => {
  render(<TaskBoard category='TO DO' />);
  const boardElement = screen.getByTestId('board');
  expect(boardElement).toBeInTheDocument();
});

test('add button element is present', () => {
  render(<TaskBoard category='TO DO' />);
  const boardElement = screen.getByRole('button', {
    name: '+ Add a card',
  });
  expect(boardElement).toBeInTheDocument();
});
