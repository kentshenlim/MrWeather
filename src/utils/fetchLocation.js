async function fetchLocation(text) {
  const base_url = 'https://api.weatherapi.com/v1/search.json';
//   const key = import.meta.env.VITE_WEATHER_API_KEY;
  const key = '806b03d5d46741248aa123547232109'; // This API is free
  const url = base_url + '?' + 'key=' + key + `&q=${text}`;
  const res = await fetch(url);
  const goodRes = await res.json();
  return goodRes;
}

export default fetchLocation