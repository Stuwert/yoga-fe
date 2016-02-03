exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_sequences', function(table){
    table.increments();
    table.integer('user_id');
    table.integer('sequence_id');
    table.string('name');
    table.boolean('is_public');
    table.json('timing');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_sequences')
};
