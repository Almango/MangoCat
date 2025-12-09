---
title: Astro-MangoCat主题开发日志
description: 这是一个从零开始开发的Astro博客主题，用于展示我的学习笔记和技术分享。
published: 2025-12-06 16:27:41
tags: [C++, 数据结构]                               # 添加分类
category: 学习笔记 
slug: "83x33k23"
---

**写一个主题，CSS写成屎山了😠😠😠**

### CSS关键类
`.container`：通用容器，用于包裹页面的内容（格式化内容布局）。
`.article-container`：通用容器，用于包裹文章内容（格式化文章布局）。

.container基本上包揽了一切，它被直接套在Layout组件中，用于包裹页面的内容，所以所有布局都被该容器所约束，达到样式的统一管理。
.article-container则是用于包裹文章内容的容器，它被直接套在文章组件中，用于格式化文章的布局，当然该容器也被.container所约束，达到样式的统一管理。



## 框架结构

### 一、项目结构
```
src/
├── content/          # 博客文章和内容文件
│   ├── posts/        # Markdown格式的博客文章
│   ├── about.md      # 关于页面内容
│   ├── link.md       # 友链页面内容
│   └── config.ts     # 内容配置
├── layouts/          # 布局组件
│   └── Layout.astro  # 主布局组件
├── components/       # 可复用组件
│   ├── Header.astro  # 导航栏组件
│   ├── Footer.astro  # 页脚组件
│   ├── Postlist.astro # 文章列表组件
│   └── Container.astro # 内容容器组件
├── pages/            # 页面入口
│   ├── index.astro   # 首页
│   ├── about.astro   # 关于页面
│   └── posts/        # 文章详情页
├── styles/           # 样式文件
├── utils/            # 工具函数
│   ├── Readtime-Wordcount.ts # 字数统计和阅读时间计算
│   └── types.ts      # TypeScript接口定义
└── config.ts         # 站点配置
```

#### 布局组件
1. layouts目录用于存放布局组件的目录，它作为一个<html><body></body></html>的容器，用于包裹页面的内容。
```astro
---
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
const { pagetitle, children } = Astro.props;

import "../styles/golbal.css";
import "../styles/markdown.css";
import "animate.css";
---
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>#</title>
  </head>
  <body>
    <Header />
      <slot />
      <Footer />
    </div>
  </body>
</html>
```
2. 我们可以写好一些组件，如导航栏（Header.astro）、页脚（Footer.astro）等，直接在布局组件中引入即可。
3. 当我们将全局样式（如 normalize.css、animate.css 等）引入到布局组件中时，这些样式会应用到当前所有页面中。
4. 可以理解为布局组件是一个模板，它定义了页面的通用结构和样式，而具体的页面内容则由插槽（<slot />）来填充。
5. 我们也可以通过将内容写在Layout组件中，例如将PostList组件写在Layout组件中，它将会被作为参数传递给Layout组件的插槽（<slot />），随后被统一渲染出来。

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout>
      <PostList posts={paginatedPosts} />
</Layout>
```

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

### 共享html格式

1. 创建一个Layout.astro组件

```astro title="components/Layout.astro"
---
import { SiteConfig} from '../config';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
const { title, favicon } = SiteConfig;
const { pagetitle, children } = Astro.props;

import '../styles/golbal.css';
import '../styles/markdown.css'; 
import 'animate.css';

const pageTitle = pagetitle || title;
---

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{pageTitle}</title>
    <link rel="icon" type="image/svg+xml" href={favicon} />
  </head>
  <body>
    <!-- 共享的Header组件 -->
    <Header />
    <slot />
    <!-- 共享的Footer组件 -->
    <Footer />
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

### 共享布局

#### 新建一个components/Container.astro组件

1. 这将作为一个统一布局，所有页面都将使用这个布局。

```astro title="components/Container.astro"
---
// Container组件，用于统一包装页面内容
---
<div class="container">
    <slot />
</div>
```

2. 例如：在`src/pages/index.astro`中引入布局组件，导航栏和文章列表都将被渲染到Container组件中，这样就实现了布局的共享以达到布局样式的统一。
3. 不仅如此这也降低了代码的重复度，提高了代码的可维护性。

