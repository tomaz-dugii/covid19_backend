
import {Request, Response} from 'express'
import {db} from './db'

export async function createPlayer(req: Request, res: Response) {
    let name = req.query.name;
    let password = req.query.password;

    if (name == undefined) 
    {
        console.log('Missing player\'s name Name: ' + name + ' password: ' + password + ' \n /createPlayer?name=name&password=pass');
        return res.send('Missing player\'s name /createPlayer?name=name&password=pass');
    }
    //if (password == undefined) password = null;  // will be undefined anyway and the DB accepts its value as null

    db.tx(t => {
        // creating a sequence of transaction queries:
        return t.one('INSERT INTO players ("playerName","password") values ($1, $2) RETURNING "ID" ', [name, password])
            .then(function (user) {
                console.log("Preparing wallet playerID: " + user.ID);
                return t.one('INSERT INTO wallet ("playerID") values ($1) RETURNING "playerID" ', [user.ID]);
            });
            // returning a promise that determines a successful transaction:
            //return t.batch([q1, q2]); // all of the queries are to be resolved;
        })
        .then(data => {
            console.log("Created wallet for player Name: " + name + " password: " + password);
            console.log('PlayerID: ', data );
            return res.send('Created wallet for player: ' + name + " password: " + password);
        })
        .catch(error => {
            // failure, ROLLBACK was executed
            console.log('ERROR:', error)
            return res.send('Error creating player');
    });
}