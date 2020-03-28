const ShoppingListService = {
    getAllShoppingItems(knex) {
        return knex.select('*').from('shopping_list')
    },
}

module.exports = ShoppingListService