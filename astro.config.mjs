import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.jiangpipa.com',
  integrations: [tailwind()],
  // 页面保持静态；带 `export const prerender = false` 的路由（如 /api/match）走 Vercel Serverless
  adapter: vercel()
});
