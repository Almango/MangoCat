import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import remarkBreaks from 'remark-breaks';
import icon from 'astro-icon';
import pagefind from "astro-pagefind";
import tailwindcss from '@tailwindcss/vite';
import { SiteConfig } from './src/config.ts';

export default defineConfig({
   build: {
    format: "file",
  },
  integrations: [pagefind()],
    site: SiteConfig.siteUrl,
    markdown: {
    remarkPlugins: [remarkBreaks,],
    gfm: true,
  },
  integrations: [
    expressiveCode({
      themes: ['material-theme-lighter', 'andromeeda'],
      themeCssSelector: (theme) => 
        theme.name === 'andromeeda' ? '[data-theme="dark"]' : '[data-theme="light"]',
      // 修正：plugins数组仅放插件实例，内置插件（copy-button、language-badge）默认启用或需安装对应包
      plugins: [pluginLineNumbers(),],
    }),
    icon(), // astro-icon 集成配置正确
  ],

  vite: {
    plugins: [tailwindcss()]
  },
});