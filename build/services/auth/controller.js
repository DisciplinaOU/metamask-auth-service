import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import * as jose from 'jose';
import { config } from '../../config.js';
import { User } from '../../models/user.model.js';
import { ed25519PrivateToPublic } from './utils.js';
export const create = (req, res, next) => {
    const { signature, publicAddress } = req.body;
    if (!signature || !publicAddress)
        return res
            .status(400)
            .send({ error: 'Request should have signature and publicAddress' });
    return (User.findOne({ where: { publicAddress } })
        ////////////////////////////////////////////////////
        // Step 1: Get the user with the given publicAddress
        ////////////////////////////////////////////////////
        .then((user) => {
        if (!user) {
            res.status(401).send({
                error: `User with publicAddress ${publicAddress} is not found in database`,
            });
            return null;
        }
        return user;
    })
        ////////////////////////////////////////////////////
        // Step 2: Verify digital signature
        ////////////////////////////////////////////////////
        .then((user) => {
        if (!(user instanceof User)) {
            // Should not happen, we should have already sent the response
            throw new Error('User is not defined in "Verify digital signature".');
        }
        const msg = `I am signing my one-time nonce: ${user.nonce}`;
        // We now are in possession of msg, publicAddress and signature. We
        // will use a helper from eth-sig-util to extract the address from the signature
        const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
        const address = recoverPersonalSignature({
            data: msgBufferHex,
            signature: signature,
        });
        // The signature verification is successful if the address found with
        // sigUtil.recoverPersonalSignature matches the initial publicAddress
        if (address.toLowerCase() === publicAddress.toLowerCase()) {
            return user;
        }
        else {
            res.status(401).send({
                error: 'Signature verification failed',
            });
            return null;
        }
    })
        ////////////////////////////////////////////////////
        // Step 3: Generate a new nonce for the user
        ////////////////////////////////////////////////////
        .then((user) => {
        if (!(user instanceof User)) {
            // Should not happen, we should have already sent the response
            throw new Error('User is not defined in "Generate a new nonce for the user".');
        }
        user.nonce = Math.floor(Math.random() * 10000);
        return user.save();
    })
        ////////////////////////////////////////////////////
        // Step 4: Create JWT
        ////////////////////////////////////////////////////
        .then(async (user) => {
        const payload = {
            data: {
                id: user.id,
                publicAddress,
            }
        };
        const publicKey = await ed25519PrivateToPublic(config.secret);
        const pubkeyJWK = await jose.exportJWK(publicKey);
        const header = {
            alg: 'EdDSA',
            jwk: pubkeyJWK,
        };
        return new jose.SignJWT(payload)
            .setProtectedHeader(header)
            .setExpirationTime("7d")
            .sign(config.secret);
    })
        .then((accessToken) => res.json({ accessToken }))
        .catch(next));
};