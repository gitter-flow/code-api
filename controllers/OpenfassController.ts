import {UploadedFile} from "express-fileupload";
import axios from "axios";
import {MinioController} from "../controllers/MinioController";
import {Readable} from "stream";

export class OpenfassController {

    public static execCodeOpenFaas(body: string) {
        return axios({
            method:"get", // tester en POST
            url: process.env.URL_OPENFAAS,
            data: body
        })
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                console.log(e)
            });
    }

}
