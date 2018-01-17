import { AuthConfig } from './lib/GAuth.d';
import { GAuth } from './lib/GAuth';
import { GD } from './lib/GD';
import { Auth } from './apis/Auth';
import { Files } from './apis/Files';

export class Gdx2 {
	/** auth API */
	public readonly auth: Auth;
	/** files API */
	public readonly files: Files;

	/**
	 * インスタンスを生成します
	 * @param config 認証情報コンフィグ
	 */
	public constructor(config: AuthConfig) {
		const gAuth = new GAuth(config);
		const gd = new GD(gAuth);
		this.auth = new Auth(gAuth);
		this.files = new Files(gd);
	}
}
