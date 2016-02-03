exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_favorites', function(table){
    table.integer('user_id');
    table.json('sequence');
    table.primary('user_id', 'sequence');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_favorites')
};
