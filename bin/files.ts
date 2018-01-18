import * as fs from 'fs';
import { Gdx2, Gdx2Config } from '../src/Gdx2';

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
	 * @param {string} configPath コンフィグへの絶対パス
	 */
	public async list(configPath: string) {
		const config = this.loadConfig(configPath);
		console.log(await new Gdx2(config).files.list());
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

new files().run(process.argv);
