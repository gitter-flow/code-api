import Express from 'express';
import {OpenfassController} from "../../controllers/OpenfassController";
import {UploadedFile} from "express-fileupload";

const openfaasRouter = Express.Router();

openfaasRouter.post('/', async (req, res) => {
    // const openfassController = await OpenfassController.getInstance();
    if(!req.files) {
        res.send({
            message: 'No file uploaded'
        }).end();
    }
    openfassController.sendRequest(/*req.files!.file1 as UploadedFile*/)
        .then(() => {
            res.status(204).json({
                message: "OK",
            }).end()
        })
        .catch((error) => {
            res.status(400).end()
            console.log(error);
        });
})

openfaasRouter.get('/', async (req, res) => {
    // const openfassController = await OpenfassController.getInstance();
    OpenfassController.execCodeOpenFaas(req.body.data)
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
