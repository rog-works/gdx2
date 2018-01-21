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
	 * @param {string} config コンフィグ
	 */
	public constructor(config: Gdx2Config) {
		const gAuth = new GAuth(config.clientSecret, config.credentials);
		const gd = new GD(gAuth);
		this.auth = new Auth(gAuth);
		this.files = new Files(gd);
	}
}

/**
 * コンフィグ
 */
export interface Gdx2Config {
	clientSecret: string;
	credentials: string;
}
