import { Gdx2Config } from './Gdx2Config';
import { GAuth } from './lib/GAuth';
import { GD } from './lib/GD';
import { Auth } from './apis/Auth';
import { Files } from './apis/Files';

/**
 * Google Drive APIs
 */
export class Gdx2 {
	/** auth API */
	public readonly auth: Auth;
	/** files API */
	public readonly files: Files;

	/**
	 * インスタンスを生成します
	 * @param {string} configPath コンフィグファイルへのパス
	 */
	public constructor(configPath: string) {
		const config = new Gdx2Config(configPath);
		const gAuth = new GAuth(config.clientSecret, config.credentials);
		const gd = new GD(gAuth);
		this.auth = new Auth(gAuth);
		this.files = new Files(gd);
	}
}
