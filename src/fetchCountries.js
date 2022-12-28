import Notiflix from 'notiflix';

export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then(response => {
        // console.log('response :>> ', response);
        if (response.ok) return response.json();
        throw new Error(response.status)
    })
}