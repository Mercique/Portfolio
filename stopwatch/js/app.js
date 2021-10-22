let hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
    logTime = 0,
    count = 0,
    interval;

const init = () => {
    const btn_start = document.querySelector('#btn-start'),
          btn_pause = document.querySelector('#btn-pause'),
          btn_stop = document.querySelector('#btn-stop'),
          btn_circle = document.querySelector('#btn-circle');

    createPage();

    btn_pause.removeAttribute('class', '');
    btn_pause.setAttribute('disabled', '');

    btn_stop.removeAttribute('class', '');
    btn_stop.setAttribute('disabled', '');

    btn_circle.removeAttribute('class', '');
    btn_circle.setAttribute('disabled', '');

    btn_start.addEventListener('click', btn => {
        btn.target.setAttribute('disabled', '');
        btn.target.removeAttribute('class');

        btn_pause.setAttribute('class', 'pause');
        btn_pause.removeAttribute('disabled', '');
    
        btn_stop.setAttribute('class', 'stop');
        btn_stop.removeAttribute('disabled', '');
    
        btn_circle.setAttribute('class', 'circle');
        btn_circle.removeAttribute('disabled', '');

        clearInterval(interval);
        interval = setInterval(startTimer, 10);
    });

    btn_pause.addEventListener('click', () => {
        btn_pause.removeAttribute('class', '');
        btn_pause.setAttribute('disabled', '');

        btn_start.setAttribute('class', 'start');
        btn_start.removeAttribute('disabled', '');

        clearInterval(interval);
    });

    btn_stop.addEventListener('click', stopWatch);
    btn_circle.addEventListener('click', circleWatch);
}

function createPage() {
    const stopwatch = document.querySelector('#stopwatch'),
          arrUnit = ['hours', 'minutes', 'seconds', 'milliseconds'];

    for (var i = 0; i < arrUnit.length; i++) {
        const unitBox = document.createElement('div'),
              unitTime = document.createElement('div'),
              unitTextInfo = document.createElement('p');

        unitBox.className = `stopwatch__box`;
        unitTime.id = `stopwatch-${arrUnit[i]}`;
        unitTime.innerText = '00';
        unitTextInfo.className = `stopwatch__text`;
        unitTextInfo.innerText = `${arrUnit[i]}`;

        unitBox.append(unitTime);
        unitBox.append(unitTextInfo);
        stopwatch.append(unitBox);
    }
}

function startTimer() {
    const millisecondText = document.querySelector('#stopwatch-milliseconds'),
          secondText = document.querySelector('#stopwatch-seconds'),
          minuteText = document.querySelector('#stopwatch-minutes'),
          hourText = document.querySelector('#stopwatch-hours');

    millisecond++;

    if (switchTime(millisecondText, millisecond, 100)) {
        millisecond = 0;
        second++;
    } else if (switchTime(secondText, second, 60)) {
        second = 0;
        minute++;
    } else if (switchTime(minuteText, minute, 60)) {
        minute = 0;
        hour++;
    } else if (switchTime(hourText, hour, 24)) {
        console.log(hour);
    }
}

function switchTime(elem, unit1, time) {
    if (unit1 < 10) {
        elem.innerText = `0${unit1}`;
        return false;
    } else if (unit1 < time) {
        elem.innerText = unit1;
        return false;
    } else {
        return true;
    }
}

function stopWatch() {
    clearInterval(interval);
    hour = minute = second = millisecond = 0;
    document.querySelector('#stopwatch-milliseconds').innerText = `0${millisecond}`;
    document.querySelector('#stopwatch-seconds').innerText = `0${second}`;
    document.querySelector('#stopwatch-minutes').innerText = `0${minute}`;
    document.querySelector('#stopwatch-hours').innerText = `0${hour}`;
    document.querySelector('#circle').innerHTML = '';
    
    if (document.querySelector('#btn-start').hasAttribute('disabled')) {
        document.querySelector('#btn-start').removeAttribute('disabled', '');
        document.querySelector('#btn-start').setAttribute('class', 'pause');
    }

    if (!document.querySelector('#btn-pause').hasAttribute('disabled')) {
        document.querySelector('#btn-pause').removeAttribute('class', '');
        document.querySelector('#btn-pause').setAttribute('disabled', '');
    }

    document.querySelector('#btn-stop').removeAttribute('class', '');
    document.querySelector('#btn-stop').setAttribute('disabled', '');

    document.querySelector('#btn-circle').removeAttribute('class', '');
    document.querySelector('#btn-circle').setAttribute('disabled', '');
}

function circleWatch() {
    const circle = document.querySelector('#circle'),
          circleText = document.createElement('p');

    count++;
    circleText.className = 'circle-text';
    circleText.innerHTML = `Piece ${count}:<span class="circle-time">
        ${checkingNumbers(hour)} : ${checkingNumbers(minute)} : 
        ${checkingNumbers(second)} : ${checkingNumbers(millisecond)}</span>`;
    
    circle.append(circleText);
}

function checkingNumbers(num) {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

window.onload = init;