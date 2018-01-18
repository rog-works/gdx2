import * as fs from 'fs';
import * as GoogleAuth from 'google-auth-library';

export class GAuth {
	/** 認証コンフィグ */
	private readonly credentialsPath: string;

	/**
	 * インスタンスを生成します
	 * @param {string} credentialsPath 証明情報へのパス
	 */
	public constructor(credentialsPath?: string) {
		this.credentialsPath = credentialsPath || './config/default.json';
	}

	/**
	 * 認証用URLを生成します
	 * @param {ClientSecret} clientSecret クライアントシークレット
	 * @return {string}
	 */
	public generateAuthUrl(clientSecret: ClientSecret) {
		this.assertClientSecret(clientSecret);
		const client = this.createClient(clientSecret);
		const options: GenerateAuthUrlConfig = {
			access_type: AccessTypes.Offline,
			scope: [ Scope.MetadataReadOnly ]
		};
		return client.generateAuthUrl(options);
	}

	/**
	 * トークンを生成します
	 * @param {ClientSecret} clientSecret クライアントシークレット
	 * @param {string} code 認証コード
	 * @return {Promise<Credentials>}
	 */
	public async getToken(clientSecret: ClientSecret, code: string) {
		this.assertClientSecret(clientSecret);
		const client = this.createClient(clientSecret);
		return this.requestGetToken(client, code);
	}

	/**
	 * 証明付きのOAuth2クライアントを生成します
	 * @return {OAuth2Client}
	 */
	public createAuthorizedOAuth2Client() {
		const client = this.createClient();
		client.credentials = this.loadCredentials(this.credentialsPath);
		return client;
	}

	/**
	 * クライアントシークレットをチェックします
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
	private createClient(clientSecret?: ClientSecret) {
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
			client.getToken(code, (err: Error, credentials: Credentials) => {
				if (err) {
					reject(err);
				} else {
					resolve(credentials);
				}
			});
		})
		.then((credentials: Credentials) => credentials);
	}

	/**
	 * 証明情報を読み込みます
	 * @param {string} path 証明情報への絶対パスを指定
	 * @return {Credentials}
	 */
	private loadCredentials(path: string) {
		return <Credentials>JSON.parse(fs.readFileSync(path).toString());
	}
}

export interface ClientSecretInstalled {
	client_id: string;
	project_id: string;
	auth_uri: string;
	client_secret: string;
	auth_provider_x509_cert_url: string;
	redirect_uris: string[];
}

export interface ClientSecret {
	installed: ClientSecretInstalled;
}

export interface Credentials {
	access_type: string;
	refresh_type: string;
	token_type: string;
	expiry_date: number;
}

export enum AccessTypes {
	Offline = 'offline'
}

export enum Scope {
	MetadataReadOnly = 'https://www.googleapis.com/auth/drive.metadata.readonly'
}

export interface GenerateAuthUrlConfig {
	access_type: AccessTypes;
	scope: Scope[]
}
