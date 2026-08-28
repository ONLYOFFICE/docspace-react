# Change Log

## [Unreleased]
- deleted props url, email, onRequestPasswordHash, onUnsuccessLogin
- deleted the DocSpace login procedure, use the login method of the instance from onSetDocspaceInstance
- the src prop of the config is required, specify the DocSpace address without a trailing slash
- added a wrapper element around the frame, its sizes are taken from config.width and config.height
- @onlyoffice/docspace-sdk-js moved to peer dependencies, install it alongside the component

## 2.1.0
- @onlyoffice/docspace-sdk-js:2.0.0

## 2.0.0
- @onlyoffice/docspace-sdk-js:1.1.0
- added event onSetDocspaceInstance
- delete event onLoadComponentError

## 1.0.0
- Initial release
