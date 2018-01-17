import * as fs from 'fs';
import { AuthConfig } from '../src/lib/GAuth.d';
import { Gdx2 } from '../src/Gdx2';

class auth {
	public run(argv: string[]) {
		const command = argv[2];
		const args = argv.slice(3);
		if (this[command]) {
			this[command](...args);
		} else {
			throw new Error(`Not supported command ${command}`);
		}
	}

	public async generateAuthUrl(configPath: string) {
		const config = this._loadConfig(configPath);
		console.log(await new Gdx2(config).auth.generateAuthUrl());
	}

	public async getToken(configPath: string) {
		const config = this._loadConfig(configPath);
		console.log(await new Gdx2(config).auth.getToken());
	}

	private _loadConfig(path): AuthConfig {
		if (!fs.statSync(path).isFile) {
			throw new Error(`Config file not found. ${path}`);
		}
		return JSON.parse(fs.readFileSync(path).toString());
	}
}

new auth().run(process.argv);
