import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar tabela
    return knex.schema.createTable('collectPointItems', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('collectPoints');
        table.integer('items_id')
            .notNullable()
            .references('id')
            .inTable('collectItems');
    });
}

export async function down(knex: Knex) {
    // Deletar tabela
    return knex.schema.dropTable('collectPointItems');
}