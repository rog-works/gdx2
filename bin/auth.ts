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
	 * コンフィグを取得します
	 * @return {Gdx2Config}
	 */
	private get config() {
		return {
			clientSecret: '.google/client_secret.json',
			credentials: '.google/credentials.json',
		}
	}

	/**
	 * 認証用URLを生成します
	 */
	public generateAuthUrl() {
		console.log(new Gdx2(this.config).auth.generateAuthUrl());
	}

	/**
	 * 証明情報を生成します
	 * @param {string} code 認証コード
	 */
	public async getCredentials(code: string) {
		console.log(await new Gdx2(this.config).auth.getCredentials(code));
	}

	/**
	 * 証明情報を再生成します
	 */
	public async refreshCredentials() {
		console.log(await new Gdx2(this.config).auth.refreshCredentials());
	}
}

new auth().run(process.argv);
