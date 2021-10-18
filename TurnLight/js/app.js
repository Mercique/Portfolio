var body = document.getElementsByTagName('body')[0],
    hex = document.querySelector('#hex-code'),
    fullCode = '', count = 0, num;

var arrayCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                 'A', 'B', 'C', 'D', 'E', 'F'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max); // 0 - 16(не включительно)
}

document.querySelector('#btn-on').addEventListener('click', function() {
    for (var i = 0; i < 6; i++) {
        num = getRandomInt(arrayCode.length); // 16
        fullCode += arrayCode[num];
    }
    document.getElementById('hex-code').innerText = '#' + fullCode;
    body.style.background = '#' + fullCode;
    fullCode = '';

    console.log(++count);
});

document.querySelector('#btn-off').addEventListener('click', function() {
    document.getElementById('hex-code').innerText = '#050801';
    body.style.background = '#050801';

    count = 0;
});