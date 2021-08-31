
exports.up = knex => {
  return knex.schema.createTable('adress', (table)=>{
   table.increments('id'),
   table.integer('cep').notNullable()
   table.text('district').notNullable()
   table.text('municipality').notNullable()
   table.text('public_place').notNullable()
   table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = knex => {
  return knex.schema.dropTable('adress')
};
