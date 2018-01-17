import { GD } from '../lib/GD';

export class Files {
	public constructor(
		private readonly _gd: GD
	) {}

	public async list(path: string = '/') {
		return this._gd.list(path);
	}

	public async get(path: string) { }
	public async copy(path: string) { }
	public async create(path: string, content: any) { }
	public async update(path: string, content: any) { }
	public async delete(path: string) { }
}
