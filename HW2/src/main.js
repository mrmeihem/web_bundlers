import "../css/style.css";
import "../sounds/sound.mp3";

import {diffDates, diffToHtml} from "./datecalc.js"; // 1
import {formatError, calcMillisec, renderTime, stopSound} from "./utils.js"; // 2
import { startTimer, timerMillisecState } from "./timer.js"; // 3
import {handleClickAppSelect, buttonAppSelect} from "./switch.js";

const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value;
    secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate); // 3
        dateCalcResult.innerHTML = diffToHtml(diff); // 4
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
}

export const timerField = document.getElementById("timerField");
export let timerState = 'off'; //off-on-pause-resume-reset-complete

const timeInput = document.getElementById("timeInput")
const buttonStartStop = document.getElementById("start-pause");
const buttonReset = document.getElementById("reset");

function handleClickStartStop(event) {
    event.preventDefault();
    if (timerState === 'off' || timerState === 'reset') {
        let timerMillisec = calcMillisec(timeInput.value); //returns miliseconds, on input string: XX:XX:XX
        //Something wrong is going on with the form.value
        if (timerMillisec === false) {
            timerField.innerHTML = formatError("Введите время");
        } else {
            timeInput.setAttribute("disabled", true); // disabling input field
            buttonStartStop.innerText = "Стоп"; // changing
            timerState = 'on';
            startTimer(timerMillisec);
        }
    } else if (timerState === 'on' || timerState === 'resume') {
        buttonStartStop.innerText = "Возобновить";
        timerState = 'pause';
    } else if (timerState === 'pause') {
        buttonStartStop.innerText = "Стоп";
        timerState = 'resume';
        startTimer(timerMillisecState);
    } else if (timerState === 'complete') {
        stopSound();
    }
}

function handleClickReset(event) {
    if (timerState === 'on' || timerState === 'pause') {
        renderTime([0,0,0], timerField);
        timeInput.value = ''
        timeInput.removeAttribute("disabled");
    }
    event.preventDefault();
    timerState = 'reset';
    buttonStartStop.innerText = "Старт";
}

export function completeStateTrue() {
    timerState = 'complete';
    renderTime([0,0,0], timerField);
    timeInput.value = ''
    timeInput.removeAttribute("disabled");
}

export function resetStateTrue() {
    timeInput.value = ''
    timeInput.removeAttribute("disabled");
    buttonStartStop.innerText = "Старт";
    timerState = 'off';
}

buttonStartStop.addEventListener("click", handleClickStartStop);
buttonReset.addEventListener("click", handleClickReset);
buttonAppSelect.addEventListener("click", handleClickAppSelect);