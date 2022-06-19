import Express from 'express';
import {OpenfassController} from "../../controllers/OpenfassController";
import {MinioController} from "../../controllers/MinioController";
import {UploadedFile} from "express-fileupload";
import {Readable} from "stream";
const openfaasRouter = Express.Router();

openfaasRouter.post('/run', async (req, res) => {
    OpenfassController.execCodeOpenFaas(req.body)
        .then((result: string) => {
            MinioController.senfFileToMinio(req.body.namefile as string, req.body.data) //save du code
            /* tslint:disable-next-line: no-string-literal */
            // const dataStream = Readable['from']([result])
            // MinioController.senfFileToMinio("save_" + req.body.namefile as string, dataStream) //save de l'output d'openfaas
            res.status(200).json({
                message: result,
            }).end()
        })
        .catch((error: any) => {
            res.status(400).end()
            console.log(error);
        });
})


openfaasRouter.post('/exec', async (req, res) => {
    OpenfassController.execCodeOpenFaas(req.body)
        .then((result: string) => {
            res.status(200).json({
                message: result,
            }).end()
        })
        .catch((error: any) => {
            res.status(400).end()
            console.log(error);
        });
})


export {
    openfaasRouter
}
