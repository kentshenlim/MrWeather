import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';

it('Props check', () => {
  vi.mock('../components/SearchBar', () => {
    return {
      default: () => <div>Mock Search Bar</div>,
    };
  });
  const mockFn = vi.fn();

  render(
    <Navbar
      location="London"
      setLocation={mockFn}
      dateStr="11 January 2011"
      timeStr="12:50pm"
      locationStatus="idle"
      setLocationStatus={mockFn}
    />
  );

  expect(screen.getByRole('heading', { name: /london/i })).toBeInTheDocument();
  expect(screen.getByText(/11 january 2011/i)).toBeInTheDocument();
  expect(screen.getByText(/12:50pm/i)).toBeInTheDocument();
  expect(screen.getByText(/mock search bar/i)).toBeInTheDocument();
});
