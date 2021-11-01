class Stuffing {
    constructor(item) {
        this.value = item.value;
        this.price = +item.dataset.price;
        this.calories = +item.dataset.calories;
    }
}

class Hamburger {
    constructor(size, filling, option) {
        this.size = this.getToppings(size);
        this.filling = this.getToppings(filling);
        this.option = this.getToppings(option);
        this.sumPrice = this.calculatePrice();
        this.sumCalories = this.calculateCalories();
    }

    getToppings(name) {
        let Additives = document.querySelectorAll(`input[name=${name}]:checked`),
            list = [];

        Additives.forEach(item => {
            let obj = new Stuffing(item);
            list.push(obj);
        });

        return list;
    }

    calculatePrice() {
        let result = this.size[0].price + this.filling[0].price;

        this.option.forEach(item => result += item.price);
        price.innerText = result;

        return result; // для отображения в обьекте
    }

    calculateCalories() {
        let result = this.size[0].calories + this.filling[0].calories;

        this.option.forEach(item => result += item.calories);
        calories.innerText = result;

        return result; // для отображения в обьекте
    }
}

window.onload = () => {
    document.querySelector('#btn').addEventListener('click', () => {
        let burger = new Hamburger('size', 'filling', 'option');
    })
}