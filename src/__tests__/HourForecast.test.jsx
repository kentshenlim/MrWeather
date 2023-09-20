import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import HourForecast from '../components/HourForecast';

const mockData = [
  ['1000', 23],
  ['1300', 25],
  ['1600', 26],
  ['1900', 23],
  ['2200', 22],
  ['0100', 21],
  ['0400', 19],
  ['0700', 20],
];

it('Rows and columns must be consistent with data passed as prop', () => {
  render(<HourForecast timeTempData={mockData} />);

  const table = screen.getByRole('table');
  expect(table.children.length).toBe(2);
  expect(table.firstChild.children.length).toBe(mockData.length);
  expect(table.lastChild.children.length).toBe(mockData.length);
});

it('Data entry must be consistent with input prop', () => {
  render(<HourForecast timeTempData={mockData} />);

  const table = screen.getByRole('table');
  const timeArr = table.firstChild.children;
  const tempArr = table.lastChild.children;
  for (let i = 0; i < timeArr.length; i += 1) {
    expect(timeArr[i].textContent).toBe(mockData[i][0]);
    expect(tempArr[i].textContent).toBe(mockData[i][1]);
  }
});
