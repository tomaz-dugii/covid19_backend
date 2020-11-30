import {Request, Response} from 'express'
import {db} from './db'

export async function createSession(req: Request, res: Response) {
    let name = req.query.name;

    if (name == undefined)
    {
        console.log('Missing player\'s name Name: ' + name + ' \n /createSession?name=playername');
        return res.send('Missing player\'s name /createPlayer?name=playername');
    }

    db.tx(t => {
        // creating a sequence of transaction queries:
        return t.one('SELECT "ID" FROM players pla WHERE "pla"."playerName" = $1 ', [name])
            .then(function (user) {
                console.log("Preparing session for playerID: " + user.ID);
                return t.one('INSERT INTO sessions ("playerID") values ($1) RETURNING "ID" ', [user.ID]);
            });
        })
        .then(data => {
            console.log("Created session for player Name: " + name );
            console.log('SessionID: ', data );
            //return res.send('Created session for player ' + name + 'ID: ' + data );
            return res.status(200).send(data);
        })
        .catch(error => {
            // failure, ROLLBACK was executed
            console.log('ERROR:', error)
            return res.send('Error creating session for player');
    });
}
