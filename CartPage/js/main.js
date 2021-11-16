const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl:'/getBasket.json',
        products: [],
        imgCatalog: 'img/random.jpg',
        searchLine: '',
        filtered: [],
        isVisibleCart: false,
        cart: [],
        error: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(product) {
            let productId = product.id_product;
            let find = this.cart.find(product => product.id_product === productId);
            if (find) {
                find.quantity++;
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.cart.push(prod);
            }
        },
        removeProduct(product){
            let productId = product.id_product;
            let find = this.cart.find(product => product.id_product === productId);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');

            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            
            this.products.forEach(el => {
                const card = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    card.classList.add('invisible');
                } else {
                    card.classList.remove('invisible');
                }
            })
        },
    },
    mounted() { // "window.onload"
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data =>{
                for (let item of data.contents){
                    this.cart.push(item);
                }
            });
    }
});