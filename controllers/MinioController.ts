import {minio} from "../services/minio";
import {Readable} from "stream";
import {BucketItemStat} from "minio";
import {OpenfassController} from "./OpenfassController";
// import {throws} from "assert";



export class MinioController {

    public static async getAllFileVersions(nameFile: string) {
        return minio().listObjects(process.env.MINIO_BUCKET,nameFile,true, {IncludeVersion: true})
    }

    public static async getFile(fileName: string) {
        return minio().getObject(process.env.MINIO_BUCKET, fileName/*, {versionId:"my-versionId"}*/)
    }

    public static async getFileByVersion(fileName: string, version: string) {
        return minio().getObject(process.env.MINIO_BUCKET, fileName, {versionId: version})
    }

    public static async senfFileToMinio(fileName: string, code: Readable) {
        return minio().putObject(process.env.MINIO_BUCKET, fileName, code)
    }

    public static async deleteFile(nameFile: string) {
        try {
        await minio().removeObject(process.env.MINIO_BUCKET, nameFile);
        await minio().removeObject(process.env.MINIO_BUCKET, nameFile + "_res");
        } catch (e) {
            throw "bad request";
        }
    }

    public static async senfFileToMinioAndExec(fileName: string, codeToInsert: string, codeToExec: string) {
        // try {

        //     await this.getFile(fileName)
        //         .then(async (dataStream) => {
        //             const chunks: string[] = [];
        //             dataStream.on('data', (chunk: any) => {
        //                 chunks.push(chunk.toString());
        //             })
        //             const res = await dataStream.on('end', () => {
        //                 if(chunks[0] == codeToInsert) {
        //
        //                 }
        //             })
        //
        //             console.log(res)
        //         })
        //         .catch((error: any) => {
        //             console.log("Error : " + error);
        //             throw "toto"
        //         });
        //
        // } catch (e) {
        //     console.log("dinguerie")
        // }


        let openfaasRes = await OpenfassController.execCodeOpenFaas(codeToExec);
        return {
            "minio_code": await minio().putObject(process.env.MINIO_BUCKET, fileName, codeToInsert as string),
            "minio_result_code": await minio().putObject(process.env.MINIO_BUCKET, fileName + "_res", openfaasRes.toString()),
            "result_of_exec": openfaasRes
        }
    }
}


