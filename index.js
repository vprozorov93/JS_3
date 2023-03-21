class Good {
    constructor (id, name, description, sizes, price) {
        this.id = id
        this.name = name
        this.description = description
        this.sizes = sizes
        this.price = price
        this.available = true
    }

    setAvailable() {
        this.availible ? this.availible = false : this.availible = true
    }
}

class GoodsList {
    #goods = []

    constructor() {
        this.filter = /Куртка/gi
        this.sortPrice = true
        this.sortDir = true
    }

    add(good) {
        if(good instanceof Good){
            this.#goods.push(good)
        } else {
            console.log (`${good} не является объектом Good`)
        }
    }

    remove(id) {
        for (let good of this.#goods) {
            if (good.id === id) {
                this.#goods.splice(this.#goods.indexOf(good, 0), 1)
            }
        }
    }

    get list() {
        let availableGoods = this.#goods.filter(good => this.filter.test(good.name) && good.available)

        if (this.sortPrice) {
            if(this.sortDir){ availableGoods.sort((good1, good2) => good1.price - good2.price)
            } else { availableGoods.sort((good1, good2) => good2.price - good1.price) }   
        }

        return availableGoods
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price)
        this.amount = amount
    }
}

class Basket {
    constructor(){
        this.goods = []
    }

    get totalAmount() {
        return this.goods.reduce((previousValue, currentValue) => previousValue + currentValue.amount, 0)
    }

    get totalSum() {
        return this.goods.reduce((previousValue, currentValue) => previousValue + (currentValue.amount*currentValue.price), 0)
    }
    
    add(good, amount) {
        // let isGoodInBasket = this.goods.filter(basketGood => basketGood.id === good.id)
        // if (isGoodInBasket.length === 0) {
        //     this.goods.push(new BasketGood(good, amount))
        // } else {
        //     isGoodInBasket[0].amount+=amount
        // }

        const index = this.goods.findIndex(item => item.id === good.id)

        if (index != -1) {
            this.goods[index].amount += amount
        } else {
            this.goods.push(new BasketGood(good,amount))
        }
    }

    remove(good, amount) {
        // let isGoodInBasket = this.goods.filter(basketGood => basketGood.id === good.id)
        // if (isGoodInBasket.length !== 0) {
        //     if (isGoodInBasket[0].amount-amount > 0) {
        //         isGoodInBasket[0].amount-=amount
        //     } else {
        //         this.goods.splice(this.goods.indexOf(isGoodInBasket[0], 0),1)
        //     }
        // } else {
        //     console.log('Good is not found in basket')
        // }

        const index = this.goods.findIndex(item => item.id === good.id)

        if (index != -1) {
            const newAmount = this.goods[index].amount - amount
            if (newAmount <= 0) {
                this.goods.splice(index,1)
            } else {
                this.goods[index].amount = newAmount
            }
        }
    }

    clear() {
        this.goods.length = 0
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available)
    }
}

const good1 = new Good(1,'Куртка', '', [38,39,40], 10000)
const good2 = new Good(3,'Куртка2', '', [38,39,40], 12000)
const good3 = new Good(2,'Шляпа', '', [38,39,40], 10000)
const goodList = new GoodsList()
goodList.add(good1)
goodList.add(good2)
goodList.add(good3)

basket = new Basket()
basket.add(good1, 1)
basket.add(good1, 5)
basket.add(good2, 100)
basket.remove(good1,7)
console.log(basket)
