module.exports = (sequelize, dataTypes) => {
    let alias = "Director";

    let cols = {
        first_name: { type: dataTypes.STRING(255) },
        last_name: { type: dataTypes.STRING(255) },
        birthday: { type: dataTypes.DATE },
    };

    let config = {
        tableName: "directors",
        timestamps: false,
    };

    let Director = sequelize.define(alias, cols, config);

    Director.associate = (models) => {
        Director.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "director_id",
        });
    };

    return Director;
};
