"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
function default_1(sequelize) {
    return sequelize.define("User", {
        idUser: {
            type: sequelize_1.DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: sequelize_1.DataTypes.STRING,
        },
        lastname: {
            type: sequelize_1.DataTypes.STRING,
        },
        pseudo: {
            type: sequelize_1.DataTypes.STRING,
        },
        birth: {
            type: sequelize_1.DataTypes.DATE,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING
        },
        mail: {
            type: sequelize_1.DataTypes.STRING,
            unique: true
        },
        isactive: {
            type: sequelize_1.DataTypes.INTEGER
        },
        money: {
            type: sequelize_1.DataTypes.FLOAT
        },
        idCity: {
            type: sequelize_1.DataTypes.BIGINT,
        },
        idRole: {
            type: sequelize_1.DataTypes.BIGINT,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
exports.default = default_1;
