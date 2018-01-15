import { OAuth2Client } from 'google-auth-library';
import * as google from 'googleapis';
import { Auth } from './Auth';

interface Options {}

export interface ListOptions extends Options {
	auth?: OAuth2Client;
	pageSize?: number;
	fields?: string;
}

export class GD {
	public constructor(
		private readonly _auth: Auth
	) {}

	private get _service() {
		return google.drive('v3');
	}

	public async list(path: string = '/', listOptions: ListOptions = {}) {
		const client = await this._auth.createOAuthClient();
		const options: ListOptions = {
			auth: listOptions.auth || client,
			pageSize: listOptions.pageSize || 10,
			fields: listOptions.fields || 'nextPageToken, files(id, name)'
		};
		return this._request(this._service.files.get, options);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }

	private async _request<T>(api: Function, options: Options) {
		return new Promise((resolve, reject) => {
			api(options, (err: Error, response: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(response);
				}
			});
		})
		.then((response: any) => <T>response);
	}
}
