import * as fs from 'fs';
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

	public generateAuthUrl(clientSecretJson: string) {
		console.log(new Gdx2().auth.generateAuthUrl(clientSecretJson));
	}

	public async getToken(clientSecretJson: string, code: string) {
		console.log(await new Gdx2().auth.getToken(clientSecretJson, code));
	}
}

new auth().run(process.argv);
