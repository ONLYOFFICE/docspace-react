# @onlyoffice/docspace-react

This repo contains the ONLYOFFICE Docspace React component which integrates [ONLYOFFICE DocSpace](https://github.com/ONLYOFFICE/DocSpace) into [React](https://react.dev/) projects.

**Please note**: Before working with this component, you need to create [ONLYOFFICE DocSpace portal](https://www.onlyoffice.com/docspace-registration.aspx).

## Prerequisites

This procedure requires [Node.js (and npm)](https://nodejs.org/en).

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
    npm install --save @onlyoffice/docspace-react
    ```

4. Open the *./src/App.js* file in the *docspace-react-demo* project and replace its contents with the following code:

    ```
    import React, { useRef } from 'react';
    import { DocSpace } from "@onlyoffice/docspace-react";

    const onAppReady = function (e) {
        console.log("ONLYOFFICE DocSpace App is ready!");
    };

    const onAppError = (e) => {
    console.log(e);
    }

    const onLoadComponentError = function (errorCode, errorDescription) {
        console.log(errorDescription);
    };

    export default function App() {
        return (
            <pre>
                <DocSpace
                    url="http://example-onlyoffice.com/"
                    config={{
                        "frameId": "onlyoffice-docspace"
                        "mode": "manager",
                        "width": "100%",
                        "height": "100%",
                        "events": {
                        "onAppReady": "onAppReady",
                        "onAppError": "onAppError",
                        }
                    }}
                    onLoadComponentError={onLoadComponentError}
                />
            </>
        );
    }
    ```
    Replace the following lines with your own data:
    * **"http://example-onlyoffice.com/"** - replace with the URL of your server;

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
| `url` | string | null | yes | Address of ONLYOFFICE DocSpace. |
| `config` | object | null | yes | Generic configuration object for opening a file with token. [Config API](https://api.onlyoffice.com/docspace/jssdk/config/) |
| `email` | string | null | no | The user email to login in DocSpace. |
| `onRequestPasswordHash` | (email: string) => string | null | no | The function called when the email parameter is passed, returning the passwordHash for login in DocSpace. |
| `onUnsuccessLogin` | () => void | null | no | The function called when DocSpace account login failed. |
| `onLoadComponentError` | (errorCode: number, errorDescription: string) => void | null | no | The function called when an error occurs while loading a component |

## Storybook

Change the address of the DocSpace in the *.env* file:
```
"DOCSPACE_URL": "https://example-onlyoffice.com/"
```

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
### Test the component:
```
npm run test
```
### Build the project:
```
npm run rollup
```
### Create the package:
```
npm pack
```

## Feedback and support

In case you have any issues, questions, or suggestions for the ONLYOFFICE DocSpace React component, please refer to the [Issues](https://github.com/ONLYOFFICE/docspace-react/issues) section.

Official project website: [www.onlyoffice.com](https://www.onlyoffice.com/). 

Support forum: [forum.onlyoffice.com](https://forum.onlyoffice.com/).