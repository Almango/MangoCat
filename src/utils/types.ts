// 定义分类配置接口
export interface CategoryConfig {
  icon: string;
  color: string;
}

// 定义站点配置接口
export interface SiteConfigType {
  title: string;
  author: string;
  favicon: string;
  desc: string;
  siteUrl: string;
  PaginationConfig: {
    POSTS_PER_PAGE: number;
  };
  Categories: {
    [key: string]: CategoryConfig;
  };
  NavConfig: {
    name: string;
    path: string;
  }[];
}

// 定义文章数据接口
export interface PostData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  wordCount: number;
  published: string;
}

// 定义文章接口
export interface Post {
  slug: string;
  data: PostData;
}