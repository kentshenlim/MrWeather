import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import ForecastTable from '../components/ForecastTable';

const mockDataHourly = [
  ['1000', 23],
  ['1300', 25],
  ['1600', 26],
  ['1900', 23],
  ['2200', 22],
  ['0100', 21],
  ['0400', 19],
  ['0700', 20],
];

const mockDataDaily = [
  ['mon', 23],
  ['tue', 23],
  ['wed', 23],
  ['thu', 23],
  ['fri', 23],
  ['sat', 23],
  ['sun', 23],
];

it('Rows and columns must be consistent with data passed as prop', () => {
  render(<ForecastTable timeTempData={mockDataHourly} />);

  const table = screen.getByRole('table').firstChild;
  expect(table.children.length).toBe(2);
  expect(table.firstChild.children.length).toBe(mockDataHourly.length);
  expect(table.lastChild.children.length).toBe(mockDataHourly.length);
});

describe('Data entry must be consistent with input prop', () => {
  it('Hourly weather condition', () => {
    render(<ForecastTable timeTempData={mockDataHourly} />);

    const table = screen.getByRole('table').firstChild;
    const timeArr = table.firstChild.children;
    const tempArr = table.lastChild.children;
    for (let i = 0; i < timeArr.length; i += 1) {
      expect(timeArr[i].textContent).toBe(mockDataHourly[i][0]);
      expect(tempArr[i].textContent).toBe(mockDataHourly[i][1] + '');
    }
  });

  it('Daily weather condition', () => {
    render(<ForecastTable timeTempData={mockDataDaily} />);

    const table = screen.getByRole('table').firstChild;
    const timeArr = table.firstChild.children;
    const tempArr = table.lastChild.children;
    for (let i = 0; i < timeArr.length; i += 1) {
      expect(timeArr[i].textContent).toBe(mockDataDaily[i][0]);
      expect(tempArr[i].textContent).toBe(mockDataDaily[i][1] + '');
    }
  });
});
