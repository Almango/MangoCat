---
title: 从零开发一个Astro博客主题
description: 这是一个从零开始开发的Astro博客主题，用于展示我的学习笔记和技术分享。
published: 2025-12-06 16:27:41
tags: [C++, 数据结构]                               # 添加分类
category: 学习笔记 
slug: "83x33k23"
---

## 字数统计

1. 代码来源于`Astro-Pure`主题

2. 保留了 CJK 支持: 代码包含了 CJK_RANGES、CJK_PUNCTUATION 和 isCJK 函数，用于正确处理中文、日文、韩文等字符。  这部分代码直接从你提供的 reading-time.ts 复制过来，保证了对 CJK 字符的准确计数。

3. 改进的单词识别:  使用 /\S/.test(char) 来判断一个字符是否是“非空白字符”。  \S 是一个正则表达式，匹配任何非空白字符。 这种方式可以更准确地识别英文单词。 inWord 变量用来跟踪是否正在一个单词内部，避免重复计数。

4. 更简洁的实现: 直接在 readingTime 函数中实现字数统计逻辑，而不再依赖 remark 和 strip-markdown。 虽然牺牲了一部分精度（无法完美去除 markdown 标记的影响，例如链接），但是可以避免引入额外的依赖，并且对于大多数情况来说，精度已经足够。

5. 去除了不必要的代码: 删除了原 reading-time.ts 中的 time 和 text 属性的计算，因为你的接口 ReadingTimeResults 中只需要 minutes 和 words。
```ts
import { readingTime } from './utils/Wordcount';

async function main() {
  const markdownContent = `
  # Hello World

  This is a paragraph with some **bold** and *italic* text.  你好世界。

  - List item 1
  - List item 2

  \`\`\`javascript
  console.log("Hello from a code block!");
  \`\`\`
  `;

  const readingTimeResult = await readingTime(markdownContent);
  console.log(`Reading Time: ${readingTimeResult.minutes} minutes`);
  console.log(`Word Count: ${readingTimeResult.words} words`);
}

main();
```

6. 将wordCount导入到获取文章数据的页面`(index.astro)`中


```astro
---
import Header from '../components/Header.astro';
import { getCollection } from 'astro:content';
import PostList from '../components/Postlist.astro';
+ import { readingTime } from '../utils/Wordcount';
import './styles/golbal.css';
import './styles/markdown.css'; 
import 'animate.css';

```