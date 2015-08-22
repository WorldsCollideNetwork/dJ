# dJ
This is source repository for the WCN dJ.

The WCN dJ allows for users on the main WCN Teamspeak server (t4i.teamspeak.cc) to request music at their disposal to play in the general channel.

This program is not intended to run on any server excluding WCN. If you wish to install this program on your own system, clone this repository and figure it out. Knowledge of node.js greatly helps.

### Default Configuration
Create a `CONFIG.json` file in `src/` with the following properties.

	{
		"port": 80,
		"login_request": "http://worldscolli.de/api/login",
		"encryption": {
			"algorithm": "blowfish",
			"password": "SAMPLE_PASS_HERE"
		}
	}