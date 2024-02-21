import bcrypt from 'bcrypt';

class EncryptHelper {

	private readonly _salt: number = 10;

	async encrypt(data: string) {
		return await bcrypt.hash(data, this._salt);
	}

}

export default new EncryptHelper();