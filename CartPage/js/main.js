const products = [
    {id: 1, img: 'img/notebook.jpg', title: 'Notebook', price: 89999},
    {id: 2, img: 'img/mouse.jpg', title: 'Mouse', price: 3499},
    {id: 3, img: 'img/keyboard.jpg', title: 'Keyboard', price: 7999},
    {id: 4, img: 'img/gamepad.jpg', title: 'Gamepad', price: 2599},
    {id: 5, img: 'img/headphones.jpg', title: 'Headphones', price: 6999}
];

const renderProduct = (item) => {
    return `<div class="product-item">
                <img src=${item.img} alt="picture">
                <h3 class="item-heading">${item.title}</h3>
                <p class="item-price">${item.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`;
};

const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => 
        renderProduct(item)).join('');
};

renderPage(products);