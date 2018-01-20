import { Gdx2 } from '../src/Gdx2';

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
	 * @param {string} configPath コンフィグへのパス
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 */
	public generateAuthUrl(configPath: string, clientSecretPath: string) {
		console.log(new Gdx2(configPath).auth.generateAuthUrl(clientSecretPath));
	}

	/**
	 * 証明情報を生成します
	 * @param {string} configPath コンフィグへのパス
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @param {string} code 認証コード
	 */
	public async getCredentials(configPath: string, clientSecretPath: string, code: string) {
		console.log(await new Gdx2(configPath).auth.getCredentials(clientSecretPath, code));
	}

	/**
	 * 証明情報を再生成します
	 * @param {string} configPath コンフィグへのパス
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 */
	public async refreshCredentials(configPath: string, clientSecretPath: string) {
		console.log(await new Gdx2(configPath).auth.refreshCredentials(clientSecretPath));
	}

}

new auth().run(process.argv);
