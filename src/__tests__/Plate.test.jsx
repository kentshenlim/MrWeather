import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import Plate from '../components/Plate';

describe('Props check', () => {
  const testText = 'lorem ipsum';

  it('value props', () => {
    render(
      <Plate value={testText} style={{}}>
        <div></div>
      </Plate>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('style props', () => {
    const testStyle = {
      color: 'rgb(0, 128, 0)',
      backgroundColor: 'rgb(0, 128, 128)',
    };
    render(
      <Plate value={testText} style={testStyle}>
        <div></div>
      </Plate>
    );

    expect(screen.getByText(testText).parentNode).toHaveStyle(testStyle);
  });

  it('children props', () => {
    const child = <div>Check presence</div>;
    render(
      <Plate value={testText} style={{}}>
        {child}
      </Plate>
    );

    expect(screen.getByText(testText).parentNode).toContainElement(
      screen.getByText('Check presence')
    );
  });
});
