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
exports.listTransactionLog = void 0;
const db_1 = require("./db");
function listTransactionLog(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = req.query.name;
        let sessionID = req.query.session;
        let playerID = 0;
        if (name == undefined && sessionID == undefined) {
            console.log('Specify player\'s name or sessionID:  \n /deposit?name=playername&session=sessionID&amount=value');
            return res.send('Specify player\'s name or sessionID /deposit?name=playername&session=sessionID&amount=value');
        }
        if (sessionID == undefined)
            sessionID = '0';
        if (name != undefined) {
            // get player ID
            const dbDone = yield db_1.db.one('SELECT DISTINCT "pla"."ID" FROM players pla WHERE "pla"."playerName" = $1 ', [name])
                .then(function (data) {
                playerID = data.ID;
            })
                .catch(function (error) {
                console.log('ERROR:', error);
                return res.send('Cannot find playerID for selected player');
            });
        }
        console.log('PlayerID: ', playerID + ' ,sessionID: ' + sessionID);
        // get transaction logs for selected player or sessions
        db_1.db.multi('SELECT * FROM "transactionHistory" WHERE "playerID" = $1 OR "sessionID" = $2 ', [playerID, sessionID])
            .then(function (data) {
            console.log('Transaction history: ', data);
            return res.status(200).send(data);
        })
            .catch(function (error) {
            console.log('ERROR:', error);
            return res.send('Query error for transaction history');
        });
    });
}
exports.listTransactionLog = listTransactionLog;
//# sourceMappingURL=listTransactionLog.js.map