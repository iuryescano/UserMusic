const knex = require("../database/knex");

class movieTagsController {
    async index(request, response) {
        const {user_id} = request.params;
        console.log(user_id);
        
        const tags = await knex("movie_tags")
        .where({ user_id })

        return response.json(tags);
    }
}

module.exports = movieTagsController;
