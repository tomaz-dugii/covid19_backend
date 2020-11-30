import {Request, Response} from 'express'
import {db} from './db'

export async function usagesynopsis(req: Request, res: Response) {
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
}