const controller = {
    showMovies: (req, res) => {
        res.render("movies");
    },
    showDetail: (req, res) => {
        var peliculaId = req.params.id;
        res.render("movieDetail", { peliculaId });
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
