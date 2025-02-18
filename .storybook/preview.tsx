import React from 'react';
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      context.args.config = {
        ...context.args.config,
        frameId: `${context.args.config.frameId}-${Date.now()}`
      };

      return (
        <div style={{ display: 'grid', height: "100%", minHeight: "400px" }}>
          <Story
          />
        </div>
      )
    },
  ],
};

export default preview;
