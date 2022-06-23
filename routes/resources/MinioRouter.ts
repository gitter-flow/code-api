import Express from "express";
import {MinioController} from "../../controllers/MinioController";
import {Readable} from "stream";

const minioRouter = Express.Router();


minioRouter.get('/code', async (req, res) => {
    if(!req.query.namefile) {
        res.status(400).end()
    }
    MinioController.getFile(req.query.namefile as string)
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
            console.log("express : " + error);
            res.status(400).end()
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

minioRouter.put('/code', async (req, res) => {

    MinioController.senfFileToMinioAndExec(req.body.namefile as string, req.body.data.data as string, req.body.data as string)
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

minioRouter.get('/versions', async (req, res) => {

    MinioController.getAllFileVersions(req.body.namefile as string)
        .then((dataStream) => {
            const chunks: string[] = [];
            dataStream.on('data', (chunk: any) => {
                console.log(chunk)
                chunks.push(chunk);
            })
            dataStream.on('end', function() {
                // console.log(chunks)
                res.status(200).send(
                    chunks
                ).end()
            })
        })
        .catch((error: any) => {
            res.status(400).end()
            console.log(error);
        });
})

minioRouter.get('/version', async (req, res) => {

    MinioController.getFileByVersion(req.body.namefile as string, req.body.version_of_file as string)
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



export {
    minioRouter
}
