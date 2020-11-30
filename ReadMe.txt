

* npm run start - for compilation etc.

http://localhost:3000/   - will display the usage synopsis:

Usage synopsis:
	* player and wallet creation:
        	- http://localhost:3000/createPlayer?name=Anton&password=pass
        * list players:
            	- http://localhost:3000/players

        * create session for named player:
            - http://localhost:3000/createSession?name=Anton
        * list sessions for named player
            - http://localhost:3000/listSessions?name=Anton

        * deposit for player within session:
            - http://localhost:3000/deposit?name=Anton&session=sessionID&amount=value
        * withdraw for player within session
            - http://localhost:3000/withdraw?name=Anton&session=sessionID&amount=value

        * list transaction log for player or session or both:
            - http://localhost:3000/logs?name=Anton&session=sessionID

