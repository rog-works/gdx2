import { GD } from '../lib/GD';
import { ListRequestBuilder } from '../query/ListRequestBuilder';

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
	 * @return {ListRequestBuilder}
	 */
	public list() {
		return new ListRequestBuilder(this.gd);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }
}
