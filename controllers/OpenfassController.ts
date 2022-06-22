import {UploadedFile} from "express-fileupload";
import axios from "axios";

export class OpenfassController {
    private static instance: OpenfassController;

    public static async sendRequest(/*file: UploadedFile*/) {
        // file.mv('./uploads/' + file.name);
        await axios.get("https://raw.githubusercontent.com/openfaas/faas/master/api-docs/swagger.yml")
            .then((res) => {
                console.log(res)
                return
            })
            .catch((e) => {
                console.log(e)
            });
    }

    public static execCodeOpenFaas(body: string) {
        const options = {
            auth: {
                username: 'admin',
                password: 'admin'
            },
            headers: {"content-type": "application/json"}
        }

        return axios.post(process.env.OPENFAAS_URL + "function/executor", body, options)
            .then((res) => {
                return res.data
            })
            .catch((e) => {
                console.log(e)
            });
    }

}
