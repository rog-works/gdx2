import * as readline from 'readline';
import { googleAuth, OAuth2Client } from 'google-auth-library';

interface ClientSecretInstalled {
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

export interface GoogleAuth {}

export class Auth {
	private _token: string;

	public constructor(
		private readonly _clientSecret: ClientSecret
	) {}

	public async authorized() {
		const client = this._createClient();
		if (!this._token) {
			const token = await this._createToken(client);
			if (!token) {
				throw new Error('Create token failed.');
			}
			this._token = token;
		}
		client.credentials = JSON.parse(this._token);
		return client;
	}

	private _createClient() {
		return new googleAuth().OAuth2(
			this._clientSecret.installed.client_id,
			this._clientSecret.installed.client_secret,
			this._clientSecret.installed.redirect_uris[0]
		);
	}

	private async _input(notice: string) {
		return new Promise((resolve, reject) => {
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout
			});
			rl.question(notice, (str: string) => {
				rl.close();
				if (str) {
					resolve(str);
				} else {
					reject('Input empty.');
				}
			});
		})
		.then((str: string) => str);
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

	private async _createToken(client: OAuth2Client) {
		const authUrl = client.generateAuthUrl({
			access_type: 'offline',
			scope: [
				'https://www.googleapis.com/auth/drive.metadata.readonly'
			]
		});
  		console.log(`Authorize this app by visiting this url: ${authUrl}`);
		const code = await this._input('Enter the code from that page here: ');
		return this._getToken(client, code);
	}
}
