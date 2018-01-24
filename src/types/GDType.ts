// @see https://developers.google.com/drive/v3/reference/files#resource
export interface FileInfo {
	"kind": "drive#file",
	"id": string,
	"name": string,
	"mimeType": string,
	"description": string,
	"starred": boolean,
	"trashed": boolean,
	"explicitlyTrashed": boolean,
	"trashingUser": {
		"kind": "drive#user",
		"displayName": string,
		"photoLink": string,
		"me": boolean,
		"permissionId": string,
		"emailAddress": string
	},
	"trashedTime": Date,
	"parents": [
		string
	],
	"properties": {
		(key): string
	},
	"appProperties": {
		(key): string
	},
	"spaces": [
		string
	],
	"version": number,
	"webContentLink": string,
	"webViewLink": string,
	"iconLink": string,
	"hasThumbnail": boolean,
	"thumbnailLink": string,
	"thumbnailVersion": number,
	"viewedByMe": boolean,
	"viewedByMeTime": Date,
	"createdTime": Date,
	"modifiedTime": Date,
	"modifiedByMeTime": Date,
	"modifiedByMe": boolean,
	"sharedWithMeTime": Date,
	"sharingUser": {
		"kind": "drive#user",
		"displayName": string,
		"photoLink": string,
		"me": boolean,
		"permissionId": string,
		"emailAddress": string
	},
	"owners": [
		{
			"kind": "drive#user",
			"displayName": string,
			"photoLink": string,
			"me": boolean,
			"permissionId": string,
			"emailAddress": string
		}
	],
	"teamDriveId": string,
	"lastModifyingUser": {
		"kind": "drive#user",
		"displayName": string,
		"photoLink": string,
		"me": boolean,
		"permissionId": string,
		"emailAddress": string
	},
	"shared": boolean,
	"ownedByMe": boolean,
	"capabilities": {
		"canAddChildren": boolean,
		"canChangeViewersCanCopyContent": boolean,
		"canComment": boolean,
		"canCopy": boolean,
		"canDelete": boolean,
		"canDownload": boolean,
		"canEdit": boolean,
		"canListChildren": boolean,
		"canMoveItemIntoTeamDrive": boolean,
		"canMoveTeamDriveItem": boolean,
		"canReadRevisions": boolean,
		"canReadTeamDrive": boolean,
		"canRemoveChildren": boolean,
		"canRename": boolean,
		"canShare": boolean,
		"canTrash": boolean,
		"canUntrash": boolean
	},
	"viewersCanCopyContent": boolean,
	"writersCanShare": boolean,
	"permissions": any[], // Permissions[],
	"permissionIds": [
		string
	],
	"hasAugmentedPermissions": boolean,
	"folderColorRgb": string,
	"originalFilename": string,
	"fullFileExtension": string,
	"fileExtension": string,
	"md5Checksum": string,
	"size": number,
	"quotaBytesUsed": number,
	"headRevisionId": string,
	"contentHints": {
		"thumbnail": {
			"image": Buffer,
			"mimeType": string
		},
		"indexableText": string
	},
	"imageMediaMetadata": {
		"width": number,
		"height": number,
		"rotation": number,
		"location": {
			"latitude": number,
			"numberitude": number,
			"altitude": number
		},
		"time": string,
		"cameraMake": string,
		"cameraModel": string,
		"exposureTime": number,
		"aperture": number,
		"flashUsed": boolean,
		"focalLength": number,
		"isoSpeed": number,
		"meteringMode": string,
		"sensor": string,
		"exposureMode": string,
		"colorSpace": string,
		"whiteBalance": string,
		"exposureBias": number,
		"maxApertureValue": number,
		"subjectDistance": number,
		"lens": string
	},
	"videoMediaMetadata": {
		"width": number,
		"height": number,
		"durationMillis": number
	},
	"isAppAuthorized": boolean
}

export enum FileFields {
	kind = 'kind',
	id = 'id',
	name = 'name',
	mimeType = 'mimeType',
	description = 'description',
	starred = 'starred',
	trashed = 'trashed',
	explicitlyTrashed = 'explicitlyTrashed',
	trashingUser = 'trashingUser',
	trashedTime = 'trashedTime',
	parents = 'parents',
	properties = 'properties',
	appProperties = 'appProperties',
	spaces = 'spaces',
	version = 'version',
	webContentLink = 'webContentLink',
	webViewLink = 'webViewLink',
	iconLink = 'iconLink',
	hasThumbnail = 'hasThumbnail',
	thumbnailLink = 'thumbnailLink',
	thumbnailVersion = 'thumbnailVersion',
	viewedByMe = 'viewedByMe',
	viewedByMeTime = 'viewedByMeTime',
	createdTime = 'createdTime',
	modifiedTime = 'modifiedTime',
	modifiedByMeTime = 'modifiedByMeTime',
	modifiedByMe = 'modifiedByMe',
	sharedWithMeTime = 'sharedWithMeTime',
	sharingUser = 'sharingUser',
	owners = 'owners',
	teamDriveId = 'teamDriveId',
	lastModifyingUser = 'lastModifyingUser',
	shared = 'shared',
	ownedByMe = 'ownedByMe',
	capabilities = 'capabilities',
	viewersCanCopyContent = 'viewersCanCopyContent',
	writersCanShare = 'writersCanShare',
	permissions = 'permissions',
	permissionIds = 'permissionIds',
	hasAugmentedPermissions = 'hasAugmentedPermissions',
	folderColorRgb = 'folderColorRgb',
	originalFilename = 'originalFilename',
	fullFileExtension = 'fullFileExtension',
	fileExtension = 'fileExtension',
	md5Checksum = 'md5Checksum',
	size = 'size',
	quotaBytesUsed = 'quotaBytesUsed',
	headRevisionId = 'headRevisionId',
	contentHints = 'contentHints',
	imageMediaMetadata = 'imageMediaMetadata',
	videoMediaMetadata = 'videoMediaMetadata',
	isAppAuthorized = 'isAppAuthorized'
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
 * files.list.corpus (Deprecated)
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
 * オプションの基底インターフェイス
 */
export interface GDOptions {
	auth?: any; // XXX to OAuth2Client
	alt?: string; // default 'json'
	fields?: string;
	prettyPrint?: boolean; // default false
	quotaUser?: string;
	userIp?: string;
}

/**
 * files.list用オプション
 */
export interface ListOptions extends GDOptions {
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
 * レスポンスの基底インターフェイス
 */
export interface GDResponse {}

/**
 * files.listレスポンス
 */
export interface ListResponse extends GDResponse {
	kind: 'drive#fileList';
	nextPageToken: string;
	incompleteSearch: boolean;
	files: FileInfo[];
}
