import {Request, Response} from 'express'
import {db} from './db'

export async function withdraw(req: Request, res: Response) {
    let name = req.query.name;
    let sessionID = req.query.session;
    let amountDef = req.query.amount; //req.query.amount?.toString
    let amount:number;
    let playerID:number;
    let balance:number;

    if (name == undefined)
    {
        console.log('Missing player\'s name: ' + name + ' \n /withdraw?name=playername&session=sessionID&amount=value');
        return res.send('Missing player\'s name /withdraw?name=playername&session=sessionID&amount=value');
    }
    else if (sessionID == undefined)
    {
        console.log('Missing sessionID for player: ' + name + ' \n /withdraw?name=playername&session=sessionID&amount=value');
        return res.send('Missing sessionID /withdraw?name=playername&session=sessionID&amount=value');
    }
    else if (amountDef == undefined)
    {
        console.log('Missing money transaction amount for player: ' + name + ' \n /withdraw?name=playername&session=sessionID&amount=value');
        return res.send('Missing money transaction amount /withdraw?name=playername&session=sessionID&amount=value');
    }

    amount = parseFloat(amountDef as string);
    if (isNaN(amount))
    {
        console.log('The amount value is not numeric');
        return res.send('Amount value not a numeric value');
    }

    // get player ID, also is a check for sessionID presence
    const dbDone = await db.one('SELECT DISTINCT "pla"."ID" FROM players pla, sessions ses \
                                WHERE "pla"."playerName" = $1 AND "ses"."playerID" = "pla"."ID" AND "ses"."ID" = $2 ', [name, sessionID])
        .then(function (data) {
            playerID = data.ID;
            console.log('PlayerID: ', playerID );
        })
        .catch(function (error) {
            console.log('ERROR:', error);
            return res.send('Cannot find player with provided session');
    })

    // TRANSACTION check wallet to get the balance, modify wallet, add transaction log
    db.tx(t => {
        return t.one('SELECT balance FROM wallet wal WHERE "wal"."playerID" = $1', [playerID])
            .then(function (user) {
                balance = parseFloat(user.balance.slice(1));
                let newBalance:number = balance - amount;

                console.log("Preparing withdrawal for playerID: " + playerID + ' ,with current balance of: ' + balance + ' ,newBalance: ' + newBalance);
                return t.none('UPDATE wallet SET "balance" = $1 WHERE "playerID" = $2 ', [newBalance, playerID])
                .then(function () {
                    return t.none('INSERT INTO "transactionHistory" ("playerID", "sessionID", "balanceBefore", "withdraw") values ($1,$2,$3,$4) ', [playerID, sessionID, balance, amount]);
                });
            });
            // returning a promise that determines a successful transaction:
        })
        .then(data => {
            console.log("Withdrawn amount from wallet for player Name: " + name + " ,amount: " + amount + ' ,SessionID: ' + sessionID + ' ,previousBalance: ' + balance);
            return res.send('Withdrawn amount from wallet for player: ' + name + " ,amount: " + amount + ' ,SessionID: ' + sessionID + ' ,previousBalance: ' + balance);
        })
        .catch(error => {
            // failure, ROLLBACK was executed
            console.log('ERROR:', error)
            return res.send('Error withdrawing money from player wallet');
    });

}
