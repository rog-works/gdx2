class auth {
	run(...argv) {
		const command = argv[2];
		const args = argv.slice(2);
		if (this[command]) {
			this[command](...args);
		} else {
			throw new Error(`Not supported command ${command}`);
		}
	}

	generateAuthUrl(configPath) {
		const Gdx2 = require('../dist/Gdx2.js').Gdx2;

		const config = this._loadConfig(configPaht);
		new Gdx2(config).auth.generateAuthUrl()
			.then(authUrl => console.log(authUrl));
	}

	getToken(configPath) {
		const Gdx2 = require('../dist/Gdx2.js').Gdx2;

		const config = this._loadConfig(configPaht);
		new Gdx2(config).auth.getToken()
			.then(authUrl => console.log(authUrl));
	}

	_loadConfig(path) {
		const fs = require('fs');
		if (!fs.statSync(path).isFile) {
			throw new Error(`Config file not found. ${path}`);
		}
		return JSON.parse(fs.readFileSync(configPath));
	}
}

new auth().run(process.argv);
