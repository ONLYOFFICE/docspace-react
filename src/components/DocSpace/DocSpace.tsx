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

import { useEffect } from "react";

import SDK from "@onlyoffice/docspace-sdk-js";
import type { SDKInstance } from "@onlyoffice/docspace-sdk-js/dist/types/instance";
import type { TFrameConfig } from "@onlyoffice/docspace-sdk-js/dist/types/types";

export type DocSpaceProps = {
  config: TFrameConfig;
  onSetDocspaceInstance?: (instance: SDKInstance) => void;
};

export function DocSpace({ config, onSetDocspaceInstance }: DocSpaceProps) {
  useEffect(() => {
    const docspaceInstance = new SDK().initFrame(config);
    onSetDocspaceInstance?.(docspaceInstance);

    return () => {
      docspaceInstance?.destroyFrame();
    };
    // Mount only: re-running this would destroy the frame and build a new one,
    // dropping whatever the user was doing in it. To change the configuration of
    // an open DocSpace, use the instance's setConfig method, which is handed out
    // through onSetDocspaceInstance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // The SDK replaces the #frameId placeholder with its own container, so the
    // wrapper is the node React owns and removes on unmount. display: contents
    // gives it no box: the container is sized by the SDK from config.width and
    // config.height, against the element the component is placed in, and the
    // wrapper never holds on to the size of the first render.
    //
    // lineHeight: 0 is still inherited by the container the SDK puts the frame
    // in. The frame is an iframe, an inline element, so it sits on a text
    // baseline and the line box adds the font's descender space (about 4px)
    // under it. With a frame asking for the full height of its box, those few
    // pixels are enough to overflow the parent and give the page a scrollbar.
    <div style={{ display: "contents", lineHeight: 0 }}>
      <div id={config.frameId}></div>
    </div>
  );
}
