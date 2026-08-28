# @onlyoffice/docspace-react

This repo contains the ONLYOFFICE Docspace React component which integrates [ONLYOFFICE DocSpace](https://github.com/ONLYOFFICE/DocSpace) into [React](https://react.dev/) projects.

**Please note**: To work with this component, you need to have ONLYOFFICE DocSpace. If you are new to DocSpace, [create an account](https://www.onlyoffice.com/docspace-registration.aspx).

## Prerequisites

This procedure requires [Node.js (and npm)](https://nodejs.org/en).

The component is built for React 19 and requires *react*, *react-dom* and *@onlyoffice/docspace-sdk-js* 2.x as peer dependencies.

## Creating the demo React application with ONLYOFFICE DocSpace

This procedure creates a [basic React application](https://github.com/facebook/create-react-app) and installs an ONLYOFFICE Docs editor in it.

1. Create a new React project named *docspace-react-demo* using the *Create React App* package:
    ```
    npx create-react-app docspace-react-demo
    ```

2. Go to the newly created directory:
    ```
    cd docspace-react-demo
    ```

3. Install ONLYOFFICE DocSpace React component from **npm** and save it to the *package.json* file with *--save*:
    ```
    npm install --save @onlyoffice/docspace-react @onlyoffice/docspace-sdk-js
    ```

    *@onlyoffice/docspace-sdk-js* is a peer dependency of the component. npm 7 and later installs it automatically, other package managers may require the explicit installation shown above.

4. Open the *./src/App.js* file in the *docspace-react-demo* project and replace its contents with the following code:

    ```
    import React from 'react';
    import { DocSpace } from "@onlyoffice/docspace-react";

    const onAppReady = function (e) {
        console.log("ONLYOFFICE DocSpace App is ready!");
    };

    const onAppError = (e) => {
        console.log(e);
    };

    const onSetDocspaceInstance = function (instance) {
        console.log(instance);
    };

    export default function App() {
        return (
            <DocSpace
                config={{
                    "src": "http://example-onlyoffice.com",
                    "frameId": "onlyoffice-docspace",
                    "mode": "manager",
                    "width": "100%",
                    "height": "100%",
                    "events": {
                        "onAppReady": onAppReady,
                        "onAppError": onAppError
                    }
                }}
                onSetDocspaceInstance={onSetDocspaceInstance}
            />
        );
    }
    ```
    Replace the following lines with your own data:
    * **"http://example-onlyoffice.com"** - replace with the address of your ONLYOFFICE DocSpace, specified without a trailing slash;

    This JavaScript file will create the *App* component containing the ONLYOFFICE DocSpace configured with basic features.

5. Test the application using the Node.js development server:
    * To start the development server, navigate to the *docspace-react-demo* directory and run:
    ```
    npm run start
    ```
    * To stop the development server, select on the command line or command prompt and press *Ctrl+C*.

## Deploying the demo React application

The easiest way to deploy the application to a production environment is to install [serve](https://github.com/vercel/serve) and create a static server:
1. Install the *serve* package globally:
    ```
    npm install -g serve
    ```

2. Serve your static site on the 3000 port:
    ```
    serve -s build
    ```
    Another port can be adjusted using the *-l* or *--listen* flags:
    ```
    serve -s build -l 4000
    ```

3. To serve the project folder, go to it and run the *serve* command:
    ```
    cd docspace-react-demo
    serve
    ```

Now you can deploy the application to the created server:
1. Navigate to the *docspace-react-demo* directory and run:
    ```
    npm run build
    ```
    The *build* directory will be created with a production build of your app.

2. Copy the contents of the *docspace-react-demo/build* directory to the root directory of the web server (to the *docspace-react-demo* folder).

    The application will be deployed on the web server (*http://localhost:3000* by default).

## API
### Props
| Name | Type | Default | Required | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| `config` | object | null | yes | Generic configuration object for opening a file with token. Requires `src` - the address of ONLYOFFICE DocSpace, specified without a trailing slash. [Config API](https://api.onlyoffice.com/docspace/jssdk/config/) |
| `onSetDocspaceInstance` | (instance: SDKInstance) => void | null | no | The function called when DocSpace instance is obtained. The instance provides API methods for working with DocSpace. |

### Notes

* The `config` prop is applied when the component is mounted. To change the configuration of the already opened DocSpace, use the `setConfig` method of the instance obtained via `onSetDocspaceInstance`, so that the frame is not recreated.
* The component renders a wrapper element around the DocSpace frame. Its width and height are taken from `config.width` and `config.height` (*100%* by default), which keeps the percentage sizes of the frame working.

## Storybook

Copy *.env.example* to *.env* and set the DocSpace the stories point at:
```
VITE_DOCSPACE_URL=https://example-onlyoffice.com
VITE_DOCSPACE_FILE_ID=100000
```
Only the *VITE_*-prefixed variables reach the browser. *VITE_DOCSPACE_FILE_ID* is the file the *Editor* story opens, it can be any file id from the portal above.

### Build Storybook:
```
npm run build-storybook
```
### Start Storybook:
```
npm run storybook
```

## Development

### Clone project from the GitHub repository:
```
git clone https://github.com/ONLYOFFICE/docspace-react
```
### Install the project dependencies:
```
npm install
```
### Lint the sources:
```
npm run lint
```
### Test the component:
```
npm run test
```
The tests can also be run in watch mode with `npm run test:watch`, and with a coverage report with `npm run test:coverage`.
### Build the project:
```
npm run build
```
The *dist* directory will be created with the ESM and CommonJS bundles and the type declarations.
### Create the package:
```
npm pack
```

## Feedback and support

In case you have any issues, questions, or suggestions for the ONLYOFFICE DocSpace React component, please refer to the [Issues](https://github.com/ONLYOFFICE/docspace-react/issues) section.

Official project website: [www.onlyoffice.com](https://www.onlyoffice.com/). 

Support forum: [forum.onlyoffice.com](https://forum.onlyoffice.com/).