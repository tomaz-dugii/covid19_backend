
import {Request, Response} from 'express'
import {db} from './db'

export async function listCovid19perDay(req: Request, res: Response) {
    db.multi('SELECT * FROM dnevnipodatki')
        .then(function (data) {
            console.log('List of Covid19 daily data: ', data );
            return res.status(200).send(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            return res.send('Query error for list players');
    });
}