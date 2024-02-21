import bcrypt from 'bcrypt';

class EncryptHelper {

	private readonly _salt: number = 10;

	async encrypt(data: string) {
		return await bcrypt.hash(data, this._salt);
	}

	async compare(data: string, encryptedData: string) {
		return await bcrypt.compare(data, encryptedData);
	}

}

export default new EncryptHelper();