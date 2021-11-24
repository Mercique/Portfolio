Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: []
        }
    },
    methods: {
        filterGoods(searchLine) {
            let regexp = new RegExp(searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="product of filtered" :key="product.id_product" :img="product.img" :product="product"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <div class="product-item">
            <img :src="img" alt="pic">
            <div class="desc">
                <h3>{{ product.product_name }}</h3>
                <p>{{ product.price }} ₽</p>
                <button class="btn buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>
            </div>
        </div>
    `
})