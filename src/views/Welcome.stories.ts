import { linkTo } from '@storybook/addon-links';
import Welcome from './Welcome.vue';

export default {
  title: 'Welcome', // 스토리보드 제목
  component: Welcome, // 스토리보드에 표시될 컴포넌트
};

export const ToStorybook = () => ({
  components: { Welcome },
  template: '<welcome :showApp="action" />',
  methods: {
    action: linkTo('Button'),
  },
});

ToStorybook.story = {
  name: 'to Storybook',
};
