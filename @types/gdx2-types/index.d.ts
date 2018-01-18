declare module 'gdx2-types' {
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
}