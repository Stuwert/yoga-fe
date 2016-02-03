exports.up = function(knex, Promise) {
  return knex.raw('ALTER TABLE user_sequences ALTER COLUMN sequence_id TYPE JSON USING to_json(sequence_id)');

};

exports.down = function(knex, Promise) {
  return knex.raw('ALTER TABLE user_sequences ALTER sequence_id TYPE integer');
};
