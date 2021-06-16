export const buttonAppSelect = document.getElementById('appSelect');
const dateCalc = document.getElementById('datecalc');
const timer = document.getElementById('timer');

export function handleClickAppSelect(event) {
    event.preventDefault();

    if (buttonAppSelect.innerText === 'Открыть таймер') {
        buttonAppSelect.innerText = 'Открыть калькулятор дат';
        dateCalc.style.display = 'none';
        timer.style.display = 'block';

    } else {
        buttonAppSelect.innerText = 'Открыть таймер';
        dateCalc.style.display = 'block';
        timer.style.display = 'none';
    }
}

