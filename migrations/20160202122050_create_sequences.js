
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sequences', function(table){
    table.increments();
    table.string('user_name');
    table.string('sequence_name');
    table.json('poses');
    table.boolean('public');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sequences');
};
