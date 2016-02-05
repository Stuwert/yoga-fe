exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.string('city')
    table.string('state')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
