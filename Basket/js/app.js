var goodsInfo = [
    {
        img: 'img/beats-studio-wireless-black.jpg',
        name: 'Beats Studio Wireless Black',
        price: 32999
    },
    {
        img: 'img/level-on-wireless.jpg',
        name: 'Level On Wireless',
        price: 34999
    },
    {
        img: 'img/SYNCHROS-E40BT.jpg',
        name: 'SYNCHROS E40BT',
        price: 14999
    },
    {
        img: 'img/MDR-EXTRA-BASS-Wireless.jpg',
        name: 'MDR EXTRA BASS Wireless',
        price: 11999
    }
], basket = [];

window.onload = function() {
    for (var i = 0; i < goodsInfo.length; i++) {
        var product = document.querySelector('#product__card'),
            card = document.createElement('div'),
            cardImg = document.createElement('img'),
            cardTitle = document.createElement('h3'),
            cardPrice = document.createElement('span'),
            cardLink = document.createElement('a');
    
        product.append(card);
        card.append(cardImg, cardTitle, cardPrice, cardLink);
    
        card.className = 'card';
        card.id = i + 1;
        cardImg.src = goodsInfo[i].img;
        cardImg.alt = 'card';
        cardTitle.className = 'card__title';
        cardPrice.className = 'card__price';
        cardLink.href = '#';
        cardLink.className = 'card__link';
        cardLink.id = i + 1;
        cardLink.onclick = addInBasket;
    
        cardTitle.innerText = goodsInfo[i].name;
        cardPrice.innerHTML = goodsInfo[i].price + ' &#8381;';
        cardLink.innerText = 'КУПИТЬ';
    }
}

function addInBasket() {
    var btn = document.querySelectorAll('button');

    if (checkBasket(this.id)) {
        var newCheckArray = {
            id: this.id,
            count: 1
        };
        basket.push(newCheckArray);
    } else {
        for (var key in basket) {
            if (basket[key].id == this.id) {
                ++basket[key].count;
            }
        }
    }
    drawBasket(basket);
    if (basket.length != 0 && btn[0].classList.contains('button__disabled')) {
        for (var i = 0; i < btn.length; i++) {
            btn[i].classList.remove('button__disabled');
            btn[i].removeAttribute('disabled');
        }
    }

    btn[0].onclick = function() {
        if (confirm('Вы подтверждаете покупку?')) {
            clearBasket(btn);
            alert('Ваш заказ оформлен!\n(Все товары находящиеся в корзине будут удалены!)');
        }
    }

    btn[1].onclick = function() {
        if (confirm('Вы действительно хотите удалить все содержимое корзины?')) {
            clearBasket(btn);
        }
    }
}

function clearBasket(btn) {
    basket = [];
    document.querySelector('#basket__goods').innerHTML = 'Товаров нет';
    document.querySelector('#basket__goods').classList.add('check__items');
    document.querySelector('#basket__count').innerHTML = 'Count: <b>0</b>';
    document.querySelector('#basket__total').innerHTML = 'Total: <b>0</b>';
    for (var i = 0; i < btn.length; i++) {
        btn[i].classList.add('button__disabled');
        btn[i].setAttribute('disabled', '');
    }
}

function checkBasket(id) {
    if (basket.length > 0) {
        for (var i = 0; i < basket.length; i++) {
            if (basket[i].id == id)
                return false;
        }
    }
    return true;
}

function drawBasket(basket) {
    var basketGoods = document.querySelector('#basket__goods'),
        basketCount = document.querySelector('#basket__count'),
        basketTotal = document.querySelector('#basket__total'),
        countPrice = countItems = 0;

    basketGoods.innerHTML = '';
    if (basketGoods.classList.contains('check__items'))
        basketGoods.classList.remove('check__items');

    for (var i = 0; i < basket.length; i++) {
        var goods = document.createElement('div'),
            goodsTitle = document.createElement('h3'),
            goodsPrice = document.createElement('span'),
            goodsCount = document.createElement('span'),
            goodsTotal = document.createElement('span');
        
        goods.className = 'goods';
        goodsTitle.className = 'goods__title';
        goodsPrice.className = 'goods__price';
        goodsCount.className = 'goods__count';
        goodsTotal.className = 'goods__total';
    
        goodsTitle.innerHTML = goodsInfo[basket[i].id - 1].name;
        goodsPrice.innerHTML = 'Price: ' + goodsInfo[basket[i].id - 1].price + ' &#8381;';
        goodsCount.innerHTML = 'Count: ' + basket[i].count;
        goodsTotal.innerHTML = 'Total: ' + (goodsInfo[basket[i].id - 1].price * basket[i].count) + ' &#8381;';
        countPrice += goodsInfo[basket[i].id - 1].price * basket[i].count;
        countItems += basket[i].count;
        basketCount.innerHTML = 'Count: <b>' + countItems + '</b> шт';
        basketTotal.innerHTML = 'Total: <b>' + countPrice + '</b> &#8381;';

        goods.append(goodsTitle, goodsPrice, goodsCount, goodsTotal);
        basketGoods.append(goods);
    }
}