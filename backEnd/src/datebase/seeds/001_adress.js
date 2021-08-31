
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('adress').del()
    .then(function () {
      // Inserts seed entries
      return knex('adress').insert([
        { id: 1, cep: 12345678, district: 'vila-alta', municipality: 'crato', public_place: 'rua feitosa', state: 'ceara' },
        { id: 2, cep: 12345678, district: 'vila-alta', municipality: 'crato', public_place: 'rua feitosa', state: 'ceara' },
      ]);
    });
};
