const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container='.products') {
        this.container = container;
        this.goods = [];

        this._getProducts()
            .then(data => {
                this.goods = data;
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const item = new ProductItem(product);

            block.insertAdjacentHTML('beforeend', item.render());
        }

        block.insertAdjacentHTML('afterend', `<p class="products__total">Total: ${this.getSum()}&#8381;</p>`);
    }

    getSum() {
        return this.goods.reduce((sum, item) => sum += item.price, 0);
    }
}

class ProductItem {
    constructor(product, img = 'img/random.jpg') {
        this.id = product.id_product;
        this.img = img;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="product-item" data-id=${this.id}>
                    <img src=${this.img} alt="picture">
                    <h3 class="item-heading">${this.title}</h3>
                    <p class="item-price">${this.price}&#8381;</p>
                    <button class="buy-btn" data-id="${this.id}">Купить</button>
                </div>`;
    }
}

class CartItem extends ProductItem {
    constructor(id, img, title, price, quantity) {
        super(id, img, title, price, quantity);
        this.subtotal = this.price * this.quantity;
    }

    render() {
        return `<div class="cart__item" data-id=${this.id}>
                    <div class="item-box">
                        <div class="item-img">
                            <img src=${this.img} alt="pic">
                        </div>
                        <div class="item-info">
                            <h3 class="item-title">${this.title}</h3>
                            <span class="item-price">${this.price}&#8381;</span>
                            <span class="item-quantity">Кол-во: ${this.quantity}</span>
                        </div>
                    </div>
                    <span class="item-total">${this.subtotal}&#8381;</span>
                    <button type="button" id="item-del">
                        <svg width="20" height="20" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M45.051 4.42999L41.309 0.686995C41.1232 0.501192 40.9027 0.3538 40.66 0.25324C40.4173 0.15268 40.1572 0.100922 39.8945 0.100922C39.6318 0.100922 39.3716 0.15268 39.1289 0.25324C38.8862 0.3538 38.6657 0.501192 38.48 0.686995L23.165 16L7.84997 0.686995C7.47492 0.312052 6.9663 0.101422 6.43597 0.101422C5.90564 0.101422 5.39703 0.312052 5.02197 0.686995L1.27997 4.42999C0.905028 4.80505 0.694397 5.31367 0.694397 5.84399C0.694397 6.37432 0.905028 6.88294 1.27997 7.25799L16.6 22.573L1.27997 37.888C0.905028 38.2631 0.694397 38.7717 0.694397 39.302C0.694397 39.8323 0.905028 40.3409 1.27997 40.716L5.02197 44.459C5.39703 44.8339 5.90564 45.0446 6.43597 45.0446C6.9663 45.0446 7.47492 44.8339 7.84997 44.459L23.165 29.144L38.48 44.459C38.6657 44.6448 38.8862 44.7922 39.1289 44.8927C39.3716 44.9933 39.6318 45.0451 39.8945 45.0451C40.1572 45.0451 40.4173 44.9933 40.66 44.8927C40.9027 44.7922 41.1232 44.6448 41.309 44.459L45.051 40.716C45.4259 40.3409 45.6365 39.8323 45.6365 39.302C45.6365 38.7717 45.4259 38.2631 45.051 37.888L29.736 22.573L45.051 7.25799C45.4259 6.88294 45.6365 6.37432 45.6365 5.84399C45.6365 5.31367 45.4259 4.80505 45.051 4.42999Z" fill="#333333"/>
                        </svg>
                    </button>
                </div>`;
    }
}

class Cart { // класс корзина
    constructor(container = '.cart') {
        this.container = container;
        this.list = list;
        this.goods = [];

        this._clickCart();
        this.addToCart();
        this.delFromCart();
        this._getCart()
            .then(data => {
                this.goods = data;
                this.render();
            });
    }

    _getCart() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods.contents) {
            const item = new CartItem(product);

            block.insertAdjacentHTML('beforeend', item.render());
        }
    }

    _clickCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart').classList.toggle('close-menu');
        });
    }

    addToCart() { //добавление в корзину
    }

    delFromCart() { //удаление из корзины
    }
}

const list = new ProductList();
const cart = new Cart();