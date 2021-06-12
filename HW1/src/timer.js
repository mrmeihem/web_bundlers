import { timerField, timerState, timerMillisecState } from "./main.js";
import { renderTime, convertToTime } from "./utils.js";



export function startTimer(millisec) {

    const nIntervId = setInterval(() =>{
        renderTime(convertToTime(millisec), timerField);

        if (millisec === 0) {
            timerState = complete;
            clearInterval(nIntervId);
            playSound(sound);
        } else if (timerState === 'pause') {
            timerMillisecState = millisec;
            clearInterval(nIntervId);
        }

        millisec -= 1000;
    }, 1000);

}