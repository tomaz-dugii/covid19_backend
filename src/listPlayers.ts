
import {Request, Response} from 'express'
import {db} from './db'

export async function listPlayers(req: Request, res: Response) {
    db.multi('SELECT * FROM players')
        .then(function (data) {
            console.log('List of players: ', data );
            return res.status(200).send(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            return res.send('Query error for list players');
    });
}