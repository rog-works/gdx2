import { GD } from './GD';
import { ClientSecret } from './Auth';
import { Files } from './Files';

export class Gdx2 {
	/** Google Drive Api */
	private _gd: GD;
	/** files API */
	private _files: Files;

	/**
	 * インスタンスを生成します
	 * @param clientSecret 
	 */
	public constructor(clientSecret: ClientSecret) {}

	/**
	 * files API を取得します
	 * @return {Files} files API
	 */
	public get files() {
		return this._files || (this._files = new Files(this._gd));
	}
}
