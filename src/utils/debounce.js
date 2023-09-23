export default function debounce(fn, delay) {
    let timeId;
    return function(...args) {
        clearTimeout(timeId);
        timeId = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}