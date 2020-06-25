var express = require("express");
var router = express.Router();
var moviesController = require("../controllers/moviesController");
const { check, validationResult, body } = require("express-validator");

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
router.post(
    "/movies/create",
    [
        check("awards")
            .isInt({ min: 0 })
            .withMessage("Los premios no pueden ser negativos."),
        check("release_date").isDate().withMessage("Debe ser una fecha."),
        check("length")
            .isInt({ min: 0 })
            .withMessage("La duracion no puede ser negativa."),
    ],
    moviesController.createMovie
);

/* Movies Edit */
router.get("/movies/edit/:id", moviesController.showEditMovie);
router.put(
    "/movies/edit/:id",
    [
        check("awards")
            .isInt({ min: 0 })
            .withMessage("Los premios no pueden ser negativos."),
        check("release_date").isDate().withMessage("Debe ser una fecha."),
        check("length")
            .isInt({ min: 0 })
            .withMessage("La duracion no puede ser negativa."),
    ],
    moviesController.editMovie
);

/* Movies Delete */
router.delete("/movies/delete/:id", moviesController.deleteMovie);

/* Genre */
router.get("/movies/genre/:id", moviesController.showGenre);

/* Actor */
router.get("/movies/actor/:id", moviesController.showActor);

/* Performance */
router.get("/movies/performance", moviesController.showPerformance);
router.post("/movies/performance", moviesController.createPerformance);

module.exports = router;
