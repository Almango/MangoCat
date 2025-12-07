import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    // 配置Shiki作为语法高亮器（Astro内置，无需额外插件）
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      langs: ['javascript', 'typescript', 'html', 'css', 'python', 'java'],
      // theme: './custom-theme.json', // 若有自定义主题可保留
    },
  },
});