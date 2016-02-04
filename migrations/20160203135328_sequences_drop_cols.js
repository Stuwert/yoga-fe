exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sequences'),
    knex.schema.createTable('sequences', function(t){
      t.json('sequence');
    })
  ]);
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sequences');
};
