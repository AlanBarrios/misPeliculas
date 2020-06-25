module.exports = (sequelize, dataTypes) => {
    let alias = "Actor_movie";

    let cols = {
        actor_id: { type: dataTypes.INTEGER(10).UNSIGNED },
        movie_id: { type: dataTypes.INTEGER(10).UNSIGNED },
    };

    let config = {
        tableName: "actor_movie",
        timestamps: false,
    };

    let Actor_movie = sequelize.define(alias, cols, config);

    return Actor_movie;
};
