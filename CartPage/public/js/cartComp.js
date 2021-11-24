Vue.component('cart', {
    data() {
      return {
            cartUrl:'/getBasket.json',
            cart: [],
            isVisibleCart: false
        }
    },
    methods: {
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
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data =>{
                for (let item of data.contents){
                    this.cart.push(item);
                }
            });
    },
    template: `
        <div class="cart-show">
            <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
            <div class="cart-block" v-show="isVisibleCart">
                <p class="cart-text-null" v-if="!cart.length">Корзина пуста!</p>
                <cart-item class="cart-item" v-for="item of cart" :key="item.id_product" :cart-item="item" :img="item.img" @remove="removeProduct"></cart-item>
            </div>
        </div>
    `
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">{{ cartItem.product_name }}</p>
                    <p class="product-quantity">Кол-во: {{ cartItem.quantity }} шт</p>
                    <p class="product-single-price">{{ cartItem.price }} ₽ за ед.</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{ cartItem.quantity*cartItem.price }} ₽</p>
                <button class="btn del-btn" @click="$emit('remove', cartItem)">&times;</button>
            </div>
        </div>
    `
});