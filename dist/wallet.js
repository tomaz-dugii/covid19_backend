"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deposit_1 = require("./deposit");
const withdraw_1 = require("./withdraw");
const usagesynopsis_1 = require("./usagesynopsis");
const createplayer_1 = require("./createplayer");
const listPlayers_1 = require("./listPlayers");
const createSession_1 = require("./createSession");
const listSessions_1 = require("./listSessions");
const listTransactionLog_1 = require("./listTransactionLog");
const app = express_1.default();
const port = 3000;
// ----------- Usage Synopsis ----------------------------------------------------------------------
app.get('/', (req, res) => usagesynopsis_1.usagesynopsis(req, res));
// ---------  Wallet and player creation -----------------------------------------------------------
app.get('/createPlayer', (req, res) => createplayer_1.createPlayer(req, res));
// ---------  List all players from the db ---------------------------------------------------------
app.get('/players', (req, res) => listPlayers_1.listPlayers(req, res));
// ---------  create session for player ------------------------------------------------------------
app.get('/createSession', (req, res) => createSession_1.createSession(req, res));
// ---------  list sessions for player -------------------------------------------------------------
app.get('/listSessions', (req, res) => listSessions_1.listSessions(req, res));
// ---------  Deposit for player within session ----------------------------------------------------
app.get('/deposit', (req, res) => deposit_1.deposit(req, res));
// ---------  Withdraw for player within session ---------------------------------------------------
app.get('/withdraw', (req, res) => withdraw_1.withdraw(req, res));
//--------------- list transaction log for player or session ---------------------------------------
//      http://localhost:3000/logs?name=Anton&session=<sessionID>
app.get('/logs', (req, res) => listTransactionLog_1.listTransactionLog(req, res));
// ------------------- Listener --------------------------------------------------------------------
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
//# sourceMappingURL=wallet.js.map