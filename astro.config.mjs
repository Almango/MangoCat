import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => 
        theme.name === 'github-dark' ? '[data-theme="dark"]' : '[data-theme="light"]',
      // 重点：添加 'language-badge' 插件到数组中
      plugins: ['line-numbers', 'copy-button', 'language-badge'], 
      // 可选：配置语言标签的样式和位置
      pluginOptions: {
        'language-badge': {
          position: 'top-right', // 位置：top-left/top-right/bottom-left/bottom-right
          showPlainTextBadge: false, // 纯文本代码块是否显示 "txt" 标签（默认false）
          badgeTextTransform: 'uppercase', // 文本格式：uppercase/lowercase/capitalize/none
        },
        'copy-button': {
          iconSize: 15, // 图标尺寸（px），间接控制按钮大小
          buttonPadding: '0.5em', // 按钮内边距，调整整体尺寸
        },
      },
    })
  ],
});