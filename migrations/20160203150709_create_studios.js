exports.up = function(knex, Promise) {
  return knex.schema.createTable('studios', function(table){
    table.increments();
    table.string('name');
    table.string('street_1');
    table.string('street_2');
    table.string('city');
    table.string('state');
    table.integer('zip');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('studios')
};
