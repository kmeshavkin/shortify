# shortify

Fullstack (Express/React) link shortener app deployed on Google Cloud.

**Deployed app (interactive): [https://sh.kmesh.dev/](https://sh.kmesh.dev/)**

Paste link, pick length for short link, limit clicks (not unique, empty for infinite) and get shortened link with QR-code that saved in database.

If you are not logged in, links will be stored under your session (with 1 day expiration). You can register with email and password or authenticate using your Google account (OAuth2). Either way links that you generated before will be transferred to newly created account.

You can see and manage all your links under "Links" page.

If you want to check my other projects, you can visit my portfolio: [https://portfolio.kmesh.dev/](https://portfolio.kmesh.dev/)

## Features

### Frontend

- React, Typescript, SASS
- Blueprint.js as UI toolkit
- Page routing using React-router
- Links generated in human-friendly format so it's easy to remember
- QR-code generation for shortened link

### Backend

- Express, Typescript
- MongoDB as database (mongoose) for users, links and sessions storage; user password is encrypted when stored (bcryptjs)
- Server-side session management - express-session with connect-mongo to store sessions in MongoDB
- Googleapis for Google OAuth2 authentication (compliant with all Google requirements)
- Simple middleware authentication validation using express-validator
- Deployed on [Google Cloud Run](https://cloud.google.com/run) that serves built frontend code
- Straightforward build process - different configs for different environments (local development, local production for testing purposes, gcloud production), everything is managed from a single ./package.json file

## Code location/execution explanation

Dev backend is in ./backend, dev frontend is in ./frontend, built app and gcloud deploy (yaml file) is in ./dist, central package.json is in ./package.json

### Config structure

Configs are located in backend/config folder (file `default.json` for development purposes) and in dist/config (file `production.json` for production on gcloud and `localProduction.json` for running production version on local machine), but they are hidden in git.

Sample config is included in backend/config/sampleConfig.json

## TODO

- Tests! (various connections to services (mongodb, google, etc.), express (api, etc.), react components (react-testing-app), e2e)
- https://github.com/Shopify/eslint-plugin-shopify/issues/159 ?
- Add link to portfolio
