# shortify

Fullstack (Express/React) link shortener app deployed on Google Cloud.

#### Deployed app (interactive): [https://shortify-286600.appspot.com/](https://shortify-286600.appspot.com/) (temporary link)

Paste link, pick length for short link, limit clicks (not unique, empty for infinite) and get shortened link with QR-code that saved in database.

If you are not logged in, links will be stored under your session (with 1 day expiration). You can register with email and password or authenticate using your Google account (OAuth2). Either way links that you generated before will be transferred to newly created account.

You can see and manage all your links under "Links" page.

If you want to check my other projects, you can visit my portfolio: [https://kmeshavkin.github.io/](https://kmeshavkin.github.io/)

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
- Deployed on [Google Cloud (App Engine)](https://cloud.google.com/appengine) that serves built frontend code
- Straightforward build process - different configs for different environments (local development, local production for testing purposes, gcloud production), everything is managed from a single ./package.json file

## Code location/execution explanation

Dev backend is in ./backend, dev frontend is in ./frontend, built app and gcloud deploy (yaml file) is in ./dist, central package.json is in ./package.json

### Config structure

Configs are located in backend/config folder (file `default.json` for development purposes) and in dist/config (file `production.json` for production on gcloud and `localProduction.json` for running production version on local machine), but they are hidden in git.

They currently have common structure and typed as follows:

```typescript
{
  port: number,
  frontendHost: string,
  backendHost: string,
  session: {
    name: string,
    secret: string,
    maxAge: number
  },
  mongoURL: string,
  google: {
    clientID: string,
    clientSecret: string,
    redirectPath: string,
    scope: string[]
  }
}
```

## TODO

- Tests!
- Fix some console errors
- Add favicon
- Make common config for shared variables (and reduce port definition duplication across project)
- Wake up gcloud container if portfolio is visited?
