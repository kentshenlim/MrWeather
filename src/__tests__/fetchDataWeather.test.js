import fetchDataWeather, {processData} from "../utils/fetchDataWeather";
import { beforeAll, afterEach, afterAll, it, expect, describe } from "vitest";
import exampleResponse from "./exampleResponse";
// polyfill setup
import 'whatwg-fetch';
// MSW setup
import {rest} from 'msw';
import {setupServer} from 'msw/node';
const server = setupServer(
  rest.get('http://api.weatherapi.com/v1/forecast.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(exampleResponse)
    );
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Start testing
describe('Must return output of required form compatible with App.jsx', () => {
  it('Overall output', async () => {
    const res = await fetchDataWeather('london');
    const processedRes = processData(res, {});
    const propertyList = [
      "dateObj",
      "location",
      "date",
      "time",
      "feelsLikeObj",
      "dashboardObj",
      "hourlyForecastArr",
      "dailyForecastArr"
    ];
    for (const key of propertyList) {
      expect(processedRes).toHaveProperty(key);
    }
    expect(Object.keys(processedRes).length).toBe(propertyList.length);
  })

  it('feelsLikeObjFinal', async () => {
    const res = await fetchDataWeather('london');
    const processedRes = processData(res, {}).feelsLikeObj;
    const propertyList = [
      'tempC',
      'tempF',
      'text',
      'iconURL',
    ];
    for (const key of propertyList) {
      expect(processedRes).toHaveProperty(key);
    }
    expect(Object.keys(processedRes).length).toBe(propertyList.length);
  })

  it('feelsLikeObjFinal', async () => {
    const res = await fetchDataWeather('london');
    const processedRes = processData(res, {}).dashboardObj;
    const propertyList = ['tempC', 'tempF', 'humidity', 'windKPH', 'windMPH', 'cloud']; 
    for (const key of propertyList) {
      expect(processedRes).toHaveProperty(key);
    }
    expect(Object.keys(processedRes).length).toBe(propertyList.length);
  });
})

it('hourDataCount will control hours output', async () => {
  const res = await fetchDataWeather('london');
  for (let hour = 1; hour <= 20; hour++) {
    const processedRes = processData(res, { hourDataCount: hour });
    expect(processedRes.hourlyForecastArr.length).toBe(hour);
  }
})

it('dayCount will control day output', async () => {
  const res = await fetchDataWeather('london');
  for (let day = 1; day <= 3; day++) {
    const processedRes = processData(res, {dayCount: day});
    expect(processedRes.dailyForecastArr.length).toBe(day);
  }
});