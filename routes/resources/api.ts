import Express from 'express';
// import {userRoleRouter} from "./UserRole.route";
import {openfaasRouter} from "./OpenfaasRouter";
import {minioRouter} from "./MinioRouter";

const apiRouter = Express.Router();

// apiRouter.use('/userrole', userRoleRouter);
apiRouter.use('/exec', openfaasRouter)
apiRouter.use('/minio', minioRouter)

export {
    apiRouter
};
