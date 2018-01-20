import * as fs from 'fs';
import { Gdx2, Gdx2Config } from '../src/Gdx2';

class auth {
	/**
	 * コマンドを実行します
	 * @param {string[]} argv プログラム引数
	 * @throws {Error} 存在しないコマンドを指定した際に発生
	 */
	public run(argv: string[]) {
		const command = argv[2] || '';
		const args = argv.slice(3);
		if (this[command]) {
			this[command](...args);
		} else {
			throw new Error(`Not supported command ${command}`);
		}
	}

	/**
	 * 認証用URLを生成します
	 * @param {string} clientSecretJson クライアントシークレットJSON
	 */
	public generateAuthUrl(clientSecretJson: string) {
		console.log(new Gdx2().auth.generateAuthUrl(clientSecretJson));
	}

	/**
	 * トークンを生成します
	 * @param {string} clientSecretJson クライアントシークレットJSON
	 * @param {string} code 認証コード
	 */
	public async getToken(clientSecretJson: string, code: string) {
		console.log(await new Gdx2().auth.getToken(clientSecretJson, code));
	}

	/**
	 * トークンを再生成します
	 * @param {string} configPath コンフィグへの絶対パス
	 */
	public async refreshAccessToken(configPath: string) {
		const config = this.loadConfig(configPath);
		console.log(await new Gdx2(config).auth.refreshAccessToken());
	}

	/**
	 * コンフィグを読み込みます
	 * @param {string} path コンフィグへの絶対パス
	 * @throws {Error} コンフィグファイルが存在しない場合に発生
	 */
	private loadConfig(path) {
		if (!fs.statSync(path).isFile) {
			throw new Error(`Config file not found. ${path}`);
		}
		return <Gdx2Config>JSON.parse(fs.readFileSync(path).toString());
	}
}

new auth().run(process.argv);
