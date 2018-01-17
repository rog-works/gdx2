export interface ClientSecretInstalled {
	client_id: string;
	project_id: string;
	auth_uri: string;
	client_secret: string;
	auth_provider_x509_cert_url: string;
	redirect_uris: string[];
}

export interface ClientSecret {
	installed: ClientSecretInstalled;
}

export enum AccessTypes {
	Offline = 'offline'
}

export enum Scope {
	MetadataReadOnly = 'https://www.googleapis.com/auth/drive.metadata.readonly'
}

export interface GenerateAuthUrlConfig {
	access_type: AccessTypes;
	scope: Scope[]
}

export interface GetTokenConfig {
	code: string
}

export interface Token {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expiry_date: number;
}

export interface CreateOAuthClientConfig {
	token: Token;
}

export interface AuthConfig {
	clientSecret: ClientSecret;
	generateAuthUrl: GenerateAuthUrlConfig;
	getToken: GetTokenConfig;
	createOAuthClient: CreateOAuthClientConfig;
}
