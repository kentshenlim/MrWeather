import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppTitle from '../components/AppTitle';

it('Title is MrWeather, icon image must be present', () => {
  render(<AppTitle />);

  expect(
    screen.getByRole('heading', { name: /mrweather/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: /mrweather icon/i })
  ).toBeInTheDocument();
});

it('Img should be bounded by anchor tag, href is GitHub repo link', () => {
  render(<AppTitle />);

  const anchor = screen.getByRole('link', { name: /mrweather icon/i });
  expect(anchor).toBeInTheDocument();
  expect(anchor).toContainElement(
    screen.getByRole('img', { name: /mrweather icon/i })
  );
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
