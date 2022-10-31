import { render, screen } from '@testing-library/react';
import App from './App';

test('headline element on app', () => {
  render(<App />);
  const headline = screen.getByRole('heading');
  expect(headline).toBeInTheDocument();
});

test('correct headline on app', () => {
  render(<App />);
  const headline = screen.getByRole('heading');
  expect(headline).toHaveTextContent('Productivity App');
});
