declare interface GenerateAuthUrlArgs {
	access_type: string;
	scope: string[];
}

declare module "google-auth-library" {
	export class OAuth2Client {
		public credentials: any;
		public generateAuthUrl(args: GenerateAuthUrlArgs): string;
		public getToken(code: string, callback: Function): any;
	}

	export class GoogleAuth {
		public OAuth2(clientId: string, clientSecret: string, redirectUrl: string): OAuth2Client
	}
}
