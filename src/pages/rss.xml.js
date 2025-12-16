import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { SiteConfig } from '../config.ts';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  
  const items = posts.map((post) => ({
    link: `/posts/${post.slug}/`,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.date,
    // content: post.body,
  }));
  
  return rss({
    title: SiteConfig.title,
    description: SiteConfig.desc,
    site: context.site,
    items: items,
    customData: `<language>zh-cn</language>`,
  });
}