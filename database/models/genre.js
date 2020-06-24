module.exports = (sequelize, dataTypes) => {
    let alias = "Genre";

    let cols = {
        name: { type: dataTypes.STRING(100) },
        ranking: { type: dataTypes.INTEGER(10) },
        active: { type: dataTypes.BOOLEAN },
    };

    let config = {
        tableName: "genres",
        timestamps: false,
    };

    let Genre = sequelize.define(alias, cols, config);

    Genre.associate = (models) => {
        Genre.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "genre_id",
        });
    };

    return Genre;
};
