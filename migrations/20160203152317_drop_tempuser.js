exports.up = function(knex, Promise) {
  return knex.schema.dropTable('tempuser');
};

exports.down = function(knex, Promise) {
  return knex.schema.createTable('tempuser', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('username');
    table.string('password');
    table.string('image');
    table.string('speciality');
    table.string('studio');
    table.text('bio');
    table.string('fb_id');
  })
}
