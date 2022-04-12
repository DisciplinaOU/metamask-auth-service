import { exportJWK, importJWK } from 'jose';
export const ed25519PrivateToPublic = async (privateKey) => {
    const jwk = await exportJWK(privateKey);
    delete jwk.d;
    return importJWK(jwk, 'EdDSA');
};
