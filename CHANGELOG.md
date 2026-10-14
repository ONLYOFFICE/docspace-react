# Change Log

## [Unreleased]
- deleted props url, email, onRequestPasswordHash, onUnsuccessLogin
- deleted the DocSpace login procedure, use the login method of the instance from onSetDocspaceInstance
- the src prop of the config is required, specify the DocSpace address without a trailing slash
- the frame placeholder is rendered inside a wrapper element, which is kept out of layout with display: contents, so the frame is sized by config.width and config.height against the element the component is placed in
- @onlyoffice/docspace-sdk-js moved to peer dependencies, install it alongside the component
- removed the lodash runtime dependency, the component no longer has production dependencies
- removed the component lifecycle logging from the browser console
- added support for React 18, react and react-dom ^18.0.0 || ^19.0.0 are accepted as peer dependencies

## 2.1.0
- @onlyoffice/docspace-sdk-js:2.0.0

## 2.0.0
- @onlyoffice/docspace-sdk-js:1.1.0
- added event onSetDocspaceInstance
- delete event onLoadComponentError

## 1.0.0
- Initial release
