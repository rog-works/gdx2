import * as google from 'googleapis';
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
	 * @param {string} basePath 基準パス
	 * @param {ListOptions} listOptions files.list用オプション
	 * @return {FileInfo[]}
	 */
	public async list(basePath: string = '/', listOptions: ListOptions = {}) {
		const client = this.gAuth.createAuthorizedOAuth2Client();
		const options: ListOptions = {
			auth: listOptions.auth || client,
			pageSize: listOptions.pageSize || 10,
			fields: listOptions.fields || 'nextPageToken, files(id, name)'
		};
		return this.requestAPI(this.drive.files.list, options);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }

	/**
	 * 指定のAPIにリクエストします
	 * @param {Function} api APIのメソッド
	 * @param {Options} options APIのオプション
	 * @return {<T>}
	 */
	private async requestAPI<T>(api: Function, options: Options) {
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

/**
 * オプションの基底インターフェイス
 */
export interface Options {}

/**
 * files.list用オプション
 */
export interface ListOptions extends Options {
	auth?: any;
	pageSize?: number;
	fields?: string;
}
