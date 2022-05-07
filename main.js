"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
let cors = require('cors');
// import {insertFirstData} from './FirstData';
// insertFirstData().then(function() {});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(cors({ origin: '*' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
(0, routes_1.buildRoutes)(app);
// requestToDB("toto").then(r => console.log("here"))
const port = parseInt(process.env.apiport) || 3000;
app.listen(port, function () {
    console.log('listening on ' + port);
});
