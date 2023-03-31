import { defineConfig } from 'umi';
import { routes } from './routes';
import defaultSettings from './defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  plugins: [],
  layout: { siderWidth: 208, ...defaultSettings, locale: true },
  multitabs: {},
  routes: routes,
  fastRefresh: {},
});
