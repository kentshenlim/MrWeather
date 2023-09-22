import format from "date-fns/format";

async function fetchDataWeather(validLocation) {
    const base_url = 'http://api.weatherapi.com/v1/forecast.json';
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = base_url + '?' + 'key=' + key + `&q=${validLocation}&days=3`;
    const res = await fetch(url);
    const goodRes = await res.json();
    return goodRes;
}

function processData(goodRes, {hourGap = 1}) {
    // Trim away data not of interest
    console.log(goodRes);
    const locationFinal = goodRes.location.name;

    const dateObj = new Date(goodRes.location.localtime);
    const dateFinal = format(dateObj, 'dd MMM yyyy');
    const timeFinal = format(dateObj, 'h:mm aaa');

    const current = goodRes.current;
    const feelsLikeObjFinal = {
        tempC: Math.round(current.feelslike_c),
        tempF: Math.round(current.feelslike_f),
        text: current.condition.text,
        iconURL: current.condition.icon,
    };

    const dashboardObjFinal = {
        tempC: current.temp_c,
        tempF: current.temp_f,
        humidity: current.humidity,
        windKPH: current.wind_kph,
        windMPH: current.wind_mph,
        cloud: current.cloud,
    };

    const forecastDay = goodRes.forecast.forecastday; // Array of 3 days
    let currentHour = dateObj.getHours() + 1; // Next hour, numerically equal to index in data array
    let currentDay = 0; // Idx of day
    const hourlyForecastArrFinal = [];
    for (let i = 0; i < 8; i++) {
        if (currentHour >= 24) {
            currentHour -= 24;
            currentDay += 1;
        }
        const data = forecastDay[currentDay].hour[currentHour];
        hourlyForecastArrFinal.push([currentHour, data.condition.icon]);
        currentHour += hourGap; // Hour gap
    }

    return {
        location: locationFinal,
        date: dateFinal,
        time: timeFinal,
        feelsLikeObj: feelsLikeObjFinal,
        dashboardObj: dashboardObjFinal,
        hourlyForecastArr: hourlyForecastArrFinal
    };
}

export default fetchDataWeather;
export { processData };