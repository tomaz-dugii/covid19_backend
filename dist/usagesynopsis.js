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
exports.usagesynopsis = void 0;
function usagesynopsis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send('Usage synopsis: <br><br>\
        * player and wallet creation: <br>\
        - http://localhost:3000/createPlayer?name=Anton&password=pass <br>\
        <br>\
        * list players: <br>\
            - http://localhost:3000/players <br>\
        <br>\
        * create session for named player: <br>\
            - http://localhost:3000/createSession?name=Anton <br>\
        <br>\
        * list sessions for named player <br>\
            - http://localhost:3000/listSessions?name=Anton <br>\
        * deposit for player within session: <br>\
            - http://localhost:3000/deposit?name=Anton&session=sessionID&amount=value <br>\
        * withdraw for player within session <br>\
            - http://localhost:3000/withdraw?name=Anton&session=sessionID&amount=value <br>\
        <br>\
        * list transaction log for player or session or both: <br>\
            - http://localhost:3000/logs?name=Anton&session=sessionID <br>\
    ');
    });
}
exports.usagesynopsis = usagesynopsis;
//# sourceMappingURL=usagesynopsis.js.map