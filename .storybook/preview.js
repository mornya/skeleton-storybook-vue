import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'responsive',
  },
  layout: 'centered',
  actions: { argTypesRegex: "^on[A-Z].*" },
}
