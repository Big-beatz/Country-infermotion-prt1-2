import axios from 'axios';

console.log('Hallo daar!');

//GET request https://restcountries.com/v3.1/all

// 1. Installeer de dependency axios (npm install axios)
//2. Schrijf een asynchrone functie
// 3. Maken een GET request met axios (await)
// 4. Try / Catch blok om de errors af te vangen
// 5. Element in HTML maken, referentie opslaan vanuit de JS.
// 6. De Data injecteren (map-methode)
const countries = document.getElementById("countries")
const errorMessage = document.getElementById("error")

async function fetchCountries() {
    try {
        //het request maken
        const response = await axios.get('https://restcountries.com/v2/all')
        //test of de data binnenkomt
        // console.log(response)

        //sorteer de array op basis van populatie
        response.data.sort((a, b) => a.population - b.population)


        //schrijf een functie die voor elke regio een andere String teruggeeft.
        //Voeg deze functie toe aan de .map methode om de class te definieren.
        function setColourToCountryName(region) {
            switch (region) {
                case 'Africa':
                    return "blue-text"
                    break
                case 'Americas':
                  return "green-text"
                    break
                case 'Asia':
                    return "red-text"
                    break
                case 'Europe':
                    return "yellow-text"
                    break
                case 'Oceania':
                    return "purple-text"
                    break
                default:
                 return "orange-text"
            }
        }

        // roep alle namen landen met bijbehorende informatie op en push het geheel naar HTML
        const countriesToHTML = response.data.map((countryToHTML) => {
            return `<li> <img class="flag" src="${countryToHTML.flags.png}" alt="Flag">
                    <span class="${setColourToCountryName(countryToHTML.region)}">${countryToHTML.name}</span>
                    <p>Has a population of ${countryToHTML.population} people.</p></li>`
        })

        //Met join haal ik de komma tussen de verschillende landen weg.
        countries.innerHTML = countriesToHTML.join("")


    }catch (e){
        //de errors afvangen
        console.error(e)
        console.log(e.response)
        if (e.response.status === 404){
            console.log("Er ging iets fout")
            errorMessage.innerText = `${e.response.status}: ${e.response.data.message}`
        } else if (e.response.status === 500){
            errorMessage.textContent = "Er ging iets fout in de server"
        } else {
            errorMessage.textContent = "We weten niet wat er fout ging, probeer het later nog eens"
        }
    }
}

//Roep de functie aan
fetchCountries()
