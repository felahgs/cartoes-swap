import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { addParameters } from "@storybook/react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
