exports.up = knex => knex.schema.createTable("movie_tags", table => { //criar tabela
    table.increments("id");
    table.text("name").notNullable();

    table.integer("movie_id").references("id").inTable("movie_notes").onDelete("CASCADE"); //se eu deletar um filme, ele vai deletar essa tag
    table.integer("user_id").references("id").inTable("users"); //chave estrangeira
});

exports.down = knex => knex.schema.dropTable("movie_tags"); //dropar tabela

