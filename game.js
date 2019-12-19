let randomCountryElement = document.querySelector('#random-country')
let userAnswerElement = document.querySelector("#user-answer")
let submitButton = document.querySelector("#submit-answer")
let resultTextElement = document.querySelector('#result')
let playButton=document.querySelector('#play-again')

let countryLength=countriesAndCodes.length+1
let randomCountry
let cityAnswer

newRound()

function newRound(){
    randomCountry=countriesAndCodes[Math.floor(Math.random()*countryLength)]
    let url='https://api.worldbank.org/v2/country/'+randomCountry["alpha-2"]+'?format=json'
    cityAnswer=''
    userAnswerElement.value=''
    resultTextElement.innerHTML=''

    randomCountryElement.innerHTML=randomCountry.name

    fetch(url)
        .then(res=>res.json())
        .then(countryData=>{
            cityAnswer=countryData[1][0].capitalCity
        })
        .catch(err=>{
            console.log(err)
        })
}

submitButton.addEventListener('click', function () {
    if(userAnswerElement.value==cityAnswer){
        resultTextElement.innerHTML='Correct! The capital of '+randomCountry.name+' is '+cityAnswer+'!'
    }else{
        resultTextElement.innerHTML='Incorrect, the capital of '+randomCountry.name+' is not '+userAnswerElement.value+' it is '+cityAnswer+'.'
    }
})

playButton.addEventListener('click', function(){
    newRound()
})