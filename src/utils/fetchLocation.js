async function fetchLocation(text) {
    const base_url = 'http://api.weatherapi.com/v1/search.json';
    const key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = base_url + '?' + 'key=' + key + `&q=${text}`;
    const res = await fetch(url);
    const goodRes = await res.json();
    console.log(goodRes);
    return goodRes;
}

export default fetchLocation