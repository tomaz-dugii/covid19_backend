import express from "express";
import {db} from './db';
import { deposit } from "./deposit";
import { withdraw } from "./withdraw";
import { usagesynopsis } from "./usagesynopsis";
import { createPlayer } from "./createplayer";
import { listPlayers } from "./listPlayers";
import { createSession } from "./createSession";
import { listSessions } from "./listSessions";
import { listTransactionLog } from "./listTransactionLog";

const app = express();
const port = 3000;


// ----------- Usage Synopsis ----------------------------------------------------------------------
app.get('/', (req, res) => usagesynopsis(req, res));

// ---------  Wallet and player creation -----------------------------------------------------------
app.get('/createPlayer', (req, res) => createPlayer(req, res));

// ---------  List all players from the db ---------------------------------------------------------
app.get('/players', (req, res) => listPlayers(req, res));

// ---------  create session for player ------------------------------------------------------------
app.get('/createSession', (req, res) => createSession(req, res));

// ---------  list sessions for player -------------------------------------------------------------
app.get('/listSessions', (req, res) => listSessions(req, res));

// ---------  Deposit for player within session ----------------------------------------------------
app.get('/deposit', (req, res) => deposit(req, res));

// ---------  Withdraw for player within session ---------------------------------------------------
app.get('/withdraw', (req, res) => withdraw(req, res));

//--------------- list transaction log for player or session ---------------------------------------
//      http://localhost:3000/logs?name=Anton&session=<sessionID>
app.get('/logs', (req, res) => listTransactionLog(req, res));


// ------------------- Listener --------------------------------------------------------------------
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))


