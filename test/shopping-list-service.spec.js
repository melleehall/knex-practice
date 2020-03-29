const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List service object`, function() {
    let db
    
    let testShoppingListItems = [
        {   
            id: 1,
            name: 'One Fish', 
            price: '1.00', 
            date_added: new Date('2020-03-06 05:09:25'),              
            checked: false,          
            category: 'Main',
        },
        {   
            id: 2,
            name: 'Two Fish', 
            price: '2.00', 
            date_added: new Date('2020-03-06 05:02:25'),              
            checked: false,          
            category: 'Snack',
        },
        {   
            id: 3,
            name: 'Three Fish', 
            price: '3.00', 
            date_added: new Date('2020-03-06 05:03:25'),              
            checked: true,          
            category: 'Lunch',
        }
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())

    after(() => db.destroy())

    afterEach(() => db('shopping_list').truncate())

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllShoppingItems() resolves an empty array`, () => {
            return ShoppingListService.getAllShoppingItems(db)
                .then(actual => {
                    expect(actual).to.eql([])
            })
        })

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem =  {   
                id: 4,
                name: 'BLUE Fish', 
                price: '4.00', 
                date_added: new Date('2020-03-08 05:03:25'),              
                checked: true,          
                category: 'Lunch',
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 4,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: new Date(newItem.date_added),
                        checked: newItem.checked,
                        category: newItem.category,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db   
                .into('shopping_list')
                .insert(testShoppingListItems)
        })

        it(`getAllShoppingItems() resolves all items 'shopping_list' table`, () => {
            // test that ShoppingListService.getAllShoppingItems get data from table
            return ShoppingListService.getAllShoppingItems(db)
                .then(actual => {
                    expect(actual).to.eql(testShoppingListItems)
                })
        })
    })
})

