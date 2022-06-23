import Express from 'express';
import {OpenfassController} from "../../controllers/OpenfassController";
import {UploadedFile} from "express-fileupload";

const openfaasRouter = Express.Router();

openfaasRouter.post('/', async (req, res) => {
    OpenfassController.execCodeOpenFaas(req.body)
        .then((result) => {
            res.status(200).send(
                result
            ).end()
        })
        .catch((error) => {
            res.status(400).end()
            console.log(error);
        });
})

export {
    openfaasRouter
}
