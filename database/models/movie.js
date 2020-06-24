module.exports = (sequelize, dataTypes) => {
    let alias = "Movie";

    let cols = {
        title: { type: dataTypes.STRING(500) },
        awards: { type: dataTypes.INTEGER(10).UNSIGNED },
        revenue: { type: dataTypes.STRING(255) },
        release_date: { type: dataTypes.DATE },
        length: { type: dataTypes.INTEGER(10).UNSIGNED },
    };

    let config = {
        tableName: "movies",
        timestamps: false,
    };

    let Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "genre_id",
        }),
            Movie.belongsTo(models.Director, {
                as: "director",
                foreignKey: "director_id",
            }),
            Movie.belongsToMany(models.Actor, {
                as: "actors",
                through: "actor_movie",
                foreignKey: "movie_id",
                otherKey: "actor_id",
            });
    };

    return Movie;
};
