import express from "express";
import {db} from './db';
import { listCovid19perDay } from "./listCovid19perDay";
import { usagesynopsis } from "./usagesynopsis";

const app = express();
const port = 3000;


// ----------- Usage Synopsis ----------------------------------------------------------------------
app.get('/', (req, res) => usagesynopsis(req, res));

// ---------  List all covid19 / day data ---------------------------------------------------------
app.get('/covidPerday', (req, res) => listCovid19perDay(req, res));



// ------------------- Listener --------------------------------------------------------------------
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))