```astro
---
import Layout from '../layouts/Layout.astro';
import Container from '../components/Container.astro';
...
---
<Layout>
    <Container>
        <Header />
        <div class="article-container">
          <PostList posts={processedPosts} />
        </div>
    </Container>
</Layout>
```

2. 
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

## 代码块配色与功能



## 主题切换功能

> Astro插件：astro-theme-toggle
>轻松为你的 Astro 项目添加一个涟漪风格的主题切换动画。

1. 这是 Astro 生态中专门用于主题切换的轻量插件，它能够轻松为你的 Astro 项目添加一个涟漪风格的主题切换动画。基于 Web API（matchMedia + localStorage）实现，支持自动检测系统主题、持久化存储用户选择，且集成简单。

2. 安装插件
```bash
npm install astro-theme-toggle
```

3. 引入插件只需将导入ThemeScript和Toggle组件，并插入到Layout布局组件中即可使用。
```js title="components/Layout.astro"
---
---
import { ThemeScript } from "astro-theme-toggle/components";
import { Toggle } from "astro-theme-toggle/components";
---

<div class="header-container">
    <header class="header">
        <a href="/" class="logo"><h1>MangoCat</h1></a>
        <ThemeScript />
        <Toggle class="theme-toggle" style={{ width: "18px", height: "18px" }} />
    </header>
</div>
```
4. 该插件甚至不用配置图标，自带两个明暗图标，另外它缺少一个跟随系统主题的功能，不过这也不是问题，因为系统主题切换时，会自动触发主题切换动画。

## 博客完整实现原理

### 1. 架构设计与核心技术

本博客主题基于Astro框架构建，采用了现代化的静态站点生成（SSG）架构。Astro的核心优势在于其组件系统的灵活性，允许开发者使用多种前端框架（React、Vue等）或直接使用原生HTML、CSS和JavaScript。

#### 1.1 核心技术栈
- **Astro**：静态站点生成框架，负责页面渲染和构建
- **TypeScript**：提供类型安全，提高代码可维护性
- **Markdown**：博客内容的编写格式
- **CSS**：样式设计，支持响应式布局
- **Astro Icon**：图标系统，支持Material Symbols和其他图标库
- **astro-theme-toggle**：主题切换插件，实现明暗模式



### 2. 配置系统

博客采用集中式配置管理，通过`src/config.ts`文件统一管理站点的各项配置：

```typescript
// 站点配置接口定义 (src/utils/types.ts)
export interface SiteConfigType {
  title: string;          // 站点标题
  author: string;         // 作者名称
  favicon: string;        // 网站图标
  desc: string;           // 站点描述
  siteUrl: string;        // 站点URL
  PaginationConfig: {
    POSTS_PER_PAGE: number;  // 每页文章数量
  };
  Categories: {           // 分类配置
    [key: string]: CategoryConfig;
  };
  NavConfig: {            // 导航配置
    name: string;
    path: string;
  }[];
}
```

配置系统的优势在于：
- 集中管理，便于维护
- 类型安全，通过TypeScript接口确保配置格式正确
- 组件间共享，避免重复定义

### 3. 内容管理

博客使用Astro的Content Collections功能管理文章内容，所有博客文章存储在`src/content/posts/`目录下，采用Markdown格式编写，包含YAML前置元数据：

```markdown
---
title: 从零开发一个Astro博客主题
description: 这是一个从零开始开发的Astro博客主题，用于展示我的学习笔记和技术分享。
published: 2025-12-06 16:27:41
tags: [C++, 数据结构]                               # 添加分类
category: 学习笔记 
slug: "83x33k23"
---
```

### 4. 页面渲染流程

#### 4.1 首页渲染

首页渲染流程主要在`src/pages/index.astro`中实现：

1. **导入依赖**：导入配置、布局组件、内容集合和工具函数
2. **获取文章数据**：使用`getCollection('posts')`获取所有博客文章
3. **计算字数**：使用`ReadingTime`函数计算每篇文章的字数
4. **排序和分页**：按发布时间排序，并进行分页处理
5. **渲染页面**：使用`Layout`和`PostList`组件渲染页面内容

