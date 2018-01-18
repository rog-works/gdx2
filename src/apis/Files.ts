import { GD } from '../lib/GD';

/**
 * Google Drive files APIs
 */
export class Files {
	/**
	 * インスタンスを生成します
	 * @param gd Google Driveライブラリー
	 */
	public constructor(
		private readonly gd: GD
	) {}

	/**
	 * ファイルのメタ情報リストを取得します
	 * @param {string} basePath 基準パス
	 * @return {FileInfo[]}
	 */
	public async list(path: string = '/') {
		return this.gd.list(path);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }
}
