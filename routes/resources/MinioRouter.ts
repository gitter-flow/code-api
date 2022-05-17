import Express from "express";
import {MinioController} from "../../controllers/MinioController";
import {BucketItemStat} from "minio";
import {Readable} from "stream";

const minioRouter = Express.Router();


minioRouter.get('/code', async (req, res) => {
    if(!req.query.namefile) {
        res.status(400).end()
    }
    // MinioController.getListItem()
    MinioController.getFileFromMinio(req.query.namefile as string)
        .then((dataStream) => {
            const chunks: string[] = [];
            dataStream.on('data', (chunk: any) => {
                chunks.push(chunk.toString());
            })
            dataStream.on('end', function() {
                res.status(200).send(
                    chunks.toString()
                ).end()
            })


        })
        .catch((error: any) => {
            res.status(400).end()
            console.log(error);
        });

})


minioRouter.post('/code', async (req, res) => {
    let code: Readable = req.body.data

    MinioController.senfFileToMinio(req.body.namefile as string, code)
        .then((result) => {
            res.status(201).json({
                result
            }).end()
        })
        .catch((error: any) => {
            res.status(400).end()
            console.log(error);
        });

})



export {
    minioRouter
}
