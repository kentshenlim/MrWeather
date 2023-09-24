import { it, expect, vi, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import Dashboard from '../components/Dashboard';

beforeEach(() => {
  vi.mock('../components/Plate', () => {
    return {
      default: () => <div>Test</div>,
    };
  });
});

it('Have four children', () => {
  const mockFn = vi.fn();
  render(<Dashboard dataObj={{}} isTempC={true} setIsTempC={mockFn} />);

  expect(screen.getByTestId('dashboard-wrapper').children.length).toBe(4);
  expect(screen.getAllByText(/test/i).length).toBe(4);
});
