import * as GoogleAuth from 'google-auth-library';
import { ClientSecret, AuthConfig } from './GAuth.d';

export class GAuth {
	public constructor(
		private readonly _config: AuthConfig
	) {
		if (!this._isValidClientSecret()) {
			throw new Error('Invalid Client Secret.');
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
		client.credentials = this._config.createOAuthClient.token;
		return client;
	}

	private _createClient(clientSecret: ClientSecret) {
		const googleAuth = new GoogleAuth();
		return new googleAuth.OAuth2(
			clientSecret.installed.client_id,
			clientSecret.installed.client_secret,
			clientSecret.installed.redirect_uris[0]
		);
	}

	private async _getToken(client: any, code: string) {
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
