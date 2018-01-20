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
	 * @param {string} clientSecretJson クライアントシークレットJSON
	 * @return {string}
	 */
	public generateAuthUrl(clientSecretJson: string) {
		return this.gAuth.generateAuthUrl(<ClientSecret>JSON.parse(clientSecretJson));
	}

	/**
	 * トークンを生成します
	 * @param {string} clientSecretJson クライアントシークレットJSON
	 * @param {string} code 認証コード
	 * @return {Promise<string>}
	 */
	public async getToken(clientSecretJson: string, code: string) {
		return JSON.stringify(await this.gAuth.getToken(<ClientSecret>JSON.parse(clientSecretJson), code));
	}

	/**
	 * トークンを再生成します
	 * @return {Promise<string>}
	 */
	public async refreshAccessToken() {
		return JSON.stringify(await this.gAuth.refreshAccessToken());
	}
}
