exports.up = function(knex, Promise) {
  return knex.schema.createTable('studio_contracts', function(table){
    table.integer('user_id');
    table.integer('studio_id');
    table.primary('user_id', 'studio_id');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('studio_contracts')
};
