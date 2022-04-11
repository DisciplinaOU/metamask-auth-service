/**
* JWT config.
*/
import { readFileSync } from 'fs';
import { importPKCS8 } from 'jose';

const ALGORITHM = 'EdDSA';
const privateJWK = await importPKCS8(
	readFileSync(process.env.AUTH_SECRET_PATH || 'secret.pem', 'utf8'), ALGORITHM);
	
export const config = {
	algorithms: [ALGORITHM],
	// secret: 'shhhh', // TODO Put in process.env
	secret: privateJWK,
};
	