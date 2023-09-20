import App from '../App';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

describe('Test test', () => {
  it('First test', () => {
    expect(1).toBe(1);
  });
  it('Second test', () => {
    expect(1).not.toBe(2);
  });
  it('Third test', () => {
    expect(1 + 1).toBe(2);
  });
});
