import { diffDates, diffToHtml } from "./datecalc.js"; // 1
import { formatError, calcMillisec } from "./utils.js"; // 2

import { startTimer } from "./timer.js"; // 3


const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate); // 3
        dateCalcResult.innerHTML = diffToHtml(diff); // 4
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля"); // 5
}

// Таймер

// место, где будет таймер
export const timerField = document.getElementById("timerField");
// инпут
const timeInput = document.getElementById("timeInput")
// кнопка старт-пауза
const buttonStartStop = document.getElementById("start-pause");
// кнопка сброс
const buttonReset = document.getElementById("reset");

//timer
export let timerState = 'off'; //off-on-pause-resume-reset-complete
export let timerMillisecState = 0;
// export const sound = '../sounds/sound.mp3';


function handleClickStartStop(event) {
    event.preventDefault();
    if (timerState === 'off') {
        timeInput.setAttribute("disabled", true); // disabling input field
        buttonStartStop.innerText = "Стоп"; // changing
        let timerMillisec = calcMillisec(timeInput.value); //returns miliseconds, on input string: XX:XX:XX
        //Something wrong is going on with the form.value
        if (timerMillisec === false) {
            timerField.innerHTML = formatError("Введите время");
        } else {
            timerState = 'on'
            startTimer(timerMillisec);
        }
    } else if (timerState === 'on' || timerState === 'resume') {
        buttonStartStop.innerText = "Возобновить";
        timerState = 'pause';
    } else if (timerState === 'pause') {
        buttonStartStop.innerText = "Стоп";
        timerState === 'resume';
        startTimer(timerMillisecState);
    }


    //


}
//
function handleClickReset(event) {
    event.preventDefault();


//     timeInput.removeAttribute("disabled");
//     timerMillisec = 0;
    timerField.innerText = `00:00:00`;
//     timeInput.value = '';
}
//
buttonStartStop.addEventListener("click", handleClickStartStop);
buttonReset.addEventListener("click", handleClickReset);