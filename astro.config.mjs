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
    pagefind({
      includedSelectors: ['article h1', 'article h2', 'article h3', 'article h4', 'article h5', 'article h6', 'article p', 'article ul', 'article ol', 'article blockquote'],
      excludedSelectors: ['nav', 'aside', 'footer', '.header', '.sidebar', '.comments']
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },
});