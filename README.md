# metamask-auth-service

## Metamask authentication service

Almost literally copied from Metamask login demo project at https://github.com/amaurym/login-with-metamask-demo.
Differences:
- Uses another format of JWT tokens, which are signed using Ed25519 asymmetric keys
- To this end, uses a renewed version of `express-jwt` library: https://github.com/flyingleafe/express-jwt 

## Deploy to Heroku

This Express app is deployed to Heroku via the command `yarn deploy:backend` from the root folder.

Some small tweaks are made for this backend to work on Heroku:
- the `tsconfig.json` could have extended the root one, but doesn't.
- a `heroku` script has been added in `package.json`, that's the command Heroku uses to run the web server, as defined in the Procfile.
- the web server listens on the `$PORT` environment variable, which has been added in `src/index.ts`.
