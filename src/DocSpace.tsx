/*
* (c) Copyright Ascensio System SIA 2026
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

import cloneDeep from "lodash/cloneDeep";
import SDK from "@onlyoffice/docspace-sdk-js";
import { SDKInstance } from "@onlyoffice/docspace-sdk-js/dist/types/instance";
import { TFrameConfig, TFrameEvents } from "@onlyoffice/docspace-sdk-js/dist/types/types";

import { stripTrailingSlash } from "./utils";

type DocSpaceProps = {
  url: string;
  config: TFrameConfig;
  email?: string,
  onRequestPasswordHash?: (email: string) => string,
  onUnsuccessLogin?: () => void,
  onSetDocspaceInstance?: (instance: SDKInstance) => void;
};

const DocSpace: React.FC<DocSpaceProps> = ({
  url,
  config,
  email,
  onRequestPasswordHash,
  onUnsuccessLogin,
  onSetDocspaceInstance
}) => {
  const docspaceUrl = stripTrailingSlash(url);
  const internalConfig = cloneDeep(config);
  const docspaceSDK = new SDK();

  var docspaceInstance: SDKInstance;

  useEffect(() => {
    console.log(`[ONLYOFFICE DocSpace] Mount component: frameId[${config.frameId}]`);

    internalConfig.src = docspaceUrl;

    if (!email || !onRequestPasswordHash) {
      openDocspace(internalConfig);
    }

    if (email && onRequestPasswordHash) {
      const passwordHash = onRequestPasswordHash(email);

      loginDocspace(email, passwordHash).then(() => {
        openDocspace(internalConfig);
      }).catch(() => {
        if (onUnsuccessLogin) {
          onUnsuccessLogin();
        } else {
          openDocspace(internalConfig);
        }
      });
    }

    return () => {
      console.log(`[ONLYOFFICE DocSpace] Unmount component: frameId[${internalConfig.frameId}]`);
      if (docspaceInstance) {
        console.log(`Destroy DocSpace: frameId[${internalConfig.frameId}]`);
        docspaceInstance.destroyFrame();
      }
    };
  }, []);

  const openDocspace = (config: TFrameConfig) => {
    docspaceInstance = docspaceSDK.initFrame(config);

    if (onSetDocspaceInstance) {
      onSetDocspaceInstance(docspaceInstance);
    }
  }

  const loginDocspace = (email: string, passwordHash: string) => {
    return new Promise((resolve, reject) => {
      var loginDocspaceInstance: SDKInstance;

      if (passwordHash == null || passwordHash.length <= 0) {
        reject();
      }

      async function _login(e?: Event | object | string) {
        const userInfo = await loginDocspaceInstance?.getUserInfo() as { email: string };

        if (userInfo && userInfo.email === email) {
          resolve(null);
        } else {
          loginDocspaceInstance?.login(email, passwordHash)
            .then((response: any) => {
              if (response.status && response.status !== 200) {
                loginDocspaceInstance?.destroyFrame();
                reject();
                return;
              }

              resolve(null);
            });
        }
      };

      const systemConfig = {
        src: docspaceUrl,
        frameId: internalConfig.frameId,
        width: internalConfig.width,
        height: internalConfig.height,
        theme: internalConfig.theme,
        events: {
          onAppReady: _login,
          onAppError: internalConfig.events?.onAppError
        } as TFrameEvents
      } as TFrameConfig;

      loginDocspaceInstance = docspaceSDK.initSystem(systemConfig)
    })
  }

  return <div id={config.frameId}></div>;
};

export default DocSpace;