```typescript
// 读取文章数据
const posts = await getCollection('posts');

// 计算每篇文章的字数
const processedPosts = await Promise.all(
  posts.map(async (post) => {
    const readingTimeResults = await ReadingTime(post.body);
    return {
      ...post,
      data: {
        ...post.data,
        wordCount: readingTimeResults.words, // 添加 wordCount 字段
      },
    };
  })
);

// 按发布时间排序
processedPosts.sort((a, b) => new Date(b.data.published).getTime() - new Date(a.data.published).getTime());
// 分页处理
const paginatedPosts = processedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
```

#### 4.2 文章列表渲染

`PostList`组件负责渲染文章列表，主要功能包括：
- 格式化文章信息（标题、描述、分类、标签等）
- 根据分类配置显示不同的图标和颜色
- 格式化字数统计（如将1234字显示为1.2k字）
- 显示发布日期

### 5. 核心功能实现

#### 5.1 字数统计与阅读时间

`Readtime-Wordcount.ts`工具实现了准确的字数统计和阅读时间计算，特别支持CJK（中文、日文、韩文）字符：

- 使用字符范围检查识别CJK字符
- 跳过CJK标点符号，避免重复计数
- 使用正则表达式识别英文单词
- 提供可配置的每分钟阅读字数（默认200字/分钟）

```typescript
export async function ReadingTime(markdown: string = '', wordsPerMinute: number = 200): Promise<ReadingTimeResults> {
  let words = 0;
  let inWord = false;

  for (let i = 0; i < markdown.length; i++) {
    const char = markdown[i];
    if (isCJK(char)) {
      words++;
      // 跳过后续的CJK标点符号
      while (i + 1 < markdown.length && CJK_PUNCTUATION.test(markdown[i + 1])) {
        i++;
      }
      inWord = false;
    } else if (/\S/.test(char)) {
      if (!inWord) {
        words++;
        inWord = true;
      }
    } else {
      inWord = false;
    }
  }

  const minutes = Math.ceil(words / wordsPerMinute);
  return { minutes, words };
}
```

#### 5.2 分类系统

博客实现了灵活的分类系统，通过`config.ts`中的`Categories`配置定义不同分类的图标和颜色：

```typescript
Categories: {
  '随笔': { icon: 'material-symbols:edit-document-rounded', color: '#ec4f4fff' },
  '感言': { icon: 'material-symbols:kid-star-outline', color: '#30afa7ff' },
  '日常': {icon: 'material-symbols:edit-note-rounded',color: '#c03f99ff'},
  '学习笔记': {icon: 'material-symbols:code-rounded', color: '#36bd41ff'}
}
```

在`PostList`组件中，通过`getCategoryConfig`函数获取分类配置，并根据配置显示相应的图标和颜色。

#### 5.3 响应式设计

博客采用响应式设计，通过CSS媒体查询适配不同屏幕尺寸：

- 移动端：单列布局，导航栏折叠
- 平板和桌面端：多列布局，完整导航栏

```css
@media (max-width: 768px) {
  .footer {
    padding: 0 20px;
  }
  /* 其他移动端样式 */
}
```

#### 5.4 主题切换

使用`astro-theme-toggle`插件实现明暗模式切换：

- 自动检测系统主题
- 支持用户手动切换
- 本地存储用户偏好设置
- 平滑的过渡动画

```astro
<ThemeScript />
<Toggle class="theme-toggle" style={{ width: "30px", height: "30px" }} />
```

### 6. 组件化设计

博客采用组件化设计，将页面拆分为多个可复用组件：

- **Layout.astro**：主布局组件，包含HTML结构、头部和尾部
- **Header.astro**：导航栏组件，包含站点标题和导航链接
- **Footer.astro**：页脚组件，包含版权信息和社交媒体链接
- **PostList.astro**：文章列表组件，渲染文章卡片
- **Container.astro**：内容容器组件，统一页面布局

组件化设计的优势在于：
- 代码复用，减少重复
- 易于维护和更新
- 清晰的职责划分
- 提高开发效率

### 7. 性能优化

博客通过多种方式进行性能优化：

- **静态站点生成**：提前生成HTML文件，减少客户端渲染
- **图片优化**：使用适当大小的图片，支持现代图片格式
- **组件懒加载**：仅在需要时加载组件
- **代码分割**：将代码分成小块，按需加载
- **CSS优化**：使用CSS变量，减少重复样式

