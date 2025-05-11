
const BASE_URL = "https://api.frankfurter.app";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

// for(currCode in countryList){
//     console.log(currCode , countryList[currCode]);
// }

for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if(select.name === 'from' && currCode === 'USD'){
            newOption.selected = "selected";
        }

        if(select.name === 'to' && currCode === 'INR'){
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    // console.log(currCode);
    let countryCode = countryList[currCode];
    // console.log(countryCode);

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    // console.log(amountValue);
    if(amountValue == "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/latest?amount=${amountValue}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value];
    console.log('rate = ',rate);
    // console.log(data);

    msg.innerText = `${amountValue} ${fromCurr.value} = ${rate} ${toCurr.value}`;
});