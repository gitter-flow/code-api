import Express from "express";
import {MinioController} from "../../controllers/MinioController";
import {Readable} from "stream";
import { Console } from "console";

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

minioRouter.delete('/code', async (req, res) => {

    MinioController.deleteFile(req.body.namefile as string)
        .then((result) => {
            res.status(204).json({
                result
            }).end()
        })
        .catch((error: any) => {
            res.status(400).end()
            console.log(error);
        });
})

minioRouter.get('/versionsoffile', async (req, res) => {

    MinioController.getAllFileVersions(req.query.namefile as string)
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

minioRouter.get('/fileversion', async (req, res) => {
    const version = req.query.version_of_file as string
    const file = req.query.namefile as string
    console.log(`version: ${version}`)
    console.log(`file: ${file}`)

    MinioController.getFileByVersion(req.query.namefile as string, req.query.version_of_file as string)
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
