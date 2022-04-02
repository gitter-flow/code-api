import {Express} from 'express';
// import {authRouter} from './auth/auth.router';
import {apiRouter} from './resources/api';

export function buildRoutes(app: Express) {
    // app.use('/auth', authRouter);
    app.use('/resources', apiRouter);
}
