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

import type { Meta, StoryObj } from '@storybook/react';
import DocSpace from '../DocSpace';
import { TFrameConfig, TFrameEvents } from '../types';
import './stories.css';

const onAppReady = (e: Event) => {
  console.log("ONLYOFFICE DocSpace App is ready!");
}

const onAppError = (e: Event) => {
  alert(e);
}

const onLoadComponentError = (code: number, message: string) => {
  alert(message);
}

const defaultConfig = {
  frameId: "onlyoffice-docspace",
  mode: "manager",
  width: "100%",
  height: "100%",
  events: {
    onAppReady: onAppReady,
    onAppError: onAppError,
  } as TFrameEvents
} as TFrameConfig;

const meta = {
  title: 'Example/DocSpace',
  component: DocSpace,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    url: process.env.DOCSPACE_URL,
    onLoadComponentError: onLoadComponentError
  }
} satisfies Meta<typeof DocSpace>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Manager: Story = {
  args: {
    config: defaultConfig
  }
};

export const RoomSelector: Story = {
  args: {
    config: {
      ...defaultConfig,
      mode: "room-selector"
    } as TFrameConfig,
  },
};

export const FileSelector: Story = {
  args: {
    config: {
      ...defaultConfig,
      mode: "file-selector"
    } as TFrameConfig,
  },
};

export const System: Story = {
  args: {
    config: {
      ...defaultConfig,
      mode: "system"
    },
  },
};
