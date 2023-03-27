import { exportJWK, importJWK, KeyLike, SignJWT } from "jose";

export const ed25519PrivateToPublic = async (privateKey: KeyLike) => {
  const jwk = await exportJWK(privateKey);
  delete jwk.d;
  return importJWK(jwk, "EdDSA");
};

export const makeJWTToken = async (
  privateKey: KeyLike,
  publicAddress: string
): Promise<string> => {
  const payload = {
    data: {
      publicAddress,
    },
  };
  const publicKey = await ed25519PrivateToPublic(privateKey);
  const pubkeyJWK = await exportJWK(publicKey);
  const header = {
    alg: "EdDSA",
    jwk: pubkeyJWK,
  };

  return new SignJWT(payload)
    .setProtectedHeader(header)
    .setExpirationTime("7d")
    .sign(privateKey);
};
