import {Request, Response} from 'express'
import {db} from './db'

export async function usagesynopsis(req: Request, res: Response) {
    return res.send('Usage synopsis: <br><br>\
        * list covid per day: <br>\
            - http://localhost:3000/covidPerday <br>\
        <br>\
        * list covid per week: <br>\
            - http://localhost:3000/listTedenskiPodatki <br>\
        <br>\
        * list milk data per week: <br>\
            - http://localhost:3000/listMleko <br>\
        <br>\
        * list butter data per week: <br>\
            - http://localhost:3000/listMaslo <br>\
        <br>\
     ');
}

