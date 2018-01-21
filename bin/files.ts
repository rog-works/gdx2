import { Gdx2 } from '../src/Gdx2';

class files {
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
	 * ファイルのメタ情報リストを取得します
	 */
	public async list() {
		const list = await new Gdx2(this.config).files.list()
			.prettyPrint(true)
			.request();
		console.log(list);
	}
}

new files().run(process.argv);
