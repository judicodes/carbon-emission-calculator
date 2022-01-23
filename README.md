<!-- TODO: explain dependencies and add open points and how to set API KEY -->

# Carbon Emission Calculator

A small React app which takes electricity usage as an input and displays corresponding carbon emission in a diagram.

## Open points

Some things that could be done as the next steps.

- customize the Carbon Emission Chart further
  - create custom x-axis ticks to display a multiline tick with date and time
- add more tests
  - especially for interaction between components

## Running locally

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Unit Tests

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Building for production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You can serve the app locally with a static server:

```
npx serve -s build
```

## Linting and Formatting

### `npm run lint`

Shows lint errors.

### `npm run lint-fix`

Attempts to fix lint errors.

### `npm run format-check`

Shows formatting errors.

### `npm run format-fix`

Fixes formatting errors.

## GitHub Actions

A set of GitHub actions will run with every push to `main` and on every pull request to ensure that

- the code builds
- there are no linting or formatting issues
- all unit tests pass
