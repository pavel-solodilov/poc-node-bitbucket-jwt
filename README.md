A small PoC for checking out JWT signatures working in Node and not breaking the browser implementation of other auth methods.

## Set Up
Create and register your Bitbucket app, clone the appropriate version node-bitbucket to your machine and run:
```
npm i

# Optional. Copy everything from lib into public/js to serve the correct version on the front end.
npm run build

npm link
```

Then, in this repository, do:
```
npm i

npm link bitbucket
```

## Run
```bash
BBC_SPIKE_APP_KEY=<your-app-key> \
BBC_SPIKE_APP_CLIENT_KEY=<your-app-installation-client-key> \
BBC_SPIKE_APP_SHARED_SECRET=<your-app-shared-secret> \
BBC_SPIKE_APP_WORKSPACE=<your-workspace> \
BBC_SPIKE_APP_REPO=<your-repo-slug> \
npm run start
```

The URLs will be [http://localhost:8080](http://localhost:8080) and [http://localhost:8080/ui](http://localhost:8080/ui).