import {config} from "dotenv";
config();
import Express from 'express';
import {buildRoutes} from "./routes";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import {requestToDB} from "./services/bdd/neo4j";
let cors = require('cors');
// import {insertFirstData} from './FirstData';

// insertFirstData().then(function() {});

const app = Express();
app.use(Express.json());
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use(Express.urlencoded({extended: true}));
app.use(fileUpload({
    createParentPath: true
}));

buildRoutes(app);

// requestToDB("toto").then(r => console.log("here"))


const port = parseInt(process.env.apiport as string) || 3000;
app.listen(port, function () {
    console.log('listening on ' + port);
});
