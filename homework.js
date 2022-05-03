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
    neededIngredients = {
        'tomato': 2,
        'spaghetti': 1
    };
    constructor() {
        super(10);
    }
}

class Steak extends Dish {
    neededIngredients = {
        'meat': 1
    };
    constructor() {
        super(8);
    }
}

class MashedPotatoes extends Dish {
    neededIngredients = {
        'potato': 1
    };
    constructor() {
        super(7);
    }
}

class SteakAndFries extends Dish {
    neededIngredients = {
        'meat': 1,
        'potato': 1
    };
    constructor() {
        super(8);
    }
}

class Kitchen {
    #fridge = {};
    #orders = [];
    #orderPromises = [];

    addToFridge(ingredients) {
        for (const ingredient of ingredients) {
            this.#fridge[ingredient.name] = ingredient.count;
        }
    }

    order(dish) {
        if (!this.#checkIngredientsPresent(dish.neededIngredients)) {
            throw new Error("Not enough ingridients in fridge");
        }
        this.#useIngredients(dish.neededIngredients);
        this.#orders.push(dish);
    }

    cookFastestOrder() {
        this.#startCookingAllOrders();
        return Promise.race(this.#orderPromises).then(([order, orderPromisesIdx]) => {
            this.#orderPromises.splice(orderPromisesIdx, 1);
            return order;
        });
    }

    cookAllOrders() {
        return Promise.all(this.#orderPromises).then(pairs => {
            const orders = []
            for (const pair of pairs) {
                orders.push(pair[0]);
            }
            return orders;
        });
    }

    #checkIngredientsPresent(ingredients) {
        for (const nam in ingredients) {
            if (!(nam in this.#fridge && this.#fridge[nam] >= ingredients[nam])) {
                return false;
            }
        }
        return true;
    }

    #useIngredients(ingredients) {
        for (const nam in ingredients) {
            this.#fridge[nam] -= ingredients[nam];
        }
    }

    #startCookingAllOrders() {
        for (const order of this.#orders) {
            const orderPromisesLength = this.#orderPromises.length;
            this.#orderPromises.push(order.cook().then(order => {
                return [order, orderPromisesLength];
            }));
        }
        this.#orders = [];
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

    console.log(await kitchen.cookFastestOrder()); // Returns fastest dish to make
    console.log(await kitchen.cookAllOrders()); // Returns two dishes in array

    try {
        kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
    } catch (error) {
        console.log("Error occured!");
    }
}

test();
