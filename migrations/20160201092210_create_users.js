
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
  table.increments();
  table.string('first_name');
  table.string('last_name');
  table.string('email');
  table.string('username');
  table.string('password');
  table.string('city')
  table.string('state')
  table.string('fb_id')
  table.string('image')
  table.string('speciality')
  table.string('studio')
  table.text('bio')
})
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
