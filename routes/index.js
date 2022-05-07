"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRoutes = void 0;
// import {authRouter} from './auth/auth.router';
const api_1 = require("./resources/api");
function buildRoutes(app) {
    // app.use('/auth', authRouter);
    app.use('/resources', api_1.apiRouter);
}
exports.buildRoutes = buildRoutes;
