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
	 * ファイルのメタ情報リストを取得します
	 * @param {string} configPath コンフィグへのパス
	 */
	public async list(configPath: string) {
		console.log(await new Gdx2(configPath).files.list());
	}
}

new files().run(process.argv);
