import { GoogleAuth, OAuth2Client } from 'google-auth-library';

interface ClientSecretInstalled {
	client_id: string;
	project_id: string;
	auth_uri: string;
	client_secret: string;
	auth_provider_x509_cert_url: string;
	redirect_uris: string[];
}

interface ClientSecret {
	installed: ClientSecretInstalled;
}

enum AccessTypes {
	Offline = 'offline'
}

enum Scope {
	MetadataReadOnly = 'https://www.googleapis.com/auth/drive.metadata.readonly'
}

interface GenerateAuthUrlConfig {
	access_type: AccessTypes;
	scope: Scope[]
}

interface GetTokenConfig {
	code: string
}

interface CreateOAuthClientConfig {
	token: string;
}

export interface AuthConfig {
	clientSecret: ClientSecret;
	generateAuthUrl: GenerateAuthUrlConfig;
	getToken: GetTokenConfig;
	createOAuthClient: CreateOAuthClientConfig;
}

export class Auth {
	public constructor(
		private readonly _config: AuthConfig
	) {
		if (!this._isValidClientSecret()) {
			//throw new Error('Invalid Client Secret.');
		}
	}
	
	private _isValidClientSecret() {
		return this._config.clientSecret.installed.client_id &&
			this._config.clientSecret.installed.client_secret &&
			this._config.clientSecret.installed.redirect_uris[0];
	}
	
	public async generateAuthUrl() {
		const client = this._createClient(this._config.clientSecret);
		return client.generateAuthUrl(this._config.generateAuthUrl);
	}

	public async getToken() {
		const client = this._createClient(this._config.clientSecret);
		return this._getToken(client, this._config.getToken.code);
	}
	
	public async createOAuthClient() {
		const client = this._createClient(this._config.clientSecret);
		client.credentials = JSON.parse(this._config.createOAuthClient.token);
		return client;
	}

	private _createClient(clientSecret: ClientSecret) {
		return new GoogleAuth().OAuth2(
			clientSecret.installed.client_id,
			clientSecret.installed.client_secret,
			clientSecret.installed.redirect_uris[0]
		);
	}

	private async _getToken(client: OAuth2Client, code: string) {
		return new Promise((resolve, reject) => {
			client.getToken(code, (err: Error, token: string) => {
				if (err) {
					reject(err);
				} else {
					resolve(token);
				}
			});
		})
		.then((token: string) => token);
	}
}
