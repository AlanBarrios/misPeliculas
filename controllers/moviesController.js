const { Movie, Actor, Genre, Actor_movie } = require("../database/models");
const { check, validationResult, body } = require("express-validator");

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
        const errors = validationResult(req);
        if (errors.isEmpty()) {
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
        } else {
            let genre = await Genre.findAll();
            return res.render("movieCreate", { genre, errors: errors.errors });
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
        const errors = validationResult(req);
        if (errors.isEmpty()) {
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
        } else {
            let movie = await Movie.findByPk(req.params.id, {
                include: ["genre", "actors"],
            });
            let genre = await Genre.findAll();
            return res.render("movieEdit", {
                movie,
                genre,
                errors: errors.errors,
            });
        }
    },
    deleteMovie: async (req, res) => {
        try {
            Actor.destroy({
                where: {
                    favorite_movie_id: req.params.id,
                },
            });
            Actor_movie.destroy({
                where: {
                    movie_id: req.params.id,
                },
            });
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
    showGenre: async (req, res) => {
        try {
            let genre = await Genre.findByPk(req.params.id, {
                include: ["movies"],
            });
            res.render("genre", { genre });
        } catch (error) {
            res.send(error);
        }
    },
    showActor: async (req, res) => {
        try {
            let actor = await Actor.findByPk(req.params.id, {
                include: ["movies"],
            });
            res.render("actor", { actor });
        } catch (error) {
            res.send(error);
        }
    },
    showPerformance: async (req, res) => {
        try {
            let actors = await Actor.findAll();
            let movies = await Movie.findAll();

            res.render("performance", { actors, movies });
        } catch (error) {
            res.send(error);
        }
    },
    createPerformance: async (req, res) => {
        try {
            Actor_movie.create({
                actor_id: req.body.actor_id,
                movie_id: req.body.movie_id,
            });

            res.redirect("/movies/detail/" + req.body.movie_id);
        } catch (error) {
            res.send(error);
        }
    },
    deletePerformance: async (req, res) => {
        try {
            Actor_movie.destroy({
                where: {
                    actor_id: req.params.aid,
                    movie_id: req.params.mid,
                },
            });
            res.redirect("/movies/actor/" + req.params.aid);
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = controller;
