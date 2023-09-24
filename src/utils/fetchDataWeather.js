import format from "date-fns/format";

async function fetchDataWeather(validLocation) {
    const base_url = 'https://api.weatherapi.com/v1/forecast.json';
    // const key = import.meta.env.VITE_WEATHER_API_KEY;
    const key = "806b03d5d46741248aa123547232109" // This API is free
    const url = base_url + '?' + 'key=' + key + `&q=${validLocation}&days=3`;
    const res = await fetch(url);
    const goodRes = await res.json();
    return goodRes;
}

function processData(goodRes, {hourGap = 1, hourDataCount = 8, dayCount = 3}) {
    // Trim away data not of interest
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
    for (let i = 0; i < hourDataCount; i++) {
        if (currentHour >= 24) {
            currentHour -= 24;
            currentDay += 1;
        }
        const data = forecastDay[currentDay].hour[currentHour];
        hourlyForecastArrFinal.push([currentHour, data.condition.icon, data.condition.text]);
        currentHour += hourGap; // Hour gap
    }

    // Process the time display
    for (let i = 0; i < hourlyForecastArrFinal.length; i++) {
        if (i === 0) {
            const hour = hourlyForecastArrFinal[0][0];
            if (hour < 12) {
                if (hour === 0) hourlyForecastArrFinal[0][0] = 12;
                hourlyForecastArrFinal[0][0] += "AM";
            }
            else {
                if (hour > 12) hourlyForecastArrFinal[0][0] -= 12;
                hourlyForecastArrFinal[0][0] += "PM";
            }
            continue;
        }
        const hour = hourlyForecastArrFinal[i][0];
        if (hour === 0) hourlyForecastArrFinal[i][0] = "12AM";
        else if (hour === 12) hourlyForecastArrFinal[i][0] += "PM";
        else if (hour > 12) hourlyForecastArrFinal[i][0] -= 12; 
    }

    const dailyForecastArrFinal = [];
    for (let i = 0; i < Math.min(dayCount, forecastDay.length); i++) {
        const dateObj = new Date(forecastDay[i].date);
        const day = format(dateObj, 'EEE').toUpperCase();
        dailyForecastArrFinal.push([
            day,
            forecastDay[i].day.condition.icon,
            forecastDay[i].day.condition.text
        ]);
    }


    return {
        dateObj: dateObj,
        location: locationFinal,
        date: dateFinal,
        time: timeFinal,
        feelsLikeObj: feelsLikeObjFinal,
        dashboardObj: dashboardObjFinal,
        hourlyForecastArr: hourlyForecastArrFinal,
        dailyForecastArr: dailyForecastArrFinal
    };
}

export default fetchDataWeather;
export { processData };