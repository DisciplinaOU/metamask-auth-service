import { readFileSync } from "fs";
import * as jose from "jose";

import { ed25519PrivateToPublic } from "./utils.js";

const secretKeyFile = process.argv[2];
const publicAddress = process.argv[3];

const privateJWK = await jose.importPKCS8(
  readFileSync(secretKeyFile, "utf8"),
  "EdDSA"
);

const payload = {
  data: {
    id: 10,
    publicAddress,
  },
};
const publicKey = await ed25519PrivateToPublic(privateJWK);
const pubkeyJWK = await jose.exportJWK(publicKey);
const header = {
  alg: "EdDSA",
  jwk: pubkeyJWK,
};

const token = await new jose.SignJWT(payload)
  .setProtectedHeader(header)
  .setExpirationTime("7d")
  .sign(privateJWK);

console.log(token);
