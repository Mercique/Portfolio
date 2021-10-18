var imgSmall = document.querySelectorAll('.small__img');

for (var i = 0; i < imgSmall.length; i++) {
    imgSmall[i].id = i + 1;
    imgSmall[i].addEventListener('click', imgClick);
}

function imgClick() {
    var box = document.querySelector('#box__big');

    classCheck();

    box.innerHTML = '<img src="big_img/big' + this.id + '.jpg" onerror="error()">'
    imgSmall[this.id - 1].classList.add('border-color');
}

function classCheck() {
    for (var item of imgSmall) {
        if (item.classList.contains('border-color')) {
            item.classList.remove('border-color');
        }
    }
    return item;
}

function error(box) {
    alert('ОШИБКА! Фото не найдено!');
    document.querySelector('#box__big').innerText = 'Фото не найдено!';
}