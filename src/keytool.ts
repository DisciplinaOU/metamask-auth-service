import { readFileSync } from "fs";
import * as jose from "jose";
import yargs from "yargs/yargs";

import { makeJWTToken } from "./utils.js";

yargs(process.argv.slice(2))
  .usage("$0 <cmd> [args]")
  .command({
    command: "make-jwt <secret-key-file> <public-address>",
    describe:
      "Generate JWT auth token for given Ethereum public address signed by a given private key",
    builder: (y) =>
      y
        .positional("secret-key-file", {
          type: "string",
          demandOption: true,
          describe: "Ed25519 private key file in .pem format",
        })
        .positional("public-address", {
          type: "string",
          demandOption: true,
          describe: "ETH address of user to authenticate",
        })
        .help(),
    handler: async (argv) => {
      const privateJWK = await jose.importPKCS8(
        readFileSync(argv.secretKeyFile, "utf8"),
        "EdDSA"
      );

      console.log(await makeJWTToken(privateJWK, argv.publicAddress));
    },
  })
  .demandCommand()
  .help()
  .parse();
