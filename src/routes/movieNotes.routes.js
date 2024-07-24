const { Router } = require("express");

const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.get("/" , movieNotesController.index); //nao precisa do user_id pq ja esta sendo passado pela query 
movieNotesRoutes.post("/:user_id" , movieNotesController.create);
movieNotesRoutes.delete("/:id" , movieNotesController.delete);
movieNotesRoutes.get("/:id" , movieNotesController.show);

module.exports = movieNotesRoutes;