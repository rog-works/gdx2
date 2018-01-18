import { GAuth } from '../lib/GAuth';

export class Auth {
	public constructor(
		private readonly _gAuth: GAuth
	) {}

	public generateAuthUrl() {
		return this._gAuth.generateAuthUrl();
	}

	public async getToken() {
		return this._gAuth.getToken();
	}
}
