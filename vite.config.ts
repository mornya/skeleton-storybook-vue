import { join } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, type UserConfig } from 'vite';
//import vueDevTools from 'vite-plugin-vue-devtools';

const config: UserConfig = defineConfig({
  plugins: [vue(), vueJsx() /*, vueDevTools()*/],
  resolve: {
    alias: {
      '~': join(__dirname, './'),
      '@': join(__dirname, './src'),
    },
  },
});

export default config;
