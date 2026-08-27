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

import type { Meta, StoryObj } from '@storybook/react';
import DocSpace from '../DocSpace';
import { TFrameConfig } from "@onlyoffice/docspace-sdk-js/dist/types/types";
import './stories.css';

const onAppReady = (e?: Event | object | string) => {
  console.log("ONLYOFFICE DocSpace App is ready!");
}

const onAppError = (e?: Event | object | string) => {
  alert(e);
}

const defaultConfig: TFrameConfig = {
  src: process.env.DOCSPACE_URL as string,
  frameId: "onlyoffice-docspace",
  mode: "manager",
  width: "100%",
  height: "100%",
  events: {
    onAppReady: onAppReady,
    onAppError: onAppError,
  }
};

const meta = {
  title: 'Example/DocSpace',
  component: DocSpace,
  parameters: {
    layout: 'fullscreen',
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
      id: process.env.DOCSPACE_FILE_ID as string
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
