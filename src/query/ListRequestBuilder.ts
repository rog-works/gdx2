import { FileFields, GDResponse, GDOptions, ListOptions, Corpora, Corpus, Spaces, ListOrders } from '../types/GDType';
import { GD } from '../lib/GD';
import { GDRequestBuilder } from './GDRequestBuilder';

export class ListRequestBuilder extends GDRequestBuilder {
	private fields_: string | undefined = undefined;
	private corpora_: Corpora | undefined = undefined;
	private corpus_: Corpus | undefined = undefined;
	private includeTeamDriveItems_: boolean | undefined = undefined;
	private orderBy_: string | undefined = undefined;
	private pageSize_: number | undefined = undefined;
	private pageToken_: string | undefined = undefined;
	private q_: string | undefined = undefined;
	private spaces_: Spaces | undefined = undefined;
	private supportsTeamDrives_: boolean | undefined = undefined;
	private teamDriveId_: string | undefined = undefined;

	public constructor(gd: GD) {
		super(gd);
		this.fields([ FileFields.id, FileFields.name ]);
		this.pageSize(10);
	}

	public fields(fileFields: FileFields[]) {
		this.fields_ = `nextPageToken, files(${fileFields.join(',')})`;
	}

	public corpora(corpora: Corpora) {
		this.corpora_ = corpora;
		return this;
	}

	public corpus(corpus: Corpus) {
		this.corpus_ = corpus;
		return this;
	}

	public includeTeamDriveItems(includeTeamDriveItems: boolean) {
		this.includeTeamDriveItems_ = includeTeamDriveItems;
		return this;
	}

	public orderBy(listOrders: ListOrders[]) {
		this.orderBy_ = listOrders.join(',');
		return this;
	}

	public pageSize(pageSize: number) {
		this.pageSize_ = pageSize;
		return this;
	}

	public pageToken(pageToken: string) {
		this.pageToken_ = pageToken;
		return this;
	}

	public q(q: string) {
		this.q_ = q;
		return this;
	}

	public spaces(spaces: Spaces) {
		this.spaces_ = spaces;
		return this;
	}

	public supportsTeamDrives(supportsTeamDrives: boolean) {
		this.supportsTeamDrives_ = supportsTeamDrives;
		return this;
	}

	public teamDriveId(teamDriveId: string) {
		this.teamDriveId_ = teamDriveId;
		return this;
	}

	protected get options(): GDOptions {
		const options = Object.assign(
			super.options,
			<ListOptions> {
				fields: this.fields_,
				corpora: this.corpora_,
				corpus: this.corpus_,
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

	public async request(): Promise<GDResponse> {
		return await this.gd.list(this.options);
	}
}
