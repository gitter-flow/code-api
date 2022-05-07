"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
// import {userRoleRouter} from "./UserRole.route";
const OpenfaasRouter_1 = require("./OpenfaasRouter");
const apiRouter = express_1.default.Router();
exports.apiRouter = apiRouter;
// apiRouter.use('/userrole', userRoleRouter);
apiRouter.use('/openfaas', OpenfaasRouter_1.openfaasRouter);