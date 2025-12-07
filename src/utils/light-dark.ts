// 定义主题类型
export type Theme = 'light' | 'dark' | 'system';

// 获取主题设置
export const getTheme = (): Theme => {
  // 首先检查localStorage中是否有保存的主题
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) {
    return savedTheme;
  }
  
  // 如果没有保存的主题，返回系统默认主题
  return 'system';
};

// 获取实际的主题值（将'system'转换为实际的'light'或'dark'）
export const getActualTheme = (): 'light' | 'dark' => {
  const theme = getTheme();
  
  if (theme === 'system') {
    // 检测系统主题偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  return theme;
};

// 设置主题
export const setTheme = (theme: Theme): void => {
  // 保存主题到localStorage
  localStorage.setItem('theme', theme);
  
  // 更新文档的类名
  updateThemeClass();
};

// 切换主题
export const toggleTheme = (): void => {
  const currentTheme = getTheme();
  let newTheme: Theme;
  
  if (currentTheme === 'light') {
    newTheme = 'dark';
  } else if (currentTheme === 'dark') {
    newTheme = 'system';
  } else {
    newTheme = 'light';
  }
  
  setTheme(newTheme);
};

// 更新文档的类名
export const updateThemeClass = (): void => {
  const actualTheme = getActualTheme();
  const htmlElement = document.documentElement;
  
  // 移除旧的主题类
  htmlElement.classList.remove('light', 'dark');
  
  // 添加新的主题类
  htmlElement.classList.add(actualTheme);
};

// 初始化主题
export const initTheme = (): void => {
  // 更新主题类
  updateThemeClass();
  
  // 监听系统主题变化
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', updateThemeClass);
};