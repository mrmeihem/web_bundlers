import { timerField, timerState, completeStateTrue} from "./main.js";
import { renderTime, convertToTime, playSound } from "./utils.js";


export let timerMillisecState = 0;

export function startTimer(millisec) {

    const nIntervId = setInterval(() =>{

        if (millisec === 0) {
            // timerState = 'complete';
            clearInterval(nIntervId);
            completeStateTrue();
            playSound();
        } else if (timerState === 'pause') {
            timerMillisecState = millisec;
            clearInterval(nIntervId);
        }

        renderTime(convertToTime(millisec), timerField);

        if (timerState === 'reset') {
            clearInterval(nIntervId);
            renderTime([0,0,0], timerField);
        }

        millisec -= 1000;
    }, 1000);

}