
import {Request, Response} from 'express'
import {db} from './db'

export async function listSessions(req: Request, res: Response) {
    let name = req.query.name;

    if (name == undefined)
    {
        console.log('Missing player\'s name Name: ' + name + ' \n /listSessions?name=playername');
        return res.send('Missing player\'s name /listSessions?name=playername');
    }

    //SELECT "ses"."ID" FROM sessions ses JOIN players pla ON "pla"."ID" = "ses"."playerID" WHERE "pla"."playerName" = 'Frederik'
    db.multi('SELECT "ses"."ID" FROM sessions ses JOIN players pla ON "pla"."ID" = "ses"."playerID" WHERE "pla"."playerName" = $1 ', [name])
        .then(function (data) {
             console.log('List of sessions for player ' + name + ': ', data );

              return res.status(200).send(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            return res.send('Query error for list player sessions');
    })
}
