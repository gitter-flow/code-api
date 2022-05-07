import {UploadedFile} from "express-fileupload";
import axios from "axios";

export class OpenfassController {
    private static instance: OpenfassController;

    public static async getInstance(): Promise<OpenfassController> {
        if(this.instance === undefined) {
            OpenfassController.instance = new OpenfassController();
        }
        return OpenfassController.instance;

    }

    public async sendRequest(/*file: UploadedFile*/) {
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

    public execCodeOpenFaas(body: string) {
        return axios({
            method:"get", // tester en POST
            url: "http://127.0.0.1:8080/function/executor",
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
