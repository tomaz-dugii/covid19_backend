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
exports.createPlayer = void 0;
const db_1 = require("./db");
function createPlayer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = req.query.name;
        let password = req.query.password;
        if (name == undefined) {
            console.log('Missing player\'s name Name: ' + name + ' password: ' + password + ' \n /createPlayer?name=name&password=pass');
            return res.send('Missing player\'s name /createPlayer?name=name&password=pass');
        }
        //if (password == undefined) password = null;  // will be undefined anyway and the DB accepts its value as null
        db_1.db.tx(t => {
            // creating a sequence of transaction queries:
            return t.one('INSERT INTO players ("playerName","password") values ($1, $2) RETURNING "ID" ', [name, password])
                .then(function (user) {
                console.log("Preparing wallet playerID: " + user.ID);
                return t.one('INSERT INTO wallet ("playerID") values ($1) RETURNING "playerID" ', [user.ID]);
            });
            // returning a promise that determines a successful transaction:
            //return t.batch([q1, q2]); // all of the queries are to be resolved;
        })
            .then(data => {
            console.log("Created wallet for player Name: " + name + " password: " + password);
            console.log('PlayerID: ', data);
            return res.send('Created wallet for player: ' + name + " password: " + password);
        })
            .catch(error => {
            // failure, ROLLBACK was executed
            console.log('ERROR:', error);
            return res.send('Error creating player');
        });
    });
}
exports.createPlayer = createPlayer;
//# sourceMappingURL=createplayer.js.map