
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('tempuser').del(),

    // Inserts seed entries
    knex('tempuser').insert({first_name: 'Stuart', last_name: 'Urback', city: 'Denver', state:'CO', interests: JSON.stringify(['hiking', 'dogs', 'long walks']), specialty: 'Vinyasa'})
  );
};
