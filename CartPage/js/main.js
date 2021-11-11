class ProductList {
    constructor(container='.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, img: 'img/notebook.jpg', title: 'Notebook', price: 1299},
            {id: 2, img: 'img/mouse.jpg', title: 'Mouse', price: 49},
            {id: 3, img: 'img/keyboard.jpg', title: 'Keyboard', price: 119},
            {id: 4, img: 'img/gamepad.jpg', title: 'Gamepad', price: 39},
            {id: 5, img: 'img/headphones.jpg', title: 'Headphones', price: 99}
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const item = new ProductItem(product);

            block.insertAdjacentHTML('beforeend', item.render());
        }

        block.insertAdjacentHTML('afterend', `<p class="products__total">Total: ${this.getSum()}$</p>`);
    }

    getSum() {
        return this.goods.reduce((sum, item) => sum += item.price, 0);
    }
}

class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.img = product.img;
        this.title = product.title;
        this.price = product.price;
    }

    render() {
        return `<div class="product-item">
                    <img src=${this.img} alt="picture">
                    <h3 class="item-heading">${this.title}</h3>
                    <p class="item-price">${this.price}$</p>
                    <button class="buy-btn">Купить</button>
                </div>`;
    }
}

class CartItem { //класс продукт в корзине
    constructor() {
        this.subtotal = subtotal; // цена товара
        this.render();
    }

    render() {
    }
}

class Cart { // класс корзина
    constructor() {
        this.container = container;
        this.goods = [];
    }

    total() { //метод общей стоимости товаров
    }

    shipping() { //метод доставки
    }

    discount() {  //метод расчета скидки
    }

    addToCart() { //метод добавление в корзину
    }

    delFromCart() { //метод удаление из корзины
    }

    render() { //метод рендеринга страницы корзины со всеми экзеплярами товара.
    }
}

let list = new ProductList();