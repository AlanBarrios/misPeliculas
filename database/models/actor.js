module.exports = (sequelize, dataTypes) => {
    let alias = "Actor";

    let cols = {
        first_name: { type: dataTypes.STRING(100) },
        last_name: { type: dataTypes.STRING(100) },
        rating: { type: dataTypes.DECIMAL(3, 1) },
        favorite_movie_id: { type: dataTypes.INTEGER(10).UNSIGNED },
    };

    let config = {
        tableName: "actors",
        timestamps: false,
    };

    let Actor = sequelize.define(alias, cols, config);

    Actor.associate = (models) => {
        Actor.belongsToMany(models.Episode, {
            as: "episodes",
            through: "actor_episode",
            foreignKey: "actor_id",
            otherKey: "episode_id",
        });
        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
        });
        Actor.belongsTo(models.Movie, {
            as: "favorite",
            foreignKey: "favorite_movie_id",
        });
    };

    return Actor;
};
