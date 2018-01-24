import { FileFields, GDResponse, GDOptions, ListOptions, Corpora, Corpus, Spaces, ListOrders } from '../types/GDType';
import { GD } from '../lib/GD';
import { GDRequestBuilder } from './GDRequestBuilder';

export class ListRequestBuilder extends GDRequestBuilder {
	private fields_: string | undefined = undefined;
	private corpora_: string | undefined = undefined;
	private includeTeamDriveItems_: boolean | undefined = undefined;
	private orderBy_: string | undefined = undefined;
	private pageSize_: number | undefined = undefined;
	private pageToken_: string | undefined = undefined;
	private q_: string | undefined = undefined;
	private spaces_: string | undefined = undefined;
	private supportsTeamDrives_: boolean | undefined = undefined;
	private teamDriveId_: string | undefined = undefined;

	/**
	 * インスタンスを生成します
	 * @param {GD} gd Google Driveライブラリー
	 */
	public constructor(gd: GD) {
		super(gd);
		this.fields([ FileFields.id, FileFields.name ]);
		this.pageSize(10);
	}

	/**
	 * 取得するフィールドを設定
	 * @param {FileFields[]} fileFields 取得するフィールドリスト
	 * @return {this}
	 */
	public fields(fileFields: FileFields[]) {
		this.fields_ = `nextPageToken, files(${fileFields.join(',')})`;
	}

	/**
	 * TODO
	 * @param {Corpora[]} corpora
	 * @return {this}
	 */
	public corpora(corpora: Corpora[]) {
		this.corpora_ = corpora.join(',');
		return this;
	}

	/**
	 * Team Driveのアイテムを結果に含めるか設定します (default: false)
	 * @param {boolean} includeTeamDriveItems true = 含める
	 * @return {this}
	 */
	public includeTeamDriveItems(includeTeamDriveItems: boolean) {
		this.includeTeamDriveItems_ = includeTeamDriveItems;
		return this;
	}

	/**
	 * ソートオーダーを設定します
	 * @param {ListOrders[]} listOrders ソートオーダーリスト
	 * @return {this}
	 */
	public orderBy(listOrders: ListOrders[]) {
		this.orderBy_ = listOrders.join(',');
		return this;
	}

	/**
	 * 1ページ当たりの取得件数を設定します
	 * @param {number} pageSize 1ページ当たりの取得件数
	 * @return {this}
	 */
	public pageSize(pageSize: number) {
		this.pageSize_ = pageSize;
		return this;
	}

	/**
	 * 取得するページのトークンを設定します
	 * @param {string} pageToken 取得するページのトークン
	 * @return {this}
	 */
	public pageToken(pageToken: string) {
		this.pageToken_ = pageToken;
		return this;
	}

	/**
	 * 取得するアイテムの条件式を設定します
	 * @param {string} q 取得するアイテムの条件式
	 * @return {this}
	 * @see https://developers.google.com/drive/v3/web/search-parameters
	 */
	public q(q: string) {
		this.q_ = q;
		return this;
	}

	/**
	 * コーパス内で参照するスペースを設定します
	 * @param {Spaces[]} spaces 参照スペースリスト
	 * @return {this}
	 */
	public spaces(spaces: Spaces[]) {
		this.spaces_ = spaces.join(',');
		return this;
	}

	/**
	 * 要求しているアプリケーションがTeam Driveをサポートしているかを設定します (default: false)
	 * @param {boolean} supportsTeamDrives true = サポート
	 * @return {this}
	 */
	public supportsTeamDrives(supportsTeamDrives: boolean) {
		this.supportsTeamDrives_ = supportsTeamDrives;
		return this;
	}

	/**
	 * 検索するTeam Drive IDを設定します
	 * @param {string} teamDriveId 検索するTeam Drive ID
	 * @return {this}
	 */
	public teamDriveId(teamDriveId: string) {
		this.teamDriveId_ = teamDriveId;
		return this;
	}

	/**
	 * files.list用のオプションを取得します
	 * @return {GDOptions}
	 */
	protected get options(): GDOptions {
		const options = Object.assign(
			super.options,
			<ListOptions> {
				fields: this.fields_,
				corpora: this.corpora_,
				includeTeamDriveItems: this.includeTeamDriveItems_,
				orderBy: this.orderBy_,
				pageSize: this.pageSize_,
				pageToken: this.pageToken_,
				q: this.q_,
				spaces: this.spaces_,
				supportsTeamDrives: this.supportsTeamDrives_,
				teamDriveId: this.teamDriveId_
			}
		);
		// XXX
		for (const key of Object.keys(options)) {
			if (options[key] === undefined) {
				delete options[key];
			}
		}
		return options;
	}

	/**
	 * リクエストを送信します
	 * @return {Promise<GDResponse>}
	 */
	public async request(): Promise<GDResponse> {
		return await this.gd.list(this.options);
	}
}
