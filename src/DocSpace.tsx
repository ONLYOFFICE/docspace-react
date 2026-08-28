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

import SDK from "@onlyoffice/docspace-sdk-js";
import { SDKInstance } from "@onlyoffice/docspace-sdk-js/dist/types/instance";
import { TFrameConfig } from "@onlyoffice/docspace-sdk-js/dist/types/types";

type DocSpaceProps = {
  config: TFrameConfig;
  onSetDocspaceInstance?: (instance: SDKInstance) => void;
};

const DocSpace: React.FC<DocSpaceProps> = ({
  config,
  onSetDocspaceInstance
}) => {
  const internalConfig = { ...config };

  useEffect(() => {
    const docspaceSDK = new SDK();
    const docspaceInstance = docspaceSDK.initFrame(internalConfig);

    if (onSetDocspaceInstance) {
      onSetDocspaceInstance(docspaceInstance);
    }

    return () => {
      if (docspaceInstance) {
        docspaceInstance.destroyFrame();
      }
    };
  }, []);

  return (
    <div style={{ width: config.width || "100%", height: config.height || "100%" }}>
      <div id={config.frameId}></div>
    </div>
  );
};

export default DocSpace;
