import { GAuth, ClientSecret } from '../lib/GAuth';

/**
 * Google auth APIs
 */
export class Auth {
	/**
	 * インスタンスを生成します
	 * @param {GAuth} gAuth 認証ライブラリ
	 */
	public constructor(
		private readonly gAuth: GAuth
	) {}

	/**
	 * 認証用URLを生成します
	 * @return {string}
	 */
	public generateAuthUrl() {
		return this.gAuth.generateAuthUrl();
	}

	/**
	 * 証明情報を生成します
	 * @param {string} code 認証コード
	 * @return {Promise<string>}
	 */
	public async getCredentials(code: string) {
		return JSON.stringify(await this.gAuth.getCredentials(code));
	}

	/**
	 * 証明情報を再生成します
	 * @return {Promise<string>}
	 */
	public async refreshCredentials() {
		return JSON.stringify(await this.gAuth.refreshCredentials());
	}
}
