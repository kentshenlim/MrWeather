import { describe, it, expect } from 'vitest';
import AppTitle from '../components/AppTitle';
import { render, screen } from '@testing-library/react';

describe('Title and icon image', () => {
  it('Title is MrWeather, icon image must be present', () => {
    render(<AppTitle />);
    expect(
      screen.getByRole('heading', { name: /mrweather/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /mrweather icon/i })
    ).toBeInTheDocument();
  });
});

describe('href of img', () => {
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
});

describe('Snapshot test', () => {
  it('Match snapshot', () => {
    const { container } = render(<AppTitle />);
    expect(container).toMatchSnapshot();
  });
});
