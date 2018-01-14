import { Auth, ClientSecret, GoogleAuth } from './Auth';
import * as google from 'googleapis';

interface Options {}

interface ListOptions extends Options {
	auth?: GoogleAuth;
	pageSize?: number;
	fields?: string;
}

export class GD {
	private readonly _auth: Auth;

	public constructor(clientSecret: ClientSecret) {
		this._auth = new Auth(clientSecret);
	}

	private get _drive() {
		return google.drive('v3');
	}

	public async list(path: string = '/', listOptions: ListOptions = {}) {
		const auth = await this._auth.authorized();
		const options: ListOptions = {
			auth: listOptions.auth || auth,
			pageSize: listOptions.pageSize || 10,
			fields: listOptions.fields || 'nextPageToken, files(id, name)'
		};
		return this._request(this._drive.files.get, options);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }

	private async _request(api: Function, options: Options) {
		return new Promise((resolve, reject) => {
			api(options, (err: Error, response: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(response);
				}
			});
		});
	}
}
