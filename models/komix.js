module.exports = (sequelize, DataTypes) => {
    const Komik = sequelize.define('Komik', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,

        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },


    });
    return Komik;
};