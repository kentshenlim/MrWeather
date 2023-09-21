import format from "date-fns/format";

async function fetchDataWeather(validLocation) {
    const base_url = 'http://api.weatherapi.com/v1/forecast.json';
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = base_url + '?' + 'key=' + key + `&q=${validLocation}&days=3`;
    const res = await fetch(url);
    const goodRes = await res.json();
    return goodRes;
}

function processData(goodRes) {
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
    }

    const dashboardObjFinal = {
        tempC: current.temp_c,
        tempF: current.temp_f,
        humidity: current.humidity,
        windKPH: current.wind_kph,
        windMPH: current.wind_mph,
        cloud: current.cloud,
    }
    


    console.log({locationFinal, dateFinal, timeFinal})
    return {
        location: locationFinal,
        date: dateFinal,
        time: timeFinal,
        feelsLikeObj: feelsLikeObjFinal,
        dashboardObj: dashboardObjFinal
    };
}

export default fetchDataWeather;
export { processData };