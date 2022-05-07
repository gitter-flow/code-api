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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestToDB = void 0;
const neo4j = require('neo4j-driver');
const driver = neo4j.driver("127.0.0.1", neo4j.auth.basic(process.env.DB_NEO4J_USER, process.env.DB_NEO4J_PASSWORD));
const session = driver.session();
function requestToDB(personName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield session.run('CREATE (a:Person {name: $name}) RETURN a', { name: personName });
            const singleRecord = result.records[0];
            const node = singleRecord.get(0);
            console.log(node.properties.name);
        }
        finally {
            yield session.close();
        }
        // on application exit:
        yield driver.close();
    });
}
exports.requestToDB = requestToDB;
