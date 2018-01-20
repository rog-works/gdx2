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
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @return {string}
	 */
	public generateAuthUrl(clientSecretPath: string) {
		return this.gAuth.generateAuthUrl(clientSecretPath);
	}

	/**
	 * 証明情報を生成します
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @param {string} code 認証コード
	 * @return {Promise<string>}
	 */
	public async getCredentials(clientSecretPath: string, code: string) {
		return JSON.stringify(await this.gAuth.getCredentials(clientSecretPath, code));
	}

	/**
	 * 証明情報を再生成します
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @return {Promise<string>}
	 */
	public async refreshCredentials(clientSecretPath: string) {
		return JSON.stringify(await this.gAuth.refreshCredentials(clientSecretPath));
	}
}
