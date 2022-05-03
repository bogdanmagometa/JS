/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) { return new Promise(resolve => setTimeout(resolve, ms)) }

class Dish {
    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */

/*
    YOUR CODE HERE
*/

class Bolognese extends Dish {
    constructor() {
        super(10);
        this.neededIngredients = {
            'tomato': 2,
            'spaghetti': 1
        };
    }
}

class Steak extends Dish {
    constructor() {
        super(8);
        this.neededIngredients = {
            'meat': 1
        };
    }
}

class MashedPotatoes extends Dish {

    constructor() {
        super(7);
        this.neededIngredients = {
            'potato': 1
        };
    }
}

class SteakAndFries extends Dish {

    constructor() {
        super(8);
        this.neededIngredients = {
            'meat': 1,
            'potato': 1
        };
    }
}

class Kitchen {
    constructor() {
        this.fridge = {};
        this.orders = [];
        this.finishedOrders = [];
        this.runningOrders = [];
    }

    addToFridge(ingredients) {
        for (const ingredient of ingredients) {
            this.fridge[ingredient.name] = ingredient.count;
        }
    }

    order(dish) {
        if (!this.checkIngredientsPresent(dish.ingredients)) {
            throw new Error("Not enough ingridients in fridge");
        }
        this.useIngredients(dish.ingredients);
        this.orders.push(dish);
    }

    cookFastestOrder() {
        const runningOrders = this.startCookingAllOrders();
        return Promise.race(runningOrders);
    }

    cookAllOrders() {
        return Promise.all(this.runningOrders);
    }

    checkIngredientsPresent(ingredients) {
        for (const nam in ingredients) {
            if (!(nam in this.fridge && this.fridge[nam] >= ingredients[nam])) {
                return false;
            }
        }
        return true;
    }

    useIngredients(ingredients) {
        for (const nam in ingredients) {
            this.fridge[nam] -= ingredients[nam];
        }
    }

    startCookingAllOrders() {
        for (const order of this.orders) {
            order.cook().then(order => {
                this.finishedOrders.push(order);
            })
        }
        const runningOrders = this.orders;
        this.orders = [];
        return runningOrders;
    }
}

class Ingridient {
    constructor(name, count) {
        const allowedNames = ['potato', 'spaghetti', 'meat', 'tomato'];
        if (allowedNames.includes()) {
            throw new Error("No such ingredient: " + name);
        }
        this.name = name;
        this.count = count;
    }
}

async function test() {
    const kitchen = new Kitchen();
    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    await kitchen.cookFastestOrder(); // Returns fastest dish to make
    await kitchen.cookAllOrders(); // Returns two dishes in array

    kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
