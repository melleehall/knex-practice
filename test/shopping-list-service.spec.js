const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping List service object`, function() {
    let db
    let testShoppingListItems = [
        {
         id: 1,
         name: 'Name One',
         price: 1.00,
         date_added: new Date('2020-03-08 05:08:25'),
         checked: true,
         category: 'Snack'    
        },
        {
            id: 2,
            name: 'Name One',
            price: 1.00,
            date_added: new Date('2020-03-06 05:09:25'),
            checked: true,
            category: 'Snack'    
        },
        {
            id: 3,
            name: 'Name One',
            price: 1.00,
            date_added: new Date('2020-03-07 05:02:25'),
            checked: true,
            category: 'Snack'    
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL_TWO,
        })
    })

    // before(() => {
    //     return db   
    //         .into('shopping_list')
    //         .insert(testShoppingListItems)
    // })

    // after(() => db.destroy())

    context(`Given 'shopping_list has data`, () => {
        it(`resolves all shopping items from 'shopping_list`, () => {
            // test that ShoppingListService.getAllShoppingItems get data from table
        })
    })
})

    // before(() => db('shopping_list').truncate())

    // afterEach(() => db('shopping_list').truncate())

    // after(() => db.destroy())

    // context(`Given shopping_list has no data`, () => {
    //     it(`getAllShoppingItems() resolves an empty array`, () => {
    //         return ShoppingListService.getAllShoppingItems(db)
    //             .then(actual => {
    //                 expect(actual).to.eql([])
    //             })
    //     })
    // })
