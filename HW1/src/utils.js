// import {Howl, Howler} from 'howler';

export const formatError = text => `
<span style="color: red;">
    ${text}
</span>
`;

export function calcMillisec(timeString) {
    let [hours, minutes, seconds] = timeInput.value.split(":");
    if (seconds === undefined) {
        seconds = 0; //strange form' bug. When you enter 0 it gives back undefined
    }
    if (!(+hours + +minutes + +seconds) || (+hours + +minutes + +seconds === 0)) {
        return false;
    }
    return (((+hours * 60) + +minutes) * 60 + +seconds)*1000;
}

export function convertToTime(millisec) {
    let hours = 0;
    let minutes = 0;
    let seconds;

    if (millisec > 3599999) {
        hours = Math.trunc(millisec/3600000);
        minutes = Math.trunc((millisec % 3600000)/60000);
        seconds = (millisec % 60000)/1000;
    } else if (millisec > 59999) {
        minutes = Math.trunc((millisec % 3600000)/60000);
        seconds = (millisec % 60000)/1000;
    } else {
        seconds = (millisec % 60000)/1000;
    }
    // Я не понимаю почему тут это не работает. Убил на попытку отдебажить почти неделю. Angry as hell
    // switch (millisec) {
    //     case millisec > 3599999:
    //         hours = Math.trunc(millisec/3600000);
    //     case millisec > 59999:
    //         minutes = Math.trunc((millisec % 3600000)/60000);
    //     case millisec < 60000:
    //         seconds = (millisec % 60000)/1000;
    //         return;
    // }
    console.log('convertToTime:', hours, minutes, seconds);
    return [hours, minutes, seconds];
}

// renders time in place
export function renderTime(timeArr, place) {
    let hours = timeArr[0].toString().padStart(2,0);
    let minutes = timeArr[1].toString().padStart(2,0);
    let seconds = timeArr[2].toString().padStart(2,0);

    console.log('rendertime:', hours, minutes, seconds);
    place.innerText = `${hours}:${minutes}:${seconds}`;
}

// export function playSound(pathToSound) {
//     const sound = new Howl({
//         src: [pathToSound]
//     });
//
//     sound.play();
// }