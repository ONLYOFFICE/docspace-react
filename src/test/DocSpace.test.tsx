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

import React from "react";
import { render } from "@testing-library/react";

import DocSpace from "../DocSpace";
import { TFrameConfig } from "@onlyoffice/docspace-sdk-js/dist/types/types";

const config: TFrameConfig = {
  src: "https://example-onlyoffice.com",
  frameId: "onlyoffice-docspace",
  mode: "manager",
  width: "100%",
  height: "100%",
};

describe("DocSpace", () => {
  test("renders the DocSpace frame", () => {
    render(<DocSpace config={config} />);

    const frame = document.getElementById(config.frameId) as HTMLIFrameElement;

    expect(frame).not.toBeNull();
    expect(frame.tagName).toBe("IFRAME");
    expect(frame.getAttribute("src")).toContain(config.src);
  });

  test("passes the DocSpace instance to onSetDocspaceInstance", () => {
    const onSetDocspaceInstance = jest.fn();

    render(<DocSpace config={config} onSetDocspaceInstance={onSetDocspaceInstance} />);

    expect(onSetDocspaceInstance).toHaveBeenCalledTimes(1);
    expect(onSetDocspaceInstance.mock.calls[0][0]).toHaveProperty("destroyFrame");
  });
});
