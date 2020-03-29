require('dotenv').config()

const knex = require('knex')
const ShoppingListService = require('./shopping-list-service')

const knexIndex = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log(ShoppingListService.getAllShoppingItems())

ShoppingListService.getAllShoppingItems(knexInstance)
    .then(items => console.log(items))
    .then(() => 
        ShoppingListService.insertItem(knexInstance, {
            name: 'NEWER Fish', 
            price: '81.00', 
            date_added: new Date(),              
            checked: true,          
            category: 'Lunch',
        })
    )
    .then(newItem => {
        console.log(newItem)
        return ShoppingListService.updateItem(
            knexInstance,
            newItem.id,
            { name: 'Updated Name' }
        ).then(() => ShoppingListService.getById(knexInstance, newItem.id))
    })
    .then(item => {
        console.log(item)
        return ShoppingListService.deleteItem(knexInstance, item.id)
    })