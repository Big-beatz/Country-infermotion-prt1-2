import axios from "axios";

//Test of er goed gekoppelt is
console.log("Ik doe het")

//2. Maak een anker om de informatie kwijt te kunnen
const errorMessage = document.getElementById("errorMessage")
const searchResult = document.getElementById("searchResult")
const searchBar = document.getElementById("searchBar")
const searchCountry = document.getElementById("searchCountry")

function sendData(event){
    event.preventDefault()
    fetchOneCountry(searchBar.value)
    searchBar.value = ""
}

searchCountry.addEventListener("submit", sendData)

// currency, language

async function fetchOneCountry(name) {
    // zorg ervoor dat er iedere keer bij een nieuwe zoekopdracht het (mogelijke) oude resultaat word verwijderd
    searchResult.innerHTML = ""
    errorMessage.innerHTML = ""

    try {
        //1. Haal de informatie per land op via de REST countries API (begin met 1 land om te testen)
        const oneCountry = await axios.get(`https://restcountries.com/v2/name/${name}`)
        //destructure for future reference
        const {name: countryName, capital, subregion, population, flag, currencies, languages} = oneCountry.data[0]
        console.log(countryName)
        // const {name: currencyName} = oneCountry.data[0].currencies[0]
        // const {name: language} = oneCountry.data[0].languages[0]

        // console.log(oneCountry)

        //3. Schrijf code die de benodigde informatie ophaalt
        //4. Schrijf deze code om zodat de informatie op de zoekpagina.html word geïmplementeerd

            if(oneCountry.data[0].currencies.length === 1) {
                searchResult.innerHTML = `<span id="bigName"><img src="${flag}" alt="Flag" id="countryFlag">
                                  ${countryName}</span>
                                  <p>${countryName} is situated in ${subregion}. It has a population of ${population} people.</p>
                                  <p>The capital is ${capital} and you can pay with ${currencies[0].name}'s</p>`
            } else if(oneCountry.data[0].currencies.length > 1){
                searchResult.innerHTML = `<span id="bigName"><img src="${flag}" alt="Flag" id="countryFlag">${countryName}</span>
                                  <p>${countryName} is situated in ${subregion}. It has a population of ${population} people.</p>
                                  <p>The capital is ${capital} and you can pay with ${currencies[0].name}'s and ${currencies[1].name}'s</p>`
            }



    } catch (e) {
        console.error(e)
        console.log(e.response)
       errorMessage.innerHTML = `<p class="errorMessage">${name} doesn't exist. Please try again.</p>`
    }
}



//5. Schrijf een if else statement of er sprake is van 1 of meerdere valuta's.
// Maak een anker voor de zoekbalk

// zet eventlisteners op die aflezen wat de gebruiker invoert
// zorg dat de juiste informatie teruggegeven word