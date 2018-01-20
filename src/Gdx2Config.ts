import * as fs from 'fs';
import * as path from 'path';

/**
 * コンフィグ
 */
export class Gdx2Config {
	/** トークン */
	public readonly token: string;

	/**
	 * インスタンスを生成します
	 * @param configPath コンフィグファイルへのパス
	 */
	public constructor(configPath: string) {
		this.token = './.google/credentials.json';
		try {
			const config = this.loadJSON<this>(configPath);
			this.token = config.token;
		} catch (err) {
			console.warn(err);
		}
	}

	/**
	 * JSONファイルを読み込みます
	 * @param {string} filePath パス
	 * @return {T}
	 * @throws {Error} ファイルが存在しない場合に発生
	 */
	private loadJSON<T>(filePath: string) {
		const realPath = path.isAbsolute(filePath) ? filePath : path.normalize(path.join(process.cwd(), filePath));
		if (!fs.statSync(realPath).isFile) {
			throw new Error(`File not found. ${path}`);
		}
		return <T>JSON.parse(fs.readFileSync(realPath).toString());
	}
}
