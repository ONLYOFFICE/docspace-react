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

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { TFrameConfig } from '@onlyoffice/docspace-sdk-js/dist/types/types';

import { DocSpace, type DocSpaceProps } from '../src';
import './stories.css';

const onAppReady = () => {
  console.log("ONLYOFFICE DocSpace App is ready!");
}

const onAppError = (e?: Event | object | string) => {
  alert(e);
}

const defaultConfig: TFrameConfig = {
  src: import.meta.env.VITE_DOCSPACE_URL as string,
  frameId: "onlyoffice-docspace",
  mode: "manager",
  width: "100%",
  height: "100%",
  events: {
    onAppReady: onAppReady,
    onAppError: onAppError,
  }
};

let frameSeq = 0;

/**
 * The SDK keys every frame it opens by `frameId`, so two live frames must never
 * share one. Storybook remounts a story on hot reload and when it is navigated
 * back to, which can overlap the new frame with the one being torn down, so the
 * story id alone is not enough. Each mount takes the next suffix, and useState
 * holds on to it for the life of that mount so re-renders keep the same id.
 */
function DocSpaceWithUniqueFrameId({ config, ...props }: DocSpaceProps) {
  const [frameId] = useState(() => `${config.frameId}-${++frameSeq}`);

  return <DocSpace {...props} config={{ ...config, frameId }} />;
}

const meta = {
  title: 'Example/DocSpace',
  component: DocSpace,
  render: (args) => <DocSpaceWithUniqueFrameId {...args} />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        // The React renderer renders docs stories inline, next to the rest of the
        // page, where nothing gives the story a height of its own, so a frame
        // asking for `height: 100%` collapses to the default iframe height. An
        // iframe of its own gives the frame a viewport it can fill.
        inline: false,
        iframeHeight: '600px',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DocSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Manager: Story = {
  args: {
    config: {
      ...defaultConfig,
      frameId: "onlyoffice-docspace-manager",
    }
  }
};

export const Editor: Story = {
  args: {
    config: {
      ...defaultConfig,
      frameId: "onlyoffice-docspace-editor",
      mode: "editor",
      id: import.meta.env.VITE_DOCSPACE_FILE_ID as string
    }
  }
};

export const RoomSelector: Story = {
  args: {
    config: {
      ...defaultConfig,
      frameId: "onlyoffice-docspace-room-selector",
      mode: "room-selector"
    }
  },
};

export const FileSelector: Story = {
  args: {
    config: {
      ...defaultConfig,
      frameId: "onlyoffice-docspace-file-selector",
      mode: "file-selector"
    }
  },
};

export const System: Story = {
  args: {
    config: {
      ...defaultConfig,
      frameId: "onlyoffice-docspace-system",
      mode: "system"
    },
  },
};
