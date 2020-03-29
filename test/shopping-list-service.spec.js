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

        it(`updateItem() updates an item from the 'shopping_list' table`, () => {
            const idOfItemToUpdate = 2
            const newItemData = {
                name: 'NEW Fish', 
                price: '80.00', 
                date_added: new Date(),              
                checked: false,          
                category: 'Breakfast',
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                      id: idOfItemToUpdate,
                      ...newItemData,  
                    })
                })
        })

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 2
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllShoppingItems(db))
                .then(allItems => {
                    // copy the test items array w/o the 'deleted item'
                    const expected = testShoppingListItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`getById() resolves an article by id from 'shopping_list' table)`, () => {
            const secondId = 2
            const secondTestItem = testShoppingListItems[secondId - 1]
            return ShoppingListService.getById(db, secondId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: secondId,
                        name: secondTestItem.name,
                        price: secondTestItem.price,
                        date_added: secondTestItem.date_added,
                        checked: secondTestItem.checked,
                        category: secondTestItem.category,
                    })
                })
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

