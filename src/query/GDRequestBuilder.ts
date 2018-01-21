import { GDOptions, GDResponse } from '../types/GDType';
import { GD } from '../lib/GD';

export abstract class GDRequestBuilder {
	protected prettyPrint_: boolean | undefined = undefined;
	protected quotaUser_: string | undefined = undefined;
	protected userIp_: string | undefined = undefined;
	public constructor(
		protected readonly gd: GD
	) {}

	public prettyPrint(prettyPrint: boolean) {
		this.prettyPrint_ = prettyPrint;
		return this;
	}

	public quotaUser(quotaUser: string) {
		this.quotaUser_ = quotaUser;
		return this;
	}

	public userIp(userIp: string) {
		this.userIp_ = userIp;
		return this;
	}

	protected get options(): GDOptions {
		return {
			prettyPrint: this.prettyPrint_,
			quotaUser: this.quotaUser_,
			userIp: this.userIp_
		};
	}

	abstract async request(): Promise<GDResponse>;
}
