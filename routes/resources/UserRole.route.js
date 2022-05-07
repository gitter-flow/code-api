"use strict";
// import Express from 'express';
// // import {authMiddleWare} from "../middlewares/auth.middleware";
// import {UserController} from "../../controllers/User.controller";
//
// const userRoleRouter = Express.Router();
//
// userRoleRouter.delete('/:id', async (req, res) => {
//     const userRoleController = await UserController.getInstance();
//     userRoleController.deleteById(parseInt(req.params.id))
//         .then((data) => {
//             res.status(200).json({
//                 message: "deleted",
//                 data: data
//             })
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// })
//
// userRoleRouter.put('/', async (req, res) => {
//     const userRoleController = await UserController.getInstance();
//     await userRoleController.update(req.body);
//     res.status(200).json({message: "updated"})
// })
//
// userRoleRouter.get('/', async (req, res) => {
//     const userRoleController = await UserController.getInstance();
//     const start: number = parseInt(String(req.query.start)) || 0;
//     const end: number = parseInt(String(req.query.end)) || 20;
//     try {
//         res.json({'data': await userRoleController.findAll(start, end)});
//     } catch (e) {
//         res.status(500).end();
//     }
// })
//
// export {
//     userRoleRouter
// }
