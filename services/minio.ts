// import Minio from 'minio';


export function minio() {
    const Minio = require('minio');

    let minioClient;
    minioClient = new Minio.Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'minio_admin',
        secretKey: 'minio1234'
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
