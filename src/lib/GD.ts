import * as google from 'googleapis';
import { ListOrders, GDOptions, ListOptions, ListResponse } from '../types/GDType';
import { GAuth } from './GAuth';

/**
 * Google Driveライブラリーラッパー
 */
export class GD {
	/**
	 * インスタンスを生成します
	 * @param {GAuth} gAuth 認証ライブラリー
	 */
	public constructor(
		private readonly gAuth: GAuth
	) {}

	/**
	 * Google Driveライブラリーの実体を取得します
	 */
	private get drive() {
		return google.drive('v3');
	}

	/**
	 * ファイルのメタ情報リストを取得します
	 * @param {ListOptions} listOptions files.list用オプション
	 * @return {Promise<ListResponse>}
	 */
	public async list(listOptions: ListOptions = {}) {
		const client = this.gAuth.createAuthorizedOAuth2Client();
		const options = Object.assign(listOptions, { auth: client });
		return this.requestAPI<ListResponse>(this.drive.files.list, options);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }

	/**
	 * 指定のAPIにリクエストします
	 * @param {Function} api APIのメソッド
	 * @param {GDOptions} options APIのオプション
	 * @return {<T>}
	 */
	private async requestAPI<T>(api: Function, options: GDOptions) {
		return new Promise((resolve, reject) => {
			api(options, (err: Error, response: T) =>  err ? reject(err) : resolve(response));
		})
		.then((response: T) => response);
	}
}
