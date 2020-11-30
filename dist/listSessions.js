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
exports.listSessions = void 0;
const db_1 = require("./db");
function listSessions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = req.query.name;
        if (name == undefined) {
            console.log('Missing player\'s name Name: ' + name + ' \n /listSessions?name=playername');
            return res.send('Missing player\'s name /listSessions?name=playername');
        }
        //SELECT "ses"."ID" FROM sessions ses JOIN players pla ON "pla"."ID" = "ses"."playerID" WHERE "pla"."playerName" = 'Frederik'
        db_1.db.multi('SELECT "ses"."ID" FROM sessions ses JOIN players pla ON "pla"."ID" = "ses"."playerID" WHERE "pla"."playerName" = $1 ', [name])
            .then(function (data) {
            console.log('List of sessions for player ' + name + ': ', data);
            return res.status(200).send(data);
        })
            .catch(function (error) {
            console.log('ERROR:', error);
            return res.send('Query error for list player sessions');
        });
    });
}
exports.listSessions = listSessions;
//# sourceMappingURL=listSessions.js.map