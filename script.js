import { currency, weight } from './currency-value.js';

const converter = document.querySelector('#converter-select');
function selectConverter() {
    const converterValue = converter.value;
    document.querySelector('#final').innerHTML = '';
    switch (converterValue) {
        case 'currency':
            fillSection(currency, 'Currency One', 'left');
            fillSection(currency, 'Currency Two', 'right');
            conversionDirection('currency');
            directionDisplay();
            eventListeners();
        break;
        case 'weight':
            fillSection(weight, 'Unit One', 'left');
            fillSection(weight, 'Unit Two', 'right');
            conversionDirection('weight');
            directionDisplay();
            eventListeners();
        break;
    }
}
converter.addEventListener("load", selectConverter());
converter.addEventListener("change", selectConverter);

function conversionDirection(unit) {
    const conversionDirection = document.querySelector('#conversionDirection');
    conversionDirection.innerHTML = '';
    const oneToTwo = document.createTextNode(`${unit} one to ${unit} two`);
    const twoToOne = document.createTextNode(`${unit} two to ${unit} one`);
    const select1 = document.createElement('option');
    const select2 = document.createElement('option');
    select1.append(oneToTwo);
    select2.append(twoToOne);
    select1.setAttribute('value', 'to right');
    select2.setAttribute('value', 'to left');
    conversionDirection.append(select1);
    conversionDirection.append(select2);
}

function fillSection(unit, title, section) {
    //select which div to append the elements to
    const div = document.querySelector(`#${section}`);
    div.innerHTML = '';

    //create title
    const titleEle = document.createElement("h3");
    const titleTxt = document.createTextNode(title);
    div.append(titleEle);

    //create select with options
    const select1 = document.createElement("select");
    select1.classList.add("unitSelect");
    for (let i = 0; i < unit.length; i++) {
        const currName = unit[i].name;
        const option = document.createElement("option");
        const name = document.createTextNode(currName);
        option.setAttribute('value', currName);
        option.id = currName;
        titleEle.append(titleTxt);
        option.append(name);
        select1.append(option);
    }
    div.append(select1);

    //create input
    const inputValue = document.createElement('input');
    inputValue.setAttribute('type', 'number');
    inputValue.classList.add('input-value');
    div.append(inputValue);
}

//makes only one input visible
function directionDisplay() {
    const direction = document.querySelector('#conversionDirection').value;
    if (direction === 'to right') {
        document.querySelector('#left > input').setAttribute('data-visible', 'yes');
        document.querySelector('#right > input').setAttribute('data-visible', 'no');
    }
    else {
        document.querySelector('#left > input').setAttribute('data-visible', 'no');
        document.querySelector('#right > input').setAttribute('data-visible', 'yes');
    }
}
document.querySelector('#conversionDirection').addEventListener('input', directionDisplay);

function conversionFunction() {
    //find the type of units that are being converted
    const unit = document.querySelector('#converter-select').value;
    //find the specific units being converted
    const selectedUnit = document.querySelectorAll('.unitSelect');//find the units for each select
    const unit1 = selectedUnit[0].value;
    const unit2 = selectedUnit[1].value;

    //find the conversion rate for units
    let unit1Exchange;
    let unit2Exchange;
    //eval() lets us turn the string from var unit into something we can use to call an object
    const obj = eval(unit);
    let symbol1;//find symbols for selected currencies, to be used later
    let symbol2;
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].name === unit1) {
            unit1Exchange = obj[i].exchange;
            symbol1 = obj[i].sign;
        }
        if (obj[i].name === unit2) {
            unit2Exchange = obj[i].exchange;
            symbol2 = obj[i].sign;
        }
    }
    const conversionRate = unit2Exchange / unit1Exchange;

    //find the value of the inputs
    let unit1Value = document.querySelector('#left > input').value;
    let unit2Value = document.querySelector('#right > input').value;
    let result;
    if (document.querySelector('#conversionDirection').value === 'to right') {//refers to value of select that chooses which way the conversion happens
        result = parseFloat(unit1Value) * conversionRate;//multiplies input with conversion rate
        const final = document.querySelector('#final');
        final.innerHTML = '';
        if (unit2 !== 'Bitcoin') {//sets the decimals to 2 unless the currency is Bitcoin
            result = result.toFixed(2);
        }
        if (result !== NaN) {//displays result of conversion with symbol if the result is a number
            let resultText;
            if (unit === 'currency') {
                resultText = document.createTextNode(`${symbol1}${result}`);
            } else {
                resultText = document.createTextNode(`${result} ${symbol1}`);
            }
            final.append(resultText);
        }
    }
    else if (document.querySelector('#conversionDirection').value === 'to left') { 
        result = parseFloat(unit2Value) * unit1Exchange / unit2Exchange;
        const final = document.querySelector('#final');
        final.innerHTML = '';
        if (unit1 !== 'Bitcoin') {
            result = result.toFixed(2);
        }
        if (result !== NaN) {
            let resultText
            if (unit === 'currency') {
                resultText = document.createTextNode(`${symbol2}${result}`);
            } else {
                resultText = document.createTextNode(`${result} ${symbol2}`);
            }
            final.append(resultText);
        }
    }

    //post result in div#result
    
}

function eventListeners() {
    const inputs = document.querySelectorAll('.input-value');
    const selects = document.querySelectorAll('.unitSelect');
    /*inputs.forEach( element => {
        console.log(element.id);
        element.addEventListener('input', conversionFunction());
    });*/
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', conversionFunction);
    }
    for (let i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', conversionFunction);
    }
}