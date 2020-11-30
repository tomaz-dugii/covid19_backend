
import {Request, Response} from 'express'
import {db} from './db'

export async function listTransactionLog(req: Request, res: Response) {
    let name = req.query.name;
    let sessionID = req.query.session;
    let playerID:number = 0;

    if (name == undefined && sessionID == undefined)
    {
        console.log('Specify player\'s name or sessionID:  \n /deposit?name=playername&session=sessionID&amount=value');
        return res.send('Specify player\'s name or sessionID /deposit?name=playername&session=sessionID&amount=value');
    }

    if (sessionID == undefined) sessionID = '0';
    if (name != undefined)
    {
        // get player ID
        const dbDone = await db.one('SELECT DISTINCT "pla"."ID" FROM players pla WHERE "pla"."playerName" = $1 ', [name])
            .then(function (data) {
                playerID = data.ID;
             })
            .catch(function (error) {
                console.log('ERROR:', error);
                return res.send('Cannot find playerID for selected player');
        })
    }

    console.log('PlayerID: ', playerID + ' ,sessionID: ' + sessionID );
    // get transaction logs for selected player or sessions
    db.multi('SELECT * FROM "transactionHistory" WHERE "playerID" = $1 OR "sessionID" = $2 ' , [playerID, sessionID])
        .then(function (data) {
            console.log('Transaction history: ', data );
            return res.status(200).send(data);
        })
        .catch(function (error) {
            console.log('ERROR:', error)
            return res.send('Query error for transaction history');
    })

}
