import { it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

it('Contain an input and a button', () => {
  render(<SearchBar />);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});
