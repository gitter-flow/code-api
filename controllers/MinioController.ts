import {minio} from "../services/minio";
import {Readable} from "stream";
import {BucketItemStat} from "minio";
import {OpenfassController} from "./OpenfassController";
// import {throws} from "assert";


export class MinioController {

    public static getListItem() {
        var data: any[] = []
        var stream = minio().listObjects(process.env.MINIO_BUCKET,'', true)
        stream.on('data', function(obj: any) { data.push(obj) } )
        stream.on("end", function () { console.log(data) })
        stream.on('error', function(err: any) { console.log(err) } )
        console.log(data)
    }


    public static async getAllFileVersions(nameFile: string) {
        // Récuperer version et heure
        let fileVersion: BucketItemStat
        await minio().statObject(process.env.MINIO_BUCKET, nameFile, function(error: Error | null, result: BucketItemStat)  {
            console.log(result)
            return fileVersion = result
        })
    }

    public static async getFileFromMinio(fileName: string) {
        return minio().getObject(process.env.MINIO_BUCKET, fileName/*, {versionId:"my-versionId"}*/)
    }

    public static async senfFileToMinio(fileName: string, code: Readable) {
        return minio().putObject(process.env.MINIO_BUCKET, fileName, code)
    }

    public static async senfFileToMinioAndExec(fileName: string, codeToInsert: string, codeToExec: string) {

        let openfaasRes = [await OpenfassController.execCodeOpenFaas(codeToExec)];
        console.log(openfaasRes)
        // const codeToInsertStream = Readable.from([temp], { objectMode: false })
        // const resOpenFaasStream = Readable.from([openfaasRes], { objectMode: false })

        let res = {
            "minio_code": await minio().putObject(process.env.MINIO_BUCKET, fileName, codeToInsert as string),
            "minio_result_code": await minio().putObject(process.env.MINIO_BUCKET, fileName + "_res", openfaasRes.toString()),
            "result_of_exec" : openfaasRes
        }
        return res
    }

}
