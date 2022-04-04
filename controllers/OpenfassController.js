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
exports.OpenfassController = void 0;
const axios_1 = __importDefault(require("axios"));
class OpenfassController {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.instance === undefined) {
                OpenfassController.instance = new OpenfassController();
            }
            return OpenfassController.instance;
        });
    }
    sendRequest(file) {
        return __awaiter(this, void 0, void 0, function* () {
            file.mv('./uploads/' + file.name);
            yield axios_1.default.get("https://raw.githubusercontent.com/openfaas/faas/master/api-docs/swagger.yml")
                .then((res) => {
                console.log(res);
            })
                .catch((e) => {
                console.log(e);
            });
        });
    }
    testOpenFaas(body) {
        return (0, axios_1.default)({
            method: "get",
            url: "http://127.0.0.1:8080/function/executor",
            data: body
        })
            .then((res) => {
            return res.data;
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
exports.OpenfassController = OpenfassController;
