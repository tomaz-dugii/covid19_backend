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
exports.createSession = void 0;
const db_1 = require("./db");
function createSession(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = req.query.name;
        if (name == undefined) {
            console.log('Missing player\'s name Name: ' + name + ' \n /createSession?name=playername');
            return res.send('Missing player\'s name /createPlayer?name=playername');
        }
        db_1.db.tx(t => {
            // creating a sequence of transaction queries:
            return t.one('SELECT "ID" FROM players pla WHERE "pla"."playerName" = $1 ', [name])
                .then(function (user) {
                console.log("Preparing session for playerID: " + user.ID);
                return t.one('INSERT INTO sessions ("playerID") values ($1) RETURNING "ID" ', [user.ID]);
            });
        })
            .then(data => {
            console.log("Created session for player Name: " + name);
            console.log('SessionID: ', data);
            //return res.send('Created session for player ' + name + 'ID: ' + data );
            return res.status(200).send(data);
        })
            .catch(error => {
            // failure, ROLLBACK was executed
            console.log('ERROR:', error);
            return res.send('Error creating session for player');
        });
    });
}
exports.createSession = createSession;
//# sourceMappingURL=createSession.js.map