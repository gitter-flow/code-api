"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openfaasRouter = void 0;
const express_1 = __importDefault(require("express"));
const OpenfassController_1 = require("../../controllers/OpenfassController");
const openfaasRouter = express_1.default.Router();
exports.openfaasRouter = openfaasRouter;
openfaasRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const openfassController = yield OpenfassController_1.OpenfassController.getInstance();
    // if(!req.files) {
    //     res.send({
    //         message: 'No file uploaded'
    //     }).end();
    // }
    openfassController.sendRequest( /*req.files!.file1 as UploadedFile*/)
        .then(() => {
        res.status(200).json({
            message: "OK",
        }).end();
    })
        .catch((error) => {
        res.status(400).end();
        console.log(error);
    });
}));
openfaasRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const openfassController = yield OpenfassController_1.OpenfassController.getInstance();
    openfassController.execCodeOpenFaas(req.body.data)
        .then((result) => {
        res.status(200).json({
            message: result,
        }).end();
    })
        .catch((error) => {
        res.status(400).end();
        console.log(error);
    });
}));
