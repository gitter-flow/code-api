import {UploadedFile} from "express-fileupload";
import axios from "axios";

export class OpenfassController {
    public static execCodeOpenFaas(body: string) {
        const options = {
            auth: {
                username: process.env.OPENFAAS_USER as string,
                password: process.env.OPENFAAS_PASSWORD as string
            },
            headers: {"content-type": "application/json"}
        }
        // console.log(body)
        return axios.post(process.env.OPENFAAS_URL + "function/executor", body, options)
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                console.log(e)
            });
    }

}
