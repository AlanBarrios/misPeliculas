module.exports = (sequelize, dataTypes) => {
    let alias = "Episode";

    let cols = {
        title: { type: dataTypes.STRING(500) },
        number: { type: dataTypes.INTEGER(10).UNSIGNED },
        release_date: { type: dataTypes.DATE },
        rating: { type: dataTypes.DECIMAL(3, 1) },
    };

    let config = {
        tableName: "episodes",
        timestamps: false,
    };

    let Episode = sequelize.define(alias, cols, config);

    Episode.associate = (models) => {
        Episode.belongsToMany(models.Actor, {
            as: "actors",
            through: "actor_episode",
            foreignKey: "episode_id",
            otherKey: "actor_id",
        });
    };

    return Episode;
};
