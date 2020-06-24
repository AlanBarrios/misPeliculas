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
    showCreateMovie: async (req, res) => {
        try {
            let genre = await Genre.findAll();
            res.render("movieCreate", { genre });
        } catch (error) {
            res.send(error);
        }
    },
    createMovie: async (req, res) => {
        try {
            Movie.create({
                title: req.body.title,
                awards: req.body.awards,
                revenue: req.body.revenue,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id,
            });
            res.redirect("/movies");
        } catch (error) {
            res.send(error);
        }
    },
    showEditMovie: async (req, res) => {
        try {
            let movie = await Movie.findByPk(req.params.id, {
                include: ["genre", "actors"],
            });
            let genre = await Genre.findAll();
            res.render("movieEdit", { movie, genre });
        } catch (error) {
            res.send(error);
        }
    },
    editMovie: async (req, res) => {
        try {
            Movie.update(
                {
                    title: req.body.title,
                    awards: req.body.awards,
                    revenue: req.body.revenue,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id,
                },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            res.redirect("/movies/detail/" + req.params.id);
        } catch (error) {
            res.send(error);
        }
    },
    deleteMovie: async (req, res) => {
        try {
            Movie.destroy({
                where: {
                    id: req.params.id,
                },
            });
            res.redirect("/movies");
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = controller;
