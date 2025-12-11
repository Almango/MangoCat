// 从utils/types.ts导入接口
import type { SiteConfigType } from './utils/types';

export const SiteConfig: SiteConfigType = {
  title: 'Almango',
  author: 'Almango',
  favicon: '/favicon.png',
  desc: '天真永不消逝，浪漫至死不渝',
  siteUrl: 'https://test.almango.cn',
  PaginationConfig: {
    POSTS_PER_PAGE: 6,    // 每页显示的文章数量
    },
  Categories: {
    '随笔': { icon: 'material-symbols:edit-document-rounded', color: '#ec4f4fff' },
    '感言': { icon: 'material-symbols:kid-star-outline', color: '#30afa7ff' },
    '日常': {icon: 'material-symbols:edit-note-rounded',color: '#c03f99ff'},
    '学习笔记': {icon: 'material-symbols:code-rounded', color: '#36bd41ff'
    }
  },
  NavConfig: [
    { name: '归档', path: '/archive' },
    { name: '分类', path: '#' },
    { name: '友链', path: '#' },
    { name: '关于', path: '/about' },
  ],
}

export const ProfileConfig = {
  name: 'Almango',
  avatar: '/avatar.png',
  desc: '精益求精，至臻至善',
  showOnHome: true, // 控制是否在主页显示头像和作者信息
}

export const DEVELOPER_CONFIG = {
  THEME_VERSION: '0.6.1',
}