import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { SiteConfig } from '../config.ts';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  // 按发布时间倒序排序，最新的文章排在最前面
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateB - dateA; 
  });
  
  const items = sortedPosts.map((post) => {
    // 确保日期是有效的RFC 822格式，使用published字段而不是date字段
    const pubDate = new Date(post.data.published).toUTCString();
    
    // 使用完整URL
    const fullLink = `${context.site.href}posts/${post.slug}/`;
    
    return {
      link: fullLink,
      title: post.data.title,
      description: post.data.description,
      pubDate: pubDate,
      author: SiteConfig.author,
      // 可以考虑添加content字段提供完整内容
      // content: post.body,
    };
  });
  
  return rss({
    title: SiteConfig.title,
    description: SiteConfig.desc,
    site: context.site,
    items: items,
    customData: `
      <language>zh-cn</language>
      <copyright>© ${new Date().getFullYear()} ${SiteConfig.author}</copyright>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    `,
  });
}