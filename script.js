import { currency } from './currency-value.js';

const converter = document.querySelector('#converter-select');
function selectConverter() {
    const converterValue = converter.value;
    switch (converterValue) {
        case 'currency':
            fillSection(currency, 'Currency One', 'left');
            fillSection(currency, 'Currency Two', 'right');
            eventListeners();
        break;
    }
}
converter.addEventListener("load", selectConverter());

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

function conversionFunction() {
    const unit = document.querySelector('#converter-select').value;
    const selectedUnit = document.querySelectorAll('.unitSelect');
    const unitArray = [...selectedUnit];
    const unit1 = selectedUnit[0].value;
    const unit2 = selectedUnit[1].value;
    console.log(unit1);
    let unit1Value;
    let unit2Value;
    for (let i = 0; i < currency.length; i++) {
        if (unit[i].name === unit1) {
            unit1Value = unit[i].value;
        }
        if (unit[i].name === unit2) {
            unit2Value = unit[i].value;
        }
    }
    console.log(unit1Value);
}

function eventListeners() {
    console.log('yes');
    const inputs = document.querySelectorAll('.input-value');
    const inputArray = [...inputs];
    /*inputs.forEach( element => {
        console.log(element.id);
        element.addEventListener('input', conversionFunction());
    });*/
    for (let i = 0; i < inputs.length; i++) {
        console.log(inputs[i]);
        inputs[i].addEventListener('input', conversionFunction);
    }
}