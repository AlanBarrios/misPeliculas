const { Movie, Actor, Genre } = require("../database/models");

const controller = {
    showMovies: async (req, res) => {
        try {
            let movies = await Movie.findAll();
            res.render("movies", { movies });
        } catch (error) {
            res.send(error);
        }
    },
    showDetail: async (req, res) => {
        try {
            let movie = await Movie.findByPk(req.params.id, {
                include: ["genre", "actors"],
            });
            res.render("movieDetail", { movie });
        } catch (error) {
            res.send(error);
        }
    },
    showCreateMovie: (req, res) => {
        res.render("movieCreate");
    },
    createMovie: (req, res) => {
        res.redirect("/movies");
    },
    showEditMovie: (req, res) => {
        var peliculaId = req.params.id;
        res.render("movieEdit", { peliculaId });
    },
    editMovie: (req, res) => {
        res.redirect("/movies");
    },
    deleteMovie: (req, res) => {
        res.redirect("/movies");
    },
};

module.exports = controller;
