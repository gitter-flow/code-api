"use strict";
// import {Dialect, ModelCtor, Sequelize} from "sequelize";
// import userCreator, {UserInstance} from "./user.model";
// import sessionCreator, {SessionInstance} from "./session";
// import User_roleCreator, {User_roleInstance} from "./user_role";
// import FavorisCreator, {FavorisInstance} from "./favoris";
// import CommentsCreator, {CommentsInstance} from "./comments";
// import ThreadCreator, {ThreadInstance} from "./thread";
// import Thread_categCreator, {Thread_categInstance} from "./thread_categ";
// import ServiceCreator, {ServiceInstance} from "./service";
// import User_has_serviceCreator, {User_has_serviceInstance} from "./user_has_service";
// import Statut_user_to_serviceCreator, {Statut_user_to_serviceInstance} from "./statut_user_to_service";
// import Service_categCreator, {Service_categInstance} from "./service_categ";
// import Service_statutCreator, {Service_statutInstance} from "./service_statut";
// import EventCreator, {EventInstance} from "./event";
// import CommunityCreator, {CommunityInstance} from "./community";
// import AmpleurCreator, {AmpleurInstance} from "./ampleur";
// import RoleCreator, {CommunityRoleInstance} from "./community_role";
// import Community_typeCreator, {Community_typeInstance} from "./community_type";
// import User_has_communityCreator, {User_has_communityInstance} from "./user_has_community";
// import User_has_eventCreator, {User_has_eventInstance} from "./user_has_event";
// import CityCreator, { CityInstance } from "./city";
// export interface SequelizeManagerProps {
//     sequelize: Sequelize;
//     User: ModelCtor<UserInstance>;
//     Session: ModelCtor<SessionInstance>;
//     user_role: ModelCtor<User_roleInstance>;
//     favoris: ModelCtor<FavorisInstance>;
//     comments: ModelCtor<CommentsInstance>;
//     thread: ModelCtor<ThreadInstance>;
//     thread_categ: ModelCtor<Thread_categInstance>;
//     service: ModelCtor<ServiceInstance>;
//     user_has_service: ModelCtor<User_has_serviceInstance>;
//     statut_user_to_service: ModelCtor<Statut_user_to_serviceInstance>;
//     service_categ: ModelCtor<Service_categInstance>;
//     service_statut: ModelCtor<Service_statutInstance>;
//     event: ModelCtor<EventInstance>;
//     ampleur: ModelCtor<AmpleurInstance>;
//     communityRole: ModelCtor<CommunityRoleInstance>;
//     community_type: ModelCtor<Community_typeInstance>;
//     community: ModelCtor<CommunityInstance>;
//     user_has_community: ModelCtor<User_has_communityInstance>;
//     user_has_event: ModelCtor<User_has_eventInstance>;
//     City: ModelCtor<CityInstance>;
// }
//
// export class SequelizeManager implements SequelizeManagerProps{
//     private static instance?: SequelizeManager;
//
//     sequelize: Sequelize;
//     User: ModelCtor<UserInstance>;
//     Session: ModelCtor<SessionInstance>;
//     user_role: ModelCtor<User_roleInstance>;
//     favoris: ModelCtor<FavorisInstance>;
//     comments: ModelCtor<CommentsInstance>;
//     thread: ModelCtor<ThreadInstance>;
//     thread_categ: ModelCtor<Thread_categInstance>;
//     service: ModelCtor<ServiceInstance>;
//     user_has_service: ModelCtor<User_has_serviceInstance>;
//     statut_user_to_service: ModelCtor<Statut_user_to_serviceInstance>;
//     service_categ: ModelCtor<Service_categInstance>;
//     service_statut: ModelCtor<Service_statutInstance>;
//     event: ModelCtor<EventInstance>;
//     ampleur: ModelCtor<AmpleurInstance>;
//     communityRole: ModelCtor<CommunityRoleInstance>;
//     community_type: ModelCtor<Community_typeInstance>;
//     community: ModelCtor<CommunityInstance>;
//     user_has_community: ModelCtor<User_has_communityInstance>;
//     user_has_event: ModelCtor<User_has_eventInstance>;
//     City: ModelCtor<CityInstance>;
//
//     public static async getInstance(): Promise<SequelizeManager> {
//         if(SequelizeManager.instance === undefined) {
//             SequelizeManager.instance = await SequelizeManager.init();
//         }
//         return SequelizeManager.instance;
//     }
//
//     private static async init(): Promise<SequelizeManager> {
//         const sequelize = new Sequelize({
//             dialect: process.env.DB_DRIVER as Dialect,
//             host: process.env.DB_HOST,
//             database: process.env.DB_NAME,
//             username: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             logging: true, // pour retirer les requetes dans la console
//             port: Number.parseInt(process.env.DB_PORT as string)
//         });
//
//         await sequelize.authenticate();
//         const managerProps: SequelizeManagerProps = { //liste des modèles
//             sequelize,
//             User: userCreator(sequelize),
//             Session: sessionCreator(sequelize),
//             user_role: User_roleCreator(sequelize),
//             favoris: FavorisCreator(sequelize),
//             comments: CommentsCreator(sequelize),
//             thread: ThreadCreator(sequelize),
//             thread_categ: Thread_categCreator(sequelize),
//             service: ServiceCreator(sequelize),
//             user_has_service: User_has_serviceCreator(sequelize),
//             statut_user_to_service: Statut_user_to_serviceCreator(sequelize),
//             service_categ: Service_categCreator(sequelize),
//             service_statut: Service_statutCreator(sequelize),
//             event: EventCreator(sequelize),
//             ampleur: AmpleurCreator(sequelize),
//             communityRole: RoleCreator(sequelize),
//             community_type: Community_typeCreator(sequelize),
//             community: CommunityCreator(sequelize),
//             user_has_community: User_has_communityCreator(sequelize),
//             user_has_event: User_has_eventCreator(sequelize),
//             City: CityCreator(sequelize),
//         }
//         SequelizeManager.associateUser(managerProps);
//         SequelizeManager.associateUserHasService(managerProps);
//         SequelizeManager.associateFavoris(managerProps);
//         SequelizeManager.associateUserHasCommunity(managerProps);
//         SequelizeManager.associateService(managerProps);
//         SequelizeManager.associateCommunity(managerProps);
//         SequelizeManager.associateComment(managerProps);
//         SequelizeManager.associateThread(managerProps);
//         SequelizeManager.associateUserEvent(managerProps);
//         SequelizeManager.associateCommunityEvents(managerProps);
//         // await sequelize.sync();
//         await sequelize.sync({
//             force: true
//         });
//         return new SequelizeManager(managerProps);
//     }
//
//     private static associateUser(props: SequelizeManagerProps): void { // liste des liens
//         props.User.hasMany(props.Session); // User peut avoir N session
//         props.Session.belongsTo(props.User); // 1 session a 1 user
//
//         props.User.belongsTo(props.user_role, {
//             as: "role",
//             foreignKey: "id_role"
//         });
//         props.user_role.hasMany(props.User);
//
//         props.City.hasMany(props.User);
//         props.User.belongsTo(props.City, {
//             as: "city",
//             foreignKey: "id_city"
//         });
//
//     }
//
//     private static associateUserEvent(props: SequelizeManagerProps): void { // liste des liens
//         props.User.hasMany(props.user_has_event, {
//             as: "user_has_event",
//             foreignKey: "id_user"
//         });
//         props.user_has_event.belongsTo(props.User, {
//             as: "user",
//             foreignKey: "id_user"
//         });
//         props.event.hasMany(props.user_has_event, {
//             as: "user_has_event",
//             foreignKey: "id_event"
//         });
//         props.user_has_event.belongsTo(props.event, {
//             as: "event",
//             foreignKey: "id_event"
//         });
//     }
//
//     private static associateCommunityEvents(props: SequelizeManagerProps): void {
//         props.event.belongsTo(props.community);
//         props.community.hasMany(props.event);
//     }
//
//     private static associateUserHasService(props: SequelizeManagerProps): void { // liste des liens
//         props.user_has_service.belongsTo(props.User,{
//             as: "User",
//             foreignKey: "id_user"
//         });
//         props.User.hasMany(props.user_has_service);
//         props.user_has_service.belongsTo(props.service,{
//             as: "service",
//             foreignKey: "id_service"
//         });
//         props.service.hasMany(props.user_has_service,{
//             as: "user_has_service",
//             foreignKey: "id_service"
//         });
//         props.user_has_service.belongsTo(props.statut_user_to_service,{
//             as: "statut_user_to_service",
//             foreignKey: "id_statut_user_to_service"
//         });
//         props.statut_user_to_service.hasMany(props.user_has_service);
//     }
//
//     private static associateFavoris(props: SequelizeManagerProps): void { // liste des liens
//         props.favoris.belongsTo(props.User);
//         props.favoris.belongsTo(props.User, {as: 'his_favoris'});
//     }
//
//     private static associateUserHasCommunity(props: SequelizeManagerProps): void { // liste des liens
//         props.User.belongsToMany(props.community, { through: props.user_has_community, foreignKey: 'id_user'})
//         props.community.belongsToMany(props.User, { through: props.user_has_community, foreignKey: 'id_community' })
//         props.user_has_community.belongsTo(props.communityRole, {
//             as: "communityrole",
//             foreignKey: "id_role"
//         });
//         props.communityRole.hasMany(props.user_has_community, {
//             as: "user_has_community",
//             foreignKey: "id_role"
//         });
//         props.user_has_community.belongsTo(props.community, {
//             as: "Community",
//             foreignKey: "id_community"
//         });
//         props.community.hasMany(props.user_has_community, {
//             as: "user_has_community",
//             foreignKey: "id_community"
//         });
//         props.user_has_community.belongsTo(props.User, {
//             as: "user",
//             foreignKey: "id_user"
//         });
//         props.User.hasMany(props.user_has_community, {
//             as: "user_has_community",
//             foreignKey: "id_user"
//         });
//     }
//
//     private static associateService(props: SequelizeManagerProps): void { // liste des liens
//         props.service.belongsTo(props.service_categ);
//         props.service_categ.hasMany(props.service);
//         props.service.belongsTo(props.service_statut);
//         props.service_statut.hasMany(props.service);
//         props.service.belongsTo(props.community, {
//             as: "Community",
//             foreignKey: "id_community"
//         });
//         props.community.hasMany(props.service);
//     }
//
//     private static associateCommunity(props: SequelizeManagerProps): void { // liste des liens
//         props.community.belongsTo(props.community_type);
//         props.community_type.hasMany(props.community);
//         props.community.belongsTo(props.ampleur);
//         props.ampleur.hasMany(props.community);
//     }
//
//     private static associateThread(props: SequelizeManagerProps): void { // liste des liens
//         props.thread.belongsTo(props.thread_categ);
//         props.thread_categ.hasMany(props.thread);
//         props.thread.belongsTo(props.User);
//         props.User.hasMany(props.thread);
//         props.thread.belongsTo(props.community, {
//             as: "Community",
//             foreignKey: "id_community"
//         });
//         props.community.hasMany(props.thread, {
//             as: "Thread",
//             foreignKey: "id_community"
//         });
//     }
//
//     private static associateComment(props: SequelizeManagerProps): void { // liste des liens
//         props.comments.belongsTo(props.thread, {
//             as: "Thread",
//             foreignKey: "id_thread"
//         });
//         props.thread.hasMany(props.comments);
//         props.comments.belongsTo(props.User);
//         props.User.hasMany(props.comments);
//         props.comments.belongsTo(props.comments); //bizarre
//         props.comments.hasMany(props.comments); //bizarre
//     }
//
//     constructor(props: SequelizeManagerProps) {
//         this.sequelize = props.sequelize;
//         this.User = props.User;
//         this.Session = props.Session;
//         this.user_role = props.user_role;
//         this.favoris = props.favoris;
//         this.comments = props.comments;
//         this.thread = props.thread;
//         this.thread_categ = props.thread_categ;
//         this.service = props.service;
//         this.user_has_service = props.user_has_service;
//         this.statut_user_to_service = props.statut_user_to_service;
//         this.service_categ = props.service_categ;
//         this.service_statut = props.service_statut;
//         this.event = props.event;
//         this.ampleur = props.ampleur;
//         this.communityRole =props. communityRole;
//         this.community_type = props.community_type;
//         this.community = props.community;
//         this.user_has_community = props.user_has_community;
//         this.user_has_event = props.user_has_event;
//         this.City = props.City;
//     }
// }
