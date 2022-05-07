"use strict";
// import {
//     Sequelize,
//     Model,
//     Optional,
//     DataTypes,
//     ModelCtor,
//     HasManyGetAssociationsMixin,
//     HasManyAddAssociationMixin, BelongsToSetAssociationMixinOptions, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin
// } from "sequelize";
// import {SessionInstance} from "./session";
//
// export interface UserProps {
//     idUser?: number;
//     firstname: string;
//     lastname: string;
//     pseudo: string;
//     birth: Date;
//     phone: string;
//     password: string;
//     mail: string;
//     isactive: number;
//     money: number;
//     idCity?: number;
//     idRole?: number;
// }
//
//
// export interface UserCreationProps extends Optional<UserProps, "idUser"> {
// }
//
// export interface UserInstance extends Model<UserProps, UserCreationProps>, UserProps {
//     getSessions: HasManyGetAssociationsMixin<SessionInstance>;
//     addSession: HasManyAddAssociationMixin<SessionInstance, "id">;
//     setRole: BelongsToSetAssociationMixin<User_roleInstance, {
//         foreignKey: "id_role",
//         targetKey: User_roleInstance["idUser_role"]
//     }>;
//
//     setCity: BelongsToSetAssociationMixin<CityInstance, {
//         foreignKey: "idCity",
//         targetKey: CityInstance["idCity"]
//     }>;
//     getCity: BelongsToGetAssociationMixin<CityInstance>;
//     getCommunities: HasManyGetAssociationsMixin<CommunityInstance>
//     // setRole: BelongsToSetAssociationMixin<CommunityRoleInstance, User_roleInstance["idUser_role"]>;
// }
//
// export default function (sequelize: Sequelize): ModelCtor<UserInstance> {
//     return sequelize.define<UserInstance>("User", {
//         idUser: {
//             type: DataTypes.BIGINT,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         firstname: {
//             type: DataTypes.STRING,
//         },
//         lastname: {
//             type: DataTypes.STRING,
//         },
//         pseudo: {
//             type: DataTypes.STRING,
//         },
//         birth: {
//             type: DataTypes.DATE,
//         },
//         phone: {
//             type: DataTypes.STRING,
//         },
//         password: {
//             type: DataTypes.STRING
//         },
//         mail: {
//             type: DataTypes.STRING,
//             unique: true
//         },
//         isactive: {
//             type: DataTypes.INTEGER
//         },
//         money: {
//             type: DataTypes.FLOAT
//         },
//         idCity: {
//             type: DataTypes.BIGINT,
//         },
//         idRole: {
//             type: DataTypes.BIGINT,
//         },
//     }, {
//         freezeTableName: true,
//         underscored: true,
//         paranoid: true,
//         timestamps: true
//     });
// }
