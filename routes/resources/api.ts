import Express from 'express';
// import {userRoleRouter} from "./UserRole.route";
import {openfaasRouter} from "./OpenfaasRouter";

const apiRouter = Express.Router();

// apiRouter.use('/userrole', userRoleRouter);
apiRouter.use('/openfaas', openfaasRouter)

export {
    apiRouter
};
