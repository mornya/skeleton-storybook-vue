import { setup, type Preview } from '@storybook/vue3-vite';
import '@/assets/scss/_reset.scss';

setup((_app) => {
  //app.use();
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (story) => {
      // 전역 테마 적용
      return {
        components: { story },
        template: `
<main>
  <story />
</main>`,
      };
    },
  ],
};

export default preview;
