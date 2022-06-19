// import {UserInstance, UserProps} from "../models/user.model";
// import {SequelizeManager} from "../models";
//
// export class UserController {
//     User: ModelCtor<UserInstance>;
//     UserRole: ModelCtor<User_roleInstance>;
//     community: ModelCtor<CommunityInstance>;
//     session: ModelCtor<SessionInstance>;
//     seque: Sequelize;
//
//     private static instance: UserController;
//
//     public static async getInstance(): Promise<UserController> {
//         if(this.instance === undefined) {
//             const manager = await SequelizeManager.getInstance();
//             UserController.instance = new UserController(manager.User, manager.user_role, manager.community, manager.Session, manager.sequelize);
//         }
//         return UserController.instance;
//
//     }
//
//     private constructor(User: ModelCtor<UserInstance>, userRole: ModelCtor<User_roleInstance>, community: ModelCtor<CommunityInstance>, session: ModelCtor<SessionInstance>, seque: Sequelize) {
//         this.User = User;
//         this.UserRole = userRole;
//         this.community = community;
//         this.session = session;
//         this.seque = seque;
//     }
//
//     public async insert(value: UserProps): Promise<UserInstance | null> {
//         return await this.User.create({
//             ...value
//         });
//     }
//
//     public async deleteById(id: number) {
//         await this.User.destroy({
//             where: {
//                 idUser: id
//             }
//         });
//     }
//
//     public async update(props: UserProps) {
//         try {
//             await this.User.update({
//                 ...props
//             }, {
//                 where: {
//                     idUser: props.idUser
//                 }
//             });
//             // return user;
//         } catch (e) {
//             return;
//         }
//     }
//
//     public async updateMoney(idUser: string, money: string): Promise<unknown[] | null> {
//         const res =  await this.seque.query(`UPDATE user set money =  money + ${money} where id_user = ${idUser};`);
//         return res[0];
//     }
//
//     public async findAll(start: number, end: number): Promise<UserInstance[] | null> {
//         return await this.User.findAll({
//             offset: start,
//             limit: end,
//             // include:[{model: this.Pass, as: 'Pass', attributes: ['label']}, {model: this.Category, as: 'Category', attributes: ['label']}],
//         });
//     }
//
//     public async findById(id: number): Promise<UserInstance | null> {
//         return await this.User.findOne({
//             where: {
//                 idUser: id,
//             },
//             // include:[{model: this.Pass, as: 'Pass', attributes: ['label']}, {model: this.Category, as: 'Category', attributes: ['label']}],
//         });
//     }
//
//
//
//     public async getCommunities(userId: number) {
//         const user = await this.findById(userId);
//         if(user == null) {
//             throw new Error(`User doesn't exist (id: ${userId}`)
//         }
//         return await user.getCommunities();
//     }
// }
