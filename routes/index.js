var express = require("express");
var router = express.Router();
var moviesController = require("../controllers/moviesController");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

/* Movies */
router.get("/movies", moviesController.showMovies);

/* Movies Detail */
router.get("/movies/detail/:id", moviesController.showDetail);

/* Movies Create */
router.get("/movies/create", moviesController.showCreateMovie);
router.post("/movies/create", moviesController.createMovie);

/* Movies Edit */
router.get("/movies/edit/:id", moviesController.showEditMovie);
router.put("/movies/edit/:id", moviesController.editMovie);

/* Movies Delete */
router.delete("/movies/delete/:id", moviesController.deleteMovie);

module.exports = router;
