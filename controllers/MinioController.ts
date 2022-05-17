import {minio} from "../services/minio";
import {Readable} from "stream";
import {BucketItemStat} from "minio";
import {throws} from "assert";


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

    public sendExecutionCode(etagSourceCode: string) {

    }

}
