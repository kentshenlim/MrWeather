import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppTitle from '../components/AppTitle';

it('Title is MrWeather, icon image must be present', () => {
  render(<AppTitle locationStatus="idle" />);

  expect(
    screen.getByRole('heading', { name: /mrweather/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: /mrweather icon/i })
  ).toBeInTheDocument();
});

it('Title must have anchor leading to GitHub repo', () => {
  render(<AppTitle />);

  const anchor = screen.getByRole('link');
  expect(anchor).toBeInTheDocument();
  expect(anchor).toHaveAttribute(
    'href',
    expect.stringContaining('https://github.com')
  );
  expect(anchor).toHaveAttribute('target', '_blank');
});

it('Match snapshot', () => {
  const { container } = render(<AppTitle />);

  expect(container).toMatchSnapshot();
});
