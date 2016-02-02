
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tempuser', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('user_name');
    table.string('city');
    table.string('state');
    table.json('interests');
    table.json('favorites');
    table.string('specialty');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tempuser');
};
