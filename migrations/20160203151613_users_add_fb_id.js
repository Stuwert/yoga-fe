exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.string('fb_id');
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('fb_id');
  })
};
