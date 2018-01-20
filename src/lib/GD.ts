import * as google from 'googleapis';
import * as gdx2types from 'gdx2-types';
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
	 * @return {Promise<ListResponse>}
	 */
	public async list(basePath: string = '/', listOptions: ListOptions = {}) {
		const client = this.gAuth.createAuthorizedOAuth2Client();
		const options: ListOptions = {
			auth: listOptions.auth || client,
			pageSize: listOptions.pageSize || 10,
			fields: listOptions.fields || 'nextPageToken, files(id, name)'
		};
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
	 * @param {Options} options APIのオプション
	 * @return {<T>}
	 */
	private async requestAPI<T>(api: Function, options: Options) {
		return new Promise((resolve, reject) => {
			api(options, (err: Error, response: T) =>  err ? reject(err) : resolve(response));
		})
		.then((response: T) => response);
	}
}

/**
 * オプションの基底インターフェイス
 */
export interface Options {
	auth?: any; // XXX to OAuth2Client
	alt?: string; // default 'json'
	fields?: string;
	prettyPrint?: boolean; // default false
	quotaUser?: string;
	userIp?: string;
}

/**
 * files.list.spaces
 */
export enum Spaces {
	Drive = 'drive',
	AppDataFolder = 'appDataFolder',
	Photos = 'photos'
}

/**
 * files.list.corpora
 */
export enum Corpora {
	User = 'user',
	Domein = 'domain',
	TeamDrive = 'teamDrive',
	AllTeamDrives = 'allTeamDrives'
}

/**
 * files.list.corpus
 */
export enum Corpus {
	Domain = 'domain',
	User = 'user'
}

/**
 * files.list.orderBy用のキー
 */
export enum ListOrders {
	CreatedTime = 'createdTime',
	Folder = 'folder',
	ModifiedByMeTime = 'modifiedByMeTime',
	ModifiedTime = 'modifiedTime',
	Name = 'name',
	NameNatural = 'name_natural',
	QuotaBytesUsed = 'quotaBytesUsed',
	Recency = 'recency',
	SharedWithMeTime = 'sharedWithMeTime',
	Starred = 'starred',
	ViewdByMeTime = 'viewedByMeTime'
}

/**
 * files.list用オプション
 */
export interface ListOptions extends Options {
	corpora?: Corpora;
	corpus?: Corpus;
	includeTeamDriveItems?: boolean; // default false
	orderBy?: string; // orderBy = folder,modifiedTime desc,name
	pageSize?: number; // (10 ~ 1000), default 100
	pageToken?: string;
	q?: string; // query
	spaces?: Spaces;
	supportsTeamDrives?: boolean; // default false
	teamDriveId?: string;
}

/**
 * files.listレスポンス
 */
export interface ListResponse {
	kind: 'drive#fileList';
	nextPageToken: string;
	incompleteSearch: boolean;
	files: gdx2types.FileInfo[];
}
