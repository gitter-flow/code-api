
export function minio() {
    const Minio = require('minio');

    // console.log(parseInt(port));
    let minioClient;
    minioClient = new Minio.Client({
        endPoint: process.env.MINIO_HOST,
        port: Number(process.env.MINIO_PORT),
        useSSL: false,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY
    });

    // let versioningConfig = {Status:"Enabled"}
    // minioClient.setBucketVersioning(process.env.MINIO_BUCKET,versioningConfig, (err: any) =>{
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Success")
    // })

    return minioClient
}
