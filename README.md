<!-- TODO: explain dependencies and add open points and how to set API KEY -->

# Carbon Emission Calculator

A small React app which takes electricity usage in a selected country as an input and displays corresponding carbon emission in a diagram.

The app is currently not responsive and hence works best on a Desktop browser.

Please note that for demonstration purposes, only a small number of countries can be selected at the moment.

## Open points

Some things that could be done as the next steps.

- better error handling for API requests, use Material UI Components for error message
- make the app responsive
- customize the Carbon Emission Chart further
  - create custom x-axis ticks to display a multiline tick with date and time
- add much more tests
- complete the list of supported countries as listed [here](https://www.notion.so/4b4f41db73254b4b915ba01d55eba7e7?v=4ad0efe7763540ab801fadd9f3bf1ce0)

## Running locally

For the carbon emission calculation, you need an account with [Carbon Interface](https://www.carboninterface.com/).

From your account, go to _Developers_ > _API Key_, copy the key and paste it into the file `.env`. Leave the quotation marks, so the file should look something like this: `REACT_APP_API_KEY="abcd..."`

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
