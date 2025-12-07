---
title: 从零开发一个Astro博客主题
description: 这是一个从零开始开发的Astro博客主题，用于展示我的学习笔记和技术分享。
published: 2025-12-06 16:27:41
tags: [C++, 数据结构]                               # 添加分类
category: 学习笔记 
slug: "83x33k23"
---

## 共享组件

> 在 Astro 中，`Layouts` 目录（通常是 src/layouts）是一个专门用来存放布局组件的目录。布局组件是 Astro 中一种特殊的组件，它们定义了你的网站页面的通用结构和样式，比如 HTML 结构、头部、尾部、导航栏等等。

### Layouts 目录的作用和意义：

1. 统一页面结构： Layouts 目录允许你将网站的通用页面结构定义在一个或多个布局组件中。 这样，你就可以在多个页面中重复使用这些布局，而无需在每个页面中都编写相同的 HTML 结构。
2. 代码复用：  通过使用布局组件，你可以避免代码重复，提高代码的可维护性。 如果你需要修改网站的整体结构，只需要修改相应的布局组件，所有使用该布局的页面都会自动更新。

3. 简化页面开发：  布局组件可以让你专注于编写页面的核心内容，而不用关心页面的通用结构。 这可以大大提高开发效率。

4. SEO 友好：  通过在布局组件中设置统一的 HTML 结构、meta 标签和其他 SEO 相关的设置，你可以确保网站的每个页面都符合 SEO 的最佳实践。

### 布局组件的特点：

包含`<slot />`： 布局组件通常包含一个或多个 <slot /> 标签。 <slot /> 是一个占位符，用于指定应该在哪里渲染页面中的内容。
可以接收 Props： 布局组件可以接收 Props（属性），允许你根据不同的页面传递不同的数据。 例如，你可以在布局组件中定义一个 title Prop，用于设置页面的标题。

Layouts 目录的常见用法：

 - 定义网站的通用结构： 在 Layouts 目录中创建一个 BaseLayout.astro 组件，定义网站的通用 HTML 结构、头部、尾部和导航栏。
创建不同的页面布局： 如果你需要不同的页面布局 (例如，博客文章页面和普通页面)，可以在 Layouts 目录中创建多个不同的布局组件。
嵌套布局： 你可以将布局组件嵌套在一起，构建更复杂的页面结构。
简单示例：

### 在Src内创建一个layouts目录

1. 创建一个Layout.astro组件

```astro
---
import { siteConfig } from '../config';
const { title, favicon } = siteConfig;
---

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href={favicon} />
  </head>
  <body>
    <!-- 将组件显示在共享模板内 -->
               <slot /> 
    <!-- 将组件显示在共享模板内 -->
    <script>
    </script>
  </body>
</html>
```

2. 这其实就是一个html文件，只是在其中添加了一个<slot />标签。
3. <slot /> 是 Web 组件（包括 Astro 组件）中的一个占位符，它定义了父组件应该在哪里渲染传递给子组件的内容。可以把它想象成一个“插槽”或者“空位”，父组件可以将内容“插入”到这个位置。
4. 现在只需要将layout.astro组件引入到需要使用布局的页面中即可。
5. 例如：在`src/pages/index.astro`中引入布局组件

```astro
---
import Layout from '../layouts/Layout.astro';
...
---
<Layout>
    <Header />
    <div class="article-container">
      <PostList posts={processedPosts} />
    </div>
</Layout>
```
6. 这样，导航栏和文章列表就会被渲染到Layout布局组件中在，这就相当于它们都共享了Layout布局组件的结构。


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