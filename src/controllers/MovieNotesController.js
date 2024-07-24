const knex = require("../database/knex");
//rating = avaliacao 

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, movie_tags } = request.body;
        const  { user_id } = request.params;

        const [movie_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const movieTagsInsert = movie_tags.map(name => {
            return {
                movie_id,
                name,
                user_id
            }
        });

        await knex("movie_tags").insert(movieTagsInsert);

        return response.status(201).json();
    }

    async show(request, response) {
        const { id } = request.params;

        const movieNote = await knex("movie_notes").where({ id }).first(); //para trazer uma nota somente em especifico que eu quero
        const movieTags = await knex("movie_tags").where({ movie_id : id }).orderBy("name"); //trazendo as tags para o meu show no caso so pra poder visualizar mesmo

        return response.json({
            ...movieNote,
            movieTags
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("movie_notes").where({ id }).delete(); //deletando a MovieNote sendo assim a tag precisa ser deletada tbm pq esta em cascade

        return response.status(204).json();
    }

    async index(request, response) {
        const { title, user_id, tags } = request.query;

        let movieNotes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());
            
            movieNotes = await knex("movie_tags").whereIn("name", filterTags)
            
        }else {
            movieNotes = await knex("movie_notes")
            .where({ user_id })
            .whereLike("title", `%${title}%`)
            .orderBy("title");
        }

        return response.json(movieNotes);
    }
}

module.exports = MovieNotesController;