require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

console.log('Hello!! knex and driver installed correctly');

function getItemsWithText(searchTerm) {
    knexInstance
        .select('*')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

getItemsWithText('lettuce')

function getAllItemsPaginated(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
        .select('*')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

getAllItemsPaginated(3)

function getItemsAddedAfterDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .count('date_added AS date')
        .where('date_added',
        '>',
        `${daysAgo}`)
        .groupBy('name')
        .then(result => {
            console.log(result)
        })
}

getItemsAddedAfterDate('2020-03-23 05:09:25')


// Ask about this one
function totalCostForCategories() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price AS total') 
        .then(result => {
            console.log(result)
        })
}

totalCostForCategories()