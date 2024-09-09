/*
* (c) Copyright Ascensio System SIA 2024
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import React, { useEffect } from "react";
import loadScript from "./utils/loadScript";
import { TFrameConfig } from "./types";
import cloneDeep from "lodash/cloneDeep";

declare global {
  interface Window {
    DocSpace?: any;
  }
}

type DocSpaceProps = {
  url: string;
  config: TFrameConfig;
  email?: string,
  onRequestPasswordHash?: (email: string) => string,
  onUnsuccessLogin?: () => void,
  onLoadComponentError?: (errorCode: number, errorDescription: string) => void
};

const DocSpace: React.FC<DocSpaceProps> = ({
  url,
  config,
  email,
  onRequestPasswordHash,
  onUnsuccessLogin,
  onLoadComponentError,
}) => {
  const DOCSPACE_API_URL = "static/scripts/sdk/1.0.1/api.js";

  useEffect(() => {
    console.log(`[ONLYOFFICE DocSpace] Mount component: frameId[${config.frameId}]`);
    loadScript(url.endsWith("/") ? url + DOCSPACE_API_URL : url + "/" + DOCSPACE_API_URL, "onlyoffice-api-script")
      .then(() => onLoad())
      .catch(() => onError(-2));

    return () => {
      console.log(`[ONLYOFFICE DocSpace] Unmount component: frameId[${config.frameId}]`);
      if (window?.DocSpace?.SDK?.frames[config.frameId]) {
        console.log(`Destroy DocSpace: frameId[${config.frameId}]`);
        window?.DocSpace?.SDK?.frames[config.frameId].destroyFrame();
      }
    };
  }, []);

  const onLoad = () => {
    try {
      if (!window.DocSpace) onError(-3);
      if (window?.DocSpace?.SDK?.frames[config.frameId]) {
        console.log(`[ONLYOFFICE DocSpace] Skip loading. DocSpace instance already exists: frameId[${config.frameId}]`, config.frameId);
        return;
      }

      if (email && onRequestPasswordHash) {
        loginByPasswordHash(
          cloneDeep(config),
          email,
          onRequestPasswordHash,
          () => {
            window.DocSpace.SDK.initFrame(cloneDeep(config));
          },
          () => {
            if (onUnsuccessLogin) {
              onUnsuccessLogin();
            } else {
              window.DocSpace.SDK.initFrame(cloneDeep(config));
            }
          },
        );
      } else {
        window.DocSpace.SDK.initFrame(cloneDeep(config));
      }

    } catch (err: any) {
      console.error(err);
      onError(-1);
    }
  };

  const loginByPasswordHash = (
    config: TFrameConfig,
    email: string,
    onRequestPasswordHash: (email: string) => string,
    onSuccessLogin: () => void,
    onUnSuccessLogin: () => void,
  ) => {
    config.events = config.events || {};
    config.events.onAppReady = async (e: Event) => {
      const userInfo = await window.DocSpace.SDK.frames[config.frameId].getUserInfo();

      if (userInfo && userInfo.email === email) {
        onSuccessLogin();
      } else {
        const passwordHash = await onRequestPasswordHash(email);

        if (passwordHash == null || passwordHash.length <= 0) {
          window.DocSpace.SDK.frames[config.frameId].destroyFrame();
          onUnSuccessLogin();
          return;
        }

        window.DocSpace.SDK.frames[config.frameId].login(email, passwordHash)
          .then((response: any) => {
            if (response.status && response.status !== 200) {
              window.DocSpace.SDK.frames[config.frameId].destroyFrame();
              onUnSuccessLogin();
              return;
            }

            onSuccessLogin();
          });
      }
    };

    window.DocSpace.SDK.initSystem(config);
  };

  const onError = (errorCode: number) => {
    let message;

    switch (errorCode) {
      case -2:
        message = `Error load DocSpace from ${url}, frameId[${config.frameId}]`;
        break;
      case -3:
        message = `DocSpace is not defined. frameId[${config.frameId}]`;
        break;
      default:
        message = `Unknown error loading component. frameId[${config.frameId}]`;
        errorCode = -1;
    }

    if (typeof onLoadComponentError == "undefined") {
      console.error(`[ONLYOFFICE DocSpace] ${message}`);
    } else {
      onLoadComponentError(errorCode, message);
    }
  };

  return <div id={config.frameId}></div>;
};

export default DocSpace;