import express from "express";
import {db} from './db';
import { listCovid19perDay } from "./listCovid19perDay";
import { listTedenskiPodatki } from "./listTedenskiPodatki";
import { listMaslo } from "./listMaslo";
import { listMleko } from "./listMleko";
import { usagesynopsis } from "./usagesynopsis";

const app = express();
const port = 3000;


// ----------- Usage Synopsis ----------------------------------------------------------------------
app.get('/', (req, res) => usagesynopsis(req, res));

// ---------  List all covid19 / day data ---------------------------------------------------------
app.get('/covidPerday', (req, res) => listCovid19perDay(req, res));

app.get('/listTedenskiPodatki', (req, res) => listTedenskiPodatki(req, res));

app.get('/listMaslo', (req, res) => listMaslo(req, res));

app.get('/listMleko', (req, res) => listMleko(req, res));


// ------------------- Listener --------------------------------------------------------------------
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))


