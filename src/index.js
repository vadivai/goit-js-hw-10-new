import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import './css/styles.css';
import {fetchCountries} from './fetchCountries';

// какая правильная последовательность - сначала библиотеки, а потом css, js файлы проекта?

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
// const countryInfo = document.querySelector('country-info');
// console.log(countryList, countryInfo); // анализ того, что в консоли

inputSearch.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));
// обработчик вешаем в конце после функций?

function onInputCountry(event) {
    event.preventDefault();
    const inputCountryValue = event.target.value.trim();

    if (inputCountryValue === '') {
        return
    }

// ошибку 404 обработали в fetchCountries?
    fetchCountries(inputCountryValue)
        .then(data => responseAPI(data))
        .catch(() => Notiflix.Notify.failure("Oops, there is no country with that name"));
        //.catch((error) =>console.log('error :>> ', error))
}

function responseAPI(data) {
    if (data.length > 10) {
        Notiflix.Notify.warning("Too many matches found. Please enter a more specific name");
        return;
    }
    else if (data.length >= 2 && data.length <= 10) {
        countryList.innerHTML =''
        const countryCards = countriesListCreate(data);
        // showCountries(countryCards);
    }
    else if (data.length === 1) {
        countryList.innerHTML = ''
        const countryCard = countryCardCreate(...data); //data[0]
        // showCountry(countryCard);
    }
}

function countryCardCreate ({name, capital, population, flags, languages }) {
    //    console.log('flags :>> ', flags);
        // console.log("data=", data);
    // console.log(languages);
    const languageArray = [];
    for (const key in languages) {
        languageArray.push(languages[key]);
    }
        // classlist.add('');    
    const countryCard = `<li class='country-list'> 
        <img src="${flags.svg}" widht=60 height=40>
        <span>${name.common} </span>
        <span>Capital: ${capital} </span>
        <span>Population: ${population} </span>
        <span>Languages: ${languageArray} </span>
        </li>`
    showCountry(countryCard);
    }

function countriesListCreate(data) {
        const countryListValues = data.map(({name: {common}, flags: {svg}}) => {
            // console.log(name);
            return `<li><img src="${svg}" widht=60 height=20 </li>
            <span>${common}</span>`
        }).join('');
    // 
        //${name.toString()}
        // как чтобы не переносился спан на новую строку?
        showCountries(countryListValues);
    }

    //countries или country?
    function showCountries(countriesString) {
    // через стили класса, добавляем класс элементам countryList
        countryList.insertAdjacentHTML('afterbegin', countriesString);
    }

    function showCountry(countryString) {
    // через стили класса, добавляем класс элементам countryList
        countryList.insertAdjacentHTML('afterbegin', countryString);
    }


    // switch (data.length) {
//   case data.length > 10:
//     Notiflix.Notify.warning("Too many matches found. Please enter a more specific name");
//     break;

//   case 1:
//     countryList.innerHTML = '';
//     // console.log('data[0] :>> ', data[0]);
//     const countryCard = countryCardCreate(data[0]);
//     showCountry(countryCard);
//     break;
    
// // case >= 2 && <= 10
//   default:   //data.length >= 2 && data.length <= 10
//     countryList.innerHTML = '';     
//     const countryCards = countryListCreate(data);

// style="display: flex; flex-direction: column; align-items: flex-start"npm i notiflix
//     showCountry(countryCards);
//     }   
// }