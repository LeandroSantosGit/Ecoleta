import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('collectItems').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e Baterias', image: 'baterias.svg' },
        { title: 'Papeis e Papelão', image: 'papeis-papelao.svg' },
        { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
        { title: 'Óleo de Cozinha', image: 'oleo.svg' },
        { title: 'Resíduos Eletrônico', image: 'eletronicos.svg' },
    ]);
}