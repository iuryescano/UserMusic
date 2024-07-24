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
}

module.exports = MovieNotesController;