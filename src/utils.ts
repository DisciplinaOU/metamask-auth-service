import { exportJWK, importJWK, KeyLike } from 'jose';

export const ed25519PrivateToPublic = async (privateKey: KeyLike) => {
    const jwk = await exportJWK(privateKey)
    delete jwk.d
    return importJWK(jwk, 'EdDSA')
}