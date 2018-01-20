import * as fs from 'fs';
import * as path from 'path';
import * as GoogleAuth from 'google-auth-library';

/**
 * Google認証ライプラリーラッパー
 */
export class GAuth {
	/**
	 * インスタンスを生成します
	 * @param {string} credentialsPath 証明情報へのパス
	 */
	public constructor(
		private readonly credentialsPath: string)
	{}

	/**
	 * 認証用URLを生成します
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @return {string}
	 */
	public generateAuthUrl(clientSecretPath: string) {
		const clientSecret = this.loadJSON<ClientSecret>(clientSecretPath);
		this.assertClientSecret(clientSecret);
		const client = this.createOAuth2Client(clientSecret);
		const options: GenerateAuthUrlConfig = {
			access_type: AccessTypes.Offline,
			scope: [ Scope.MetadataReadOnly ]
		};
		return client.generateAuthUrl(options);
	}

	/**
	 * 証明情報を生成します
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @param {string} code 認証コード
	 * @return {Promise<Credentials>}
	 */
	public async getCredentials(clientSecretPath: string, code: string) {
		const clientSecret = this.loadJSON<ClientSecret>(clientSecretPath);
		this.assertClientSecret(clientSecret);
		const client = this.createOAuth2Client(clientSecret);
		return this.requestGetToken(client, code);
	}

	/**
	 * 証明情報を再生成します
	 * @param {string} clientSecretPath クライアントシークレットへのパス
	 * @return {Promise<Credentials>}
	 */
	public async refreshCredentials(clientSecretPath: string) {
		const clientSecret = this.loadJSON<ClientSecret>(clientSecretPath);
		const client = this.createAuthorizedOAuth2Client(clientSecret);
		return this.requestRefreshAccessToken(client);
	}

	/**
	 * 証明付きのOAuth2クライアントを生成します
	 * @param {ClientSecret} clientSecret クライアントシークレット
	 * @return {OAuth2Client}
	 */
	public createAuthorizedOAuth2Client(clientSecret?: ClientSecret) {
		const client = this.createOAuth2Client(clientSecret);
		client.credentials = this.loadJSON<Credentials>(this.credentialsPath);
		return client;
	}

	/**
	 * クライアントシークレットを検証します
	 * @param {ClientSecret} クライアントシークレット
	 * @throws {Error} クライアントシークレットが正常でない場合に発生
	 */
	private assertClientSecret(clientSecret: ClientSecret) {
		const valid = clientSecret.installed.client_id &&
			clientSecret.installed.client_secret &&
			clientSecret.installed.redirect_uris[0];
		if (!valid) {
			throw new Error('Invalid Client Secret.');
		}
	}

	/**
	 * OAuth2クライアントを生成します
	 * @param {ClientSecret} クライアントシークレット
	 */
	private createOAuth2Client(clientSecret?: ClientSecret) {
		const googleAuth = new GoogleAuth();
		return new googleAuth.OAuth2(
			clientSecret ? clientSecret.installed.client_id : '',
			clientSecret ? clientSecret.installed.client_secret : '',
			clientSecret ? clientSecret.installed.redirect_uris[0] : ''
		);
	}

	/**
	 * トークン取得をリクエストします
	 * @param {OAuth2Client} client OAuth2クライアント
	 * @param {string} code コード
	 * @return {Promise<Credentials>}
	 */
	private async requestGetToken(client: any, code: string) {
		return new Promise((resolve, reject) => {
			client.getToken(code, (err: Error, credentials: Credentials) => err ? reject(err) : resolve(credentials));
		})
		.then((credentials: Credentials) => credentials);
	}

	/**
	 * トークン再取得をリクエストします
	 * @param {OAuth2Client} client OAuth2クライアント
	 * @param {string} code コード
	 * @return {Promise<Credentials>}
	 */
	private async requestRefreshAccessToken(client: any) {
		return new Promise((resolve, reject) => {
			client.refreshAccessToken((err: Error, credentials: Credentials) => err ?reject(err) : resolve(credentials));
		})
		.then((credentials: Credentials) => credentials);
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

/**
 * クライアントシークレット
 */
export interface ClientSecret {
	installed: {
		client_id: string;
		project_id: string;
		auth_uri: string;
		client_secret: string;
		auth_provider_x509_cert_url: string;
		redirect_uris: string[];
	}
}

/**
 * auth.getTokenで取得する証明情報
 */
export interface Credentials {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expiry_date: number;
}

/**
 * auth.generateAuthUrlで使用するアクセスタイプ
 */
export enum AccessTypes {
	Offline = 'offline'
}

/**
 * auth.generateAuthUrlで使用するスコープ
 */
export enum Scope {
	MetadataReadOnly = 'https://www.googleapis.com/auth/drive.metadata.readonly'
}

/**
 * auth.generateAuthUrlの引数
 */
export interface GenerateAuthUrlConfig {
	access_type: AccessTypes;
	scope: Scope[]
}
