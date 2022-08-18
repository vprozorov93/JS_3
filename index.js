class Good {
    constructor(id, name, description, sizes, price, availible=true) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.availible = availible;
    }

    setAvailable(){
        this.availible ? this.availible = false : this.availible = true
    }
}

class GoodList {
    #goods = [];
    
    constructor() {
        this.filter = /o/gi;
        this.sortPrice = true;
        this.sortDir = true;
    }

    get list() {
        let availableGoods = this.#goods.filter(good => good.availible && this.filter.test(good.name))

        if (this.sortPrice){
           if (this.sortDir) {
            availableGoods = availableGoods.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0;
                })
           } else {
            availableGoods = availableGoods.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
                })
           }
        }

        return availableGoods
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        for (let i=0; i<this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                delete this.#goods[i]
                this.#goods = this.#goods.filter(item => item != undefined) 
                break
            }
        }        
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.availible)
        this.amount = amount
        this.link = good
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
        let totalSumma = 0
        this.goods.forEach(element => totalSumma += element.amount*element.price)
        return totalSumma
    }

    add(good, amount){
        const index = this.goods.findIndex(item => item.id === good.id)

        if (index != -1) {
            this.goods[index].amount += amount
        } else {
            this.goods.push(new BasketGood(good,amount))
        }
    }

    remove(good, amount) {
        const index = this.goods.findIndex(el => el.id === good.id)

        if (index != -1) {
            const newAmount = this.goods[index].amount - amount
            if (newAmount <= 0) {
                delete this.goods[index]
                this.goods = this.goods.filter(item => item != undefined)
            } else {
                this.goods[index].amount = newAmount
            }
        }
    }

    clear() {
        this.goods.length = 0
    }

    removeUnavailable() {
        this.goods = this.goods.filter(item => item.link.availible === item.availible)
    }
}

const good1 = new Good(1, 'shirt', '', [11,22,33], 10)
const good2 = new Good(2, 'boots', '', [44,45,46], 2)
const good3 = new Good(3, 'skirt', '', [44,45,46], 3)
const good4 = new Good(4, 'polo', '', [44,45,46], 3)
const good5 = new Good(5, 'pants', '', [44,45,46], 3)

const goodlist = new GoodList()

goodlist.add(good1)
goodlist.add(good2)
goodlist.add(good3)
goodlist.add(good4)
goodlist.add(good5)

// console.log('filter1', goodlist.list)
goodlist.filter = /k/;
// console.log('filter2', goodlist.list)
goodlist.remove(3)
// console.log('List after delet good with filter 2', goodlist.list)

const basket = new Basket()
basket.add(good1, 1)
basket.add(good1, 2)
// console.log('Basket:', basket)
basket.add(good2, 3)
basket.remove(good2, 1)
basket.remove(good2, 2)
basket.remove(good2, 2)
// console.log('Basket:', basket)
basket.add(good4, 5)
// console.log('Basket:', basket)
good4.setAvailable()
basket.removeUnavailable()
// console.log('Basket:', basket)
basket.add(good5, 5)
console.log('TotalAmouns:', basket.totalAmount, 'TotalSumm:', basket.totalSum)