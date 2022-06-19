import Minio from 'minio';


export function minio() {
    const Minio = require('minio');

    let minioClient;
    minioClient = new Minio.Client({
        endPoint: process.env.MINIO_URL,
        useSSL: true,
        port: 443,
        accessKey: process.env.MINIO_USER,
        secretKey: process.env.MINIO_SECRETKEY,
        // region: 'us-east-2'
    });

    minioClient.traceOn(process.stdout)

    // port: 9000,
    // useSSL: false,

    // let versioningConfig = {Status:"Enabled"}
    // minioClient.setBucketVersioning(process.env.MINIO_BUCKET,versioningConfig, (err: any) =>{
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Success")
    // })

    return minioClient
}
