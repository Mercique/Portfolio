var sliderLine = document.querySelector('.slider__line'),
    items = document.querySelectorAll('.item'),
    sliderContentSize = document.querySelector('.slider__content').offsetWidth - 4,
    count = a = 0;

document.getElementById('prev').addEventListener('click', function() {
    count = count + sliderContentSize;
    if (count > 0) {
        count = (items.length - 1) * -sliderContentSize;
    }

    for (var item of items) {
        if (item.classList.contains('item-switch')) {
            item.classList.remove('item-switch');
            a--;
            if (a < 0) {
                a = items.length - 1;
                items[a].classList.add('item-switch');
            } else {
                items[a].classList.add('item-switch');
            }
            break;
        }
    }

    sliderLine.style.transform = 'translateX(' + count + 'px)';
});

document.getElementById('next').addEventListener('click', function() {
    count = count - sliderContentSize;
    if (count < (items.length - 1) * -sliderContentSize) {
        count = 0;
    }

    for (var item of items) {
        if (item.classList.contains('item-switch')) {
            item.classList.remove('item-switch');
            a++;
            if (a < items.length) {
                items[a].classList.add('item-switch');
            } else {
                a = 0;
                items[a].classList.add('item-switch');
            }
            break;
        }
    }

    sliderLine.style.transform = 'translateX(' + count + 'px)';
});

for (var i = 0; i < items.length; i++) { //e.targer = this
    items[i].setAttribute('id', i + 1);
    items[i].onclick = function(e) {
        for (var item of items) {
            if (item.classList.contains('item-switch')) {
                item.classList.remove('item-switch');
                break;
            }
        }
        a = this.id - 1;
        items[a].classList.add('item-switch');
        count = (this.id - 1) * -sliderContentSize;
        sliderLine.style.transform = 'translateX(' + count + 'px)';
    }
}