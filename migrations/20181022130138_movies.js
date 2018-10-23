exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table) {
    // Table Column Definitions
    table.increments()
    table.string('Title').notNullable()
    table.string('Director')
    table.string('Year')
    table.integer('My_Rating')
    table.string('poster_URL')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('movies')

}
