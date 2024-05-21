const BASE_URL = `https://open.er-api.com/v6/latest`;

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let btn = document.querySelector(".btn");
let msg = document.querySelector(".msg");
let input = document.querySelector(".amount input");


for(let select of dropdowns) {
    for(let countryCode in countryList) {
        console.log(countryCode);
        let newOption = document.createElement("option");
        newOption.innerText = countryCode;
        newOption.value = countryCode;

        if(select.name === "from" && countryCode === "USD") {
            newOption.selected = "selected";
        } else if(select.name === "to" && countryCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
         
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

const audio1 = new Audio();
audio1.src = "./wow.mp3"
btn.addEventListener("click", (evt) => {

    evt.preventDefault();
    updateExchangeRate();
    setTimeout( () => {
    audio1.play();
},400);
});

const updateExchangeRate = async () => {

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {

        amtVal = 1;
        input.value = 1;
    }
    const fromUrl = `${BASE_URL}/${fromCurr.value}`;
    let response1 = await fetch(fromUrl);
    let data1 = await response1.json();
    console.log(data1);
    let fromCurrVal = data1['rates'][fromCurr.value];
  
    let toCurrVal = data1['rates'][toCurr.value];

    let rate = (toCurrVal/fromCurrVal);
    let finalVal = amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
};

window.addEventListener("load", () => {

    updateExchangeRate();
});

