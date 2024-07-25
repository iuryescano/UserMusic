const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.get("/:user_id" , movieTagsController.index); //nao precisa do user_id pq ja esta sendo passado pela query 


module.exports = movieTagsRoutes;