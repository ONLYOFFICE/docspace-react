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

import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { SDKInstance } from "@onlyoffice/docspace-sdk-js/dist/types/instance";
import type { TFrameConfig } from "@onlyoffice/docspace-sdk-js/dist/types/types";

import { DocSpace } from "../src";

const { initFrame, destroyFrame } = vi.hoisted(() => ({
  initFrame: vi.fn(),
  destroyFrame: vi.fn(),
}));

vi.mock("@onlyoffice/docspace-sdk-js", () => ({
  default: class SDK {
    initFrame = initFrame;
  },
}));

const instance = { destroyFrame } as unknown as SDKInstance;

const config: TFrameConfig = {
  frameId: "ds-frame",
  src: "https://portal.example.com",
  mode: "manager",
};

beforeEach(() => {
  vi.clearAllMocks();
  initFrame.mockReturnValue(instance);
});

describe("DocSpace", () => {
  it("renders the element the SDK mounts the frame into", () => {
    render(<DocSpace config={config} />);

    expect(document.getElementById("ds-frame")).toBeInTheDocument();
  });

  it("sizes the wrapper from the config", () => {
    const { container } = render(
      <DocSpace config={{ ...config, width: "480px", height: "600px" }} />,
    );

    expect(container.firstChild).toHaveStyle({ width: "480px", height: "600px" });
  });

  it("falls back to filling its parent when no size is given", () => {
    const { container } = render(<DocSpace config={config} />);

    expect(container.firstChild).toHaveStyle({ width: "100%", height: "100%" });
  });

  it("initialises the frame once, with the given config", () => {
    render(<DocSpace config={config} />);

    expect(initFrame).toHaveBeenCalledTimes(1);
    expect(initFrame).toHaveBeenCalledWith(config);
  });

  it("hands the instance to onSetDocspaceInstance", () => {
    const onSetDocspaceInstance = vi.fn();

    render(
      <DocSpace config={config} onSetDocspaceInstance={onSetDocspaceInstance} />,
    );

    expect(onSetDocspaceInstance).toHaveBeenCalledExactlyOnceWith(instance);
  });

  it("renders without a callback", () => {
    expect(() => render(<DocSpace config={config} />)).not.toThrow();
    expect(initFrame).toHaveBeenCalledTimes(1);
  });

  it("does not re-initialise when the config changes", () => {
    const { rerender } = render(<DocSpace config={config} />);

    rerender(<DocSpace config={{ ...config, src: "https://other.example.com" }} />);

    expect(initFrame).toHaveBeenCalledTimes(1);
    expect(destroyFrame).not.toHaveBeenCalled();
  });

  it("destroys the frame on unmount", () => {
    const { unmount } = render(<DocSpace config={config} />);

    unmount();

    expect(destroyFrame).toHaveBeenCalledTimes(1);
  });
});
