class files {
	run(argv) {
		const command = argv[2];
		const args = argv.slice(3);
		if (this[command]) {
			this[command](...args);
		}
	}

	list(configPath) {
		const Gdx2 = require('../dist/Gdx2').Gdx2;

		const config = this._loadConfig(configPath);
		new Gdx2(config).files.list()
			.then((response) => console.log(response));
	}

	_loadConfig(path) {
		const fs = require('fs');
		if (!fs.statSync(path).isFile) {
			throw new Error(`Config file not found. ${path}`);
		}
		return JSON.parse(fs.readFileSync(path));
	}
}

new files().run(process.argv);
