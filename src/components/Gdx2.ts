import { GD } from './GD';
import { Auth, AuthConfig } from './Auth';
import { Files } from './Files';

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
		const auth = new Auth(config);
		const gd = new GD(auth);
		this.auth = auth;
		this.files = new Files(gd);
	}
}
