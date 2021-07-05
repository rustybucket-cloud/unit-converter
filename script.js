import { currency } from './currency-value.js';

const converter = document.querySelector('#converter-select');
function selectConverter() {
    const converterValue = converter.value;
    switch (converterValue) {
        case 'currency':
            fillSection(currency, 'Currency One', 'left');
            fillSection(currency, 'Currency Two', 'right');
            conversionDirection('currency');
            directionDisplay();
            eventListeners();
        break;
    }
}
converter.addEventListener("load", selectConverter());

function conversionDirection(unit) {
    const conversionDirection = document.querySelector('#conversionDirection');
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
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].name === unit1) {
            unit1Exchange = obj[i].exchange;
        }
        if (obj[i].name === unit2) {
            unit2Exchange = obj[i].exchange;
        }
    }
    const conversionRate = unit1Exchange / unit2Exchange;

    //find the value of the inputs
    const unit1Value = document.querySelector('#left > input').value;
    const unit2Value = document.querySelector('#right > input').value;
    console.log(unit1Value + unit2Value);
    if (unit1Value !== '') {

    }
}

function eventListeners() {
    const inputs = document.querySelectorAll('.input-value');
    const inputArray = [...inputs];
    /*inputs.forEach( element => {
        console.log(element.id);
        element.addEventListener('input', conversionFunction());
    });*/
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', conversionFunction);
    }
